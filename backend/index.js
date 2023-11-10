require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// express app
const app = express();
const pharmacistRouter = require("./routes/pharmacistRouter");
const adminRouter = require("./routes/adminRouter");
const patientRouter = require("./routes/patientRouter");
const guestRouter = require("./routes/guestRouter");
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
// const bodyParser = require("body-parser");

const MongoURI = process.env.MONGO_URI;

// mongo connection string
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser());


// routes
app.use("/pharmaApi/patient", patientRouter);
app.use("/pharmaApi/pharmacist", pharmacistRouter);
app.use("/pharmaApi/admin", adminRouter);
app.use("/pharmaApi/guest", guestRouter);

// listen for requests
// listen for requests
app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});

