let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

/* -- DATA TO LOOP THROUGH -- */

let nav = [
  {link: '/', title: 'Home'},
  {link: '/movies', title: 'Movies'},
  {link: '/artist', title: 'Artists'}
]

/* -- Making Routes Work -- */

let moviesRouter = require('./src/routes/moviesRouter')(nav);
let artistRouter = require('./src/routes/artistRouter')(nav);

app.use('/movies', moviesRouter);
app.use('/artist', artistRouter);

/* -- Running the server --- */

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        nav
    })
})

/* --- SERVER IS LISTENING --- */

app.listen(5600, (err)=>{
    console.log('server is running on 5600')
});

