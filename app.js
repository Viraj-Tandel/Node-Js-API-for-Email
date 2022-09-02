require('./database');
const express = require('express');
const app = express();
const router = require('./Routes/router');
// Application configurations
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
    console.log('Sever started at PORT', PORT);
});