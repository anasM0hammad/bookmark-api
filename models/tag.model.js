const mongoose = require('mongoose') ;

const Schema = mongoose.Schema ;

const TagSchema = new Schema({
	title: {type: String, required: true},
});

TagSchema.set('timestamps', true);
module.exports = mongoose.model('Tag', TagSchema) ;