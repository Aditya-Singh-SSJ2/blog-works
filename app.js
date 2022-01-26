const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://aditya:abcd@cluster0.rkhve.mongodb.net/nodeTuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db');  
        app.listen(3000);})
    .catch((err) => {console.log(err)})

//Registering View Engine
app.set('view engine', 'ejs'); 
// app.set('views', 'views')


//middleware & static files
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    var blogs = [{"title": "heyy", "snippet": "aditya is making this"}];
    res.render('index', {title: "Home", blogs });
})

app.get('/about', (req, res) => {
    res.render("about", {title: "About"})
})

app.get('/create', (req, res) => {
    res.render("create", {title: "create post"})
})

app.get('/blogs', (req, res) => {
    Blog.find((err, data) => {
        if (err) console.error(err);
        res.render('index', {title: "All Blogs", blogs: data});
    }).sort({ createdAt: -1 })
})

app.post('/blogs', (req, res) => {
    // console.log(req.body)
    const blog = new Blog(req.body);
    blog.save((err, data) => {
        if (err) console.error(err);
        res.redirect('/blogs')
    })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id, (err, data) => {
        if (err) console.error(err);
        res.render('details', {title: "Blog Details", blog: data });
    })
})

app.use((req, res) => {
    res.status(404).render("404", {title: "404"})
})