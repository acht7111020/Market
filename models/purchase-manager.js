module.exports = function PurchaseManager(id, userEmail) {
  Store = require('./store-schema');
  this.add = function(item) {
    //console.log("\n\n\n PURCHASE!!! \n\n\n");
    //console.log("EMAIL " + userEmail + "\n\n");
    //console.log(item);
    item.available = true;
    item.ownerEmail = userEmail;
    //item.markModified('ownerEmail');
    item.save(function(err, updatedStore) {
        if (err) throw err;
        console.log("success!!");
        console.log(updatedStore);
    });
    //console.log("\n\n\n FINISH!!! \n\n\n");

  }
}
