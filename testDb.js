let db = require('./models')

// Create a traveler: traveler model must exist and be migrated

// db.traveler.create({
//   firstname: 'Test',
//   lastname: 'McTest'
// }).then(function(traveler) {
//   console.log(traveler.get())
// })

// Create a city and use the helper function create<ModelName> to create a traveler
// Requires citiesTravelers to exist, be migrated, and properly associated

db.city.findOne({
  where: { id: 1 },
  include: [db.traveler]
}).then(function(city) {
  // by using eager loading, the city model should have a name key
  console.log(city.name);

  // a createTraveler function should be available to this model
  city.createTraveler({ firstname: 'Butt', lastname: 'Farts' }).then(function(traveler) {
    console.log(traveler.get());
  });
});