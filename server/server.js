require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');


app.use(cors({

    credentials:true
}));
app.use(express.json());


app.use(cookieParser());

require("./config/mongoose.config");

require('./routes/user.routes')(app);

const favoritesRoutes = require('./routes/favorites.routes');
app.use('/api/favorites', favoritesRoutes);

const PORT = 8000;

app.listen(PORT, function () {
    console.log(`The server has started on PORT: ${PORT}`)
});
