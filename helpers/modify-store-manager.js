module.exports = function ModifyStore() {
  var Store = require('../models/store-schema');

  this.modify = function(body, files, storeId, owner) {
    Store.findById(storeId, function(err, store) {
      if (err) redirect('/');
      if (!store) redirect('/');
      else {
        store.status.rented = true;
        var coverImage = '';
        var contentImage = '';
        if (files.mainImage)
          coverImage = `/uploads/stores/${files.mainImage[0].filename}`;
        else
          coverImage = store.detail.coverImage;
        if (files.minorImage)
          contentImage = `/uploads/stores/${files.minorImage[0].filename}`;
        else
          contentImage = store.detail.contentImage;
        if (!store.detail.title) {
          store.status.pageView = 0;
        }
        store.detail = {
          title: body.title,
          owner: owner._id,
          coverImage: coverImage,
          contentImage: contentImage,
          description: body.description
        }
        store.save(function(err, newStore) {
          console.log(newStore);
          if (err) redirect('/');
        });
      }
    });
  }
}
