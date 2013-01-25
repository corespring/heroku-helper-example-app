print("001_insert_users ...");
db.users.insert({name: "Ed"});
db.users.insert({name: "Ev"});
db.users.insert({name: "Mikl"});
db.users.insert({name: "Joshua"});

//Down
db.users.remove({});
