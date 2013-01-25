var express = require('express');
var app = express.createServer(express.logger());
var MongoClient = require('mongodb').MongoClient;

var dbHolder = {};

var mongoUri = process.env['HH_MONGO_URI'];

if(!mongoUri){
  throw "No mongoUri specified!";
}
else {
  console.log("using:" + mongoUri);
}

// Connect to the db
MongoClient.connect(mongoUri, function(err, db) {
  if(!err) {
    console.log("We are connected");

    dbHolder.db = db;
     // now we have a connection - tell the express to start
      app.listen(8006);
  }
});

app.use('/', function(req, res, next){
    // here we can use the mongoCollection - it is already connected
    // and will not-reconnect for each request (bad!)
    //res.end("hello there");

    if(dbHolder.db){

       var collection = dbHolder.db.collection('users');
       collection.find().toArray(function(err, items) {
         var out = "";
         if(items){
           for(var i = 0; i < items.length; i++){
             for( var z in items[i]){
               out += z + ": " + items[i][z] + "\n";
             }

           }
           res.end(out);
         } else {
           res.end("no items");
         }
       });
    }
});
