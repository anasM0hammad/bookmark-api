const express = require('express') ;
const tagController = require('../controllers/tag') ;

const router = express.Router() ; 

// CREATE TAG
router.post('/create-tag', tagController.createTag) ;

// DELETE TAG
router.post('/delete-tag', tagController.deleteTag) ;


// ATTACH TAG TO BOOKBARK
router.post('/attach-tag', tagController.attachTag) ;


//  REMOVE TAG FROM A BOOKMARK
router.post('/remove-tag', tagController.removeTag) ;


// FETCH ALL TAGS
router.get('/all-tags', tagController.fetchAllTags) ;


module.exports = router ; 