
const express = require('express');
require('express-group-routes');

const app = express();
const port = 3000;

//controllers
const ApiRoutes = require('./app/routes/api.js');

app.use("/storage", express.static(`storage`));

app.group("/api", (router) => {
    router.group("/v1", ApiRoutes);
})


app.listen(port, () => console.log(`Listening on port ${port}!`))