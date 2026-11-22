mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: listing.geometry.coordinates,
  zoom: 9,
});

const marker = new mapboxgl.Marker({
  color: 'red',
})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div class="card border-0">
        <div class="card-body p-2">
          <h5 class="card-title fw-bold mb-2">
            ${listing.title}
          </h5>
          <p class="card-text text-muted small mb-0">
            <i class="fa-solid fa-location-dot text-danger me-1"></i>
            Exact location will be provided after booking.
          </p>
        </div>
      </div>
    `),
  )
  .addTo(map);
