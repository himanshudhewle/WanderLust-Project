const Listing = require('../models/listing');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const detectCategory = require('../utils/detectCategory');

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({
  accessToken: mapToken,
});

// INDEX: Search, category filtering and sorting
module.exports.index = async (req, res) => {
  const search = (req.query.search || '').trim();
  const category = (req.query.category || '').trim();
  const sort = (req.query.sort || '').trim();

  let filter = {};

  // Search by title, location and country
  if (search) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(escapedSearch, 'i');

    filter.$or = [{ title: regex }, { location: regex }, { country: regex }];
  }

  // Category filtering
  if (category && category !== 'All stays') {
    filter.category = category;
  }

  // Sorting
  let sortOption = {};

  switch (sort) {
    case 'price-low':
      sortOption = { price: 1 };
      break;

    case 'price-high':
      sortOption = { price: -1 };
      break;

    case 'newest':
      sortOption = { createdAt: -1 };
      break;

    default:
      sortOption = { createdAt: -1 };
  }

  const allListings = await Listing.find(filter).sort(sortOption);

  res.render('listings/index.ejs', {
    allListings,
    search,
    category: category || 'All stays',
    sort,
  });
};

// RENDER NEW LISTING FORM
module.exports.renderNewForm = (req, res) => {
  res.render('listings/new.ejs');
};

// SHOW LISTING
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    })
    .populate('owner');

  if (!listing) {
    req.flash('error', 'Listing you requested for does not exist!');
    return res.redirect('/listings');
  }

  res.render('listings/show.ejs', { listing });
};

// CREATE LISTING
module.exports.createListing = async (req, res) => {
  const listingData = { ...req.body.listing };

  // Use the manually selected category; otherwise detect it from title/description.
  if (!listingData.category) {
    listingData.category = detectCategory(
      listingData.title,
      listingData.description,
    );
  }

  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const url = req.file.path;
  const filename = req.file.filename;

  const newListing = new Listing(listingData);

  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();

  req.flash('success', 'New Listing Created!');
  res.redirect('/listings');
};

// RENDER EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash('error', 'Listing you requested for does not exist!');
    return res.redirect('/listings');
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace('/upload', '/upload/w_250');

  res.render('listings/edit.ejs', {
    listing,
    originalImageUrl,
  });
};

// UPDATE LISTING
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash('error', 'Listing you requested for does not exist!');
    return res.redirect('/listings');
  }

  const listingData = { ...req.body.listing };

  // Preserve the saved category if the edit form does not send one.
  if (!listingData.category) {
    listingData.category =
      listing.category ||
      detectCategory(
        listingData.title || listing.title,
        listingData.description || listing.description,
      );
  }

  Object.assign(listing, listingData);

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await listing.save();

  req.flash('success', 'Listing Updated!');
  res.redirect(`/listings/${id}`);
};

// DELETE LISTING
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    req.flash('error', 'Listing you requested for does not exist!');
    return res.redirect('/listings');
  }

  req.flash('success', 'Listing Deleted!');
  res.redirect('/listings');
};
