const express = require('express') ;

const bookmarkController = require('../controllers/bookmarks') ;

const router = express.Router() ;


// CREATE BOOKMARK
router.post('/create-bookmark', bookmarkController.createBookmark) ;


// DELETE BOOKMARK
router.post('/delete-bookmark', bookmarkController.deleteBookmark) ;


// FETCH ALL BOOKMARK
router.get('/all-bookmarks', bookmarkController.fetchAllBookmarks) ;


module.exports = router ;