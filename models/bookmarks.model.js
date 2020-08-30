const mongoose = require('mongoose') ;

const Schema = mongoose.Schema ;

const BookmarkSchema = new Schema({
	link : {type: String, required: true},
	title: {type: String, required: true},
	publisher: {type: String, required: true},
	tags : [ {type: Schema.Types.ObjectId, required: false} ]
});

BookmarkSchema.set('timestamps', true);
module.exports = mongoose.model('Bookmark', BookmarkSchema) ;