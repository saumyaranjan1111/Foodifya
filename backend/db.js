const mongoose = require('mongoose')
require('dotenv').config()

const password = process.env.PASSWORD;

const mongouri = `mongodb+srv://saumyaranjan1111:${password}@cluster0.q4uqc9o.mongodb.net/Foodify?retryWrites=true&w=majority`

// this is an async function using which we can console.log all of the documents in the collection_name collection, if the collection_name collection is not present in the database, then it returns an empty arra

const fetchData = async(collection_name) => {
    try {
        const foodItemsCollection = mongoose.connection.db.collection(collection_name);
        const data = await foodItemsCollection.find({}).toArray();

        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// When you call connectToMongoDB(), the function will attempt to connect to the MongoDB server using the provided connection string (mongouri). If the connection is successful, it will log "Connected to MongoDB" and continue with the rest of your application logic. If there's an error during the connection, it will log the error message and handle it in the catch block.

// By using async/await, you can write asynchronous code in a more synchronous-looking manner, which can make it easier to read and understand the flow of your application.

const connectToMongoDB = async() => {
    try {
      await mongoose.connect(mongouri, {
            // In this example, we set both useNewUrlParser and useUnifiedTopology to true in the connection options object to ensure that Mongoose uses the latest URL parser and unified topology engine while connecting to MongoDB.
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });


        // if the mongoose.connect promise is resolved then the rest of the code below this line in the try block is executed, if not, then the catch block becomes active and performs all the statements that are written within that block.

        console.log("Connected to MongoDB");

        
        // we use the above defined fetchData function to fetch data from the 
        
        // by using a global variable, now we can use/update it anywhere in our application
        global.food_items = await fetchData("food_items");

        global.food_categories = await fetchData("food_categories");
        

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }  
}

module.exports = connectToMongoDB;