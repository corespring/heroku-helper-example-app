db.users.find().forEach(function(u){
  u.company = "CoreSpring";
  db.users.save(u);
});

//Down
db.users.find().forEach(function(u){
  delete u.company;
  db.users.save(u);
});
