const express = require("express");
const apiRoute = require("./route/apiRoute");
const htmlRoute = require("./route/htmlRoute");


const app = express();

let PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// API route
app.use("/api", apiRoute);
// HTML route
app.use("/", htmlRoute);

// server listen
app.listen(PORT, () => {
    console.log(`PORT ${PORT} is listening`);
});