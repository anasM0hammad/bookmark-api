const Bookmark = require('../models/bookmarks.model') ;

exports.fetchAllBookmarks = (req, res, next) => {
	Bookmark.find().then(allBookmarks => {
		res.status(200).json({
			bookmarks : allBookmarks
		}); 
		return ;
	})
	.catch(err => {
		console.log(err) ;
		res.sendStatus(500) ;
	}) ;
}



exports.createBookmark = (req, res, next) => {
	const link = req.body.link ;
	const title = req.body.title ;
	const publisher = req.body.publisher ;
	const tags = req.body.tags ;   // ARRAY OF TAGS

	if(!title || !link || !publisher || !tags){
		res.sendStatus(402) ;
		return ;
	}
	else{
		const obj = {title, link, publisher, tags} ;
		const newBookmark = new Bookmark(obj) ;
		newBookmark.save().then(savedBookmark => {
			if(savedBookmark){
				res.status(200).json({
					bookmark : savedBookmark
				}) ;
			}
		})
		.catch(err => {
			console.log(err) ;
			res.sendStatus(500) ;
		})
	}
}




exports.deleteBookmark = (req, res, next) => {
	const bookmarkId = req.body.bookmark_id ;

	Bookmark.findByIdAndRemove(bookmarkId).then(result => {
		if(result){
			res.status(200).json({ message: 'deleted'}) ;
		}
	})
	.catch(err => {
		console.log(err) ;
		res.sendStatus(500)
	})
}