module.exports = function ModifyStore(storeId, file, owner) {
  var Store = require('./store-schema');
  Store.findById(storeId, function(err, store) {
    if (err) res.redirect('/');
    if (!store) res.redirect('/');
    else {
      var uploadPathPrefix = '/uploads/stores/';
      var coverImage = '';
      if (file) {
        coverImage = uploadPathPrefix + file.filename;
      }
      store.status.rented = true;
      store.detail.title = body.title;
      store.detail.owner = owner;
      store.detail.coverImage = coverImage;
      store.detail.description = body.description;
      store.save(function(err) {
        if (err) redirect('/');
      });
    }
  });
}
