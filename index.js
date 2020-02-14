const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database."`);
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: 'Corn sauce',
      level: 'Easy Peasy',
      ingredients: ['cook', 'bake for 10min', 'eat'],
      cuisine: 'Mexican',
      dishType: 'Dish',
      duration: 30,
      creator: 'Aline'
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.find({}, { title: 1, _id: 0 });
  })
  .then(recipeDocument => {
    console.log(recipeDocument);
  })
  .then(() => {
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(works => {
    if (works) {
      console.log('Changes ran successfully');
    }
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(works => {
    if (works) {
      console.log('Changes ran successfully');
    }
  })
  .then(() => {
    return Recipe.find({}, { title: 1, _id: 0 });
  })
  .then(recipeDocument => {
    console.log(recipeDocument);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
