const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

// var blog = new Blog({title: "Blog1", snippet:"Snippet1", body: "body1"})
// blog.save((err, data) => {
//     if (err) console.error(err);    
// })

module.exports = Blog; 