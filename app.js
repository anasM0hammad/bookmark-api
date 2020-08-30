const express = require('express') ;
const cors = require('cors') ;
const mongoose = require('mongoose') ;

const tagRoutes = require('./routes/tag.route') ;
const bookmarkRoutes = require('./routes/bookmark.route') ;

const URL = "ENTER MONGODB DATABASE URL HERE" ;

const app = express() ;

app.use(express.json()) ;

app.use(cors()) ;

app.use(tagRoutes) ;
app.use(bookmarkRoutes) ;
app.use((req, res, next) => {
	res.sendStatus(404) ;
});


mongoose.connect(URL, { useNewUrlParser: true }).then(result => {
	console.log("Success");
	app.listen(3000) ;
})
.catch(err => {
	console.log(err) ;
});



