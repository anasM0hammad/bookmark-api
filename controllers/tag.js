const Tag = require('../models/tag.model') ;
const Bookmark = require('../models/bookmarks.model') ;


exports.createTag = (req, res, next) => {
	const title = req.body.title ;

	if(!title){
		res.sendStatus(402) ;
		return ;
	}
	else{
		const newTag = new Tag({ title }) ;
		newTag.save().then(savedTag => {
			res.status(200).json({
				tag : savedTag
			}) ;
			return ;
		})
		.catch(err => {
			console.log(err) ;
			res.sendStatus(500) ;
		}) ;
	}
}


exports.deleteTag = (req, res, next) => {
	const tagId = req.body._id ;

	if(!tagId){
		res.sendStatus(402) ;
		return ;
	}
	else{
		Tag.findByIdAndRemove(tagId).then(result => {
			if(result){
				res.status(200).json({message: 'deleted'}) ;
			}
		})
		.catch(err => {
			console.log(err) ;
			res.sendStatus(500) ;
			return ;
		})
	}
}


exports.attachTag = (req, res, next) => {
	const bookmarkId = req.body.bookmark_id ;
	const tagId = req.body.tag_id ;

	Bookmark.findOne({_id: bookmarkId}).then(bookmark => {
		const tags = bookmark.tags ;

		for(let tag of tags){
			if(tag == tagId){
				res.status(200).json({ message: 'already attached'}) ;
				return ;
			}
		}

		bookmark.tags.push(tagId) ;
		return bookmark.save() ;
	})
	.then(savedBookmark => {
		if(savedBookmark){
			res.status(200).json({ message: 'attached'}) ;
			return ;
		}
	})
	.catch(err => {
		console.log(err) ;
		res.sendStatus(500) ;
		return ;
	});
}


exports.removeTag = (req, res, next) => {
	const bookmarkId = req.body.bookmark_id ;
	const tagId = req.body.tag_id ;

	Bookmark.findOne({_id: bookmarkId}).then(bookmark => {
		const tags = bookmark.tags ;
		let isAttached = false ;
		let index = 0;

		for(let tag of tags){
			if(tag == tagId){
				isAttached = true ;
				break ;
			}
			index++ ;
		}

		if(!isAttached){
			res.status(200).json({message: 'tag not attached'}) ;
			return ;
		}else{
			bookmark.tags.splice(index,1) ;
			return bookmark.save() ;
		}
	})
	.then(savedBookmark => {
		if(savedBookmark){
			res.status(200).json({ message: 'removed'}) ;
			return ;
		}
	})
	.catch(err => {
		console.log(err) ;
		res.sendStatus(500) ;
		return ;
	})
}


exports.fetchAllTags = (req, res, next) => {
	Tag.find().then(allTags => {
		if(allTags){
			res.status(200).json({
				tags : allTags
			}) ;
			return ;
		}
	})
	.catch(err => {
		console.log(err) ;
		res.sendStatus(500) ;
		return ;
	});
}