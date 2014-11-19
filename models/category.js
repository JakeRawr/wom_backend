'use strict';
var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  name : 'String',
	list : []
});

categorySchema.methods.addRest = function (rest) {
  for (var i = 0; i < this.list.length; i++) {
    if(this.list[i] == rest) {
      return;
    }
  }

  this.list.push(rest);
};

module.exports = mongoose.model('Category',categorySchema);
