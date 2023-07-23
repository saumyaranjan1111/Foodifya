const express = require('express')
const app = express()
const port = 5000 || process.env.PORT
const connectToMongoDB = require('./db')
app.use(express.json());
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})



// connects our backend node to the mongodb database
connectToMongoDB();

// if someone hits the endpoint /api/createuser then the code in the ./Routes/CreateUser.js will be executed
// ./Routes/CreateUser returns router which handles all the requests made to the /api endpoint

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.get('/', (req, res)=>{
    res.send("Hello World!")
})

app.listen(port, ()=>{
    console.log("App listening on port : " + port)
})