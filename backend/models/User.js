const mongoose = require('mongoose')

// destructuring Schema from mongoose
const { Schema } = mongoose

// creating a schema for the data of our users
// schema is basically the blueprint or skeleton that the data has to follow, so when we create a model using this schema, that model will store the documents in this format only
// a model is something that is a wrapper over the schema
// the model is the actual object that we can use to interact with the data, 
// in other words, we can say that the model is an instance of the original database (to understand more clearly, think of it as an reference variable to the the database of which it is a model to)
const UserSchema = new Schema({
    name:{
        type: String, 
        required: true
    },
    location:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
