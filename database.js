const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nileshTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.log("Failled to connect the database", error);
});