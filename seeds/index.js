const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelper')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

//error handling for database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63b086b1a116ab548e815de3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, distinctio impedit? Ut eligendi iusto doloremque, dolorem placeat itaque sunt sed illum non voluptas neque. Molestiae quia sit quasi nemo eius.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});