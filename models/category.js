'use strict';
var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	list : String
});

module.exports = mongoose.model('Category',categorySchema);
