const productRoutes = require('./product_routes.js');

module.exports = function(app,db){
  productRoutes(app, db);
};
