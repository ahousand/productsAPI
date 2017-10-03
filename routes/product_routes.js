module.exports = function(app,db){


  app.get('', (req, res) =>{
    res.send('Home');
  });

  app.get('/productsSearch', (req, res) =>{
    db.collection('products').find({},{name: true, description: true, _id: false}).toArray(function(err, result) {
      if (err){
        res.send({'error': 'An error has occurred.'});
      } else {
        res.send(result);
      }
    })
  });


//both below get requests do not return products on the date the spoil - in order to do that
//it would need to be {$gte: date}
  app.get('/productsSearch/:date', (req,res) =>{
    var products = [];
    const date = new Date(req.params.date);
    db.collection('shipments').find({date_arriving: {$lte: date}, date_spoiling: {$gt:date}},
    {product_id:true, count:true, _id:false})
    .toArray(function(err,result){
      if(err){
        res.send({'error': 'An error has occurred retrieving the shipments.'});
      } else {
        var ids = [];
        for (var i = 0; i< result.length; i++){
          ids.push(parseInt(result[i].product_id));
        }
        if(result.length){
          db.collection('products').find({id : {$in: ids}},
            {name: true, description: true, _id:false})
          .toArray(function(err,result){
            if(err){
              res.send({'error': 'An error has occurred retrieving the products.'});
            } else {
              products = result;
              res.send(result);
            }
          });
        }
        else {
          res.send(products);
        }
      }
    })
  });


  app.get('/productsSearch/:date/:product', (req, res) => {
    var products = [];
    const date = new Date(req.params.date);
    var name = req.params.product;

    db.collection('shipments').find({date_arriving: {$lte: date}, date_spoiling: {$gt:date}},
    {product_id:true, count:true, _id:false})
    .toArray(function(err,result){
      if(err){
        res.send({'error': 'An error has occurred retrieving the shipments.'});
      } else {
        var counts = []
        var ids = [];
        for (var i = 0; i< result.length; i++){
          ids.push(parseInt(result[i].product_id));
        }
        if(result.length){
          db.collection('products').find({id : {$in: ids}, name: name},
            {name: true, description: true, _id:false})
          .toArray(function(err,result){
            if(err){
              res.send({'error': 'An error has occurred retrieving the products.'});
            } else {
              if(result.length){
                res.send(result);
              }
              else{
                res.send(name + ' is not available on that date.');
              }
            }
          });
        }
        else {
          res.send(products);
        }
      }
    });
});


};
