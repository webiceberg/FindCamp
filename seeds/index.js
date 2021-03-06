const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../model/campground');

mongoose.connect('mongodb://localhost:27017/find-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", () =>{
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async() =>{
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'lorem ipsum dolor sit amet consectetur',
            price
        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
})