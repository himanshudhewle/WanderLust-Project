function detectCategory(title = '', description = '') {
  const text = `${title} ${description}`.toLowerCase();

  const rules = [
    { category: 'Amazing pools', keywords: ['swimming pool', 'private pool', 'infinity pool', 'pool villa'] },
    { category: 'Beach Stays', keywords: ['beachfront', 'beach house', 'beach cottage', 'beach stay', 'ocean view'] },
    { category: 'Mountains', keywords: ['mountain', 'hill station', 'mountain view', 'hills'] },
    { category: 'Castles', keywords: ['castle', 'fort', 'palace'] },
    { category: 'Camping', keywords: ['camping', 'campsite', 'tent stay'] },
    { category: 'Cabins', keywords: ['cabin', 'wooden cottage', 'log cabin'] },
    { category: 'Farms', keywords: ['farmhouse', 'farm stay', 'ranch'] },
    { category: 'Arctic', keywords: ['arctic', 'igloo', 'ice hotel'] },
    { category: 'Domes', keywords: ['dome stay', 'geodesic dome'] },
    { category: 'Temples', keywords: ['temple', 'pilgrimage'] },
    { category: 'Cruises', keywords: ['cruise', 'houseboat', 'yacht'] },
    { category: 'Restaurants', keywords: ['restaurant', 'cafe', 'food court'] },
    { category: 'Iconic cities', keywords: ['city centre', 'city center', 'downtown', 'city view'] },
    { category: 'Rooms', keywords: ['room', 'bedroom', 'apartment', 'villa', 'hotel', 'guest house', 'homestay'] },
  ];

  for (const rule of rules) {
    if (rule.keywords.some((keyword) => text.includes(keyword))) {
      return rule.category;
    }
  }

  return 'Trending';
}

module.exports = detectCategory;
