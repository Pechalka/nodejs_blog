
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , public = require('./routes/public');

var app = express();

var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views' });
app.engine('.html', ectRenderer.render);
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// -------------- routes ------------------------------
app.get('/', public.index);
app.get('/about', public.about);
app.get('/gallery', public.gallery);
app.get('/blog', public.blog_list);
app.get('/blog/:id', public.blog_detail);
app.get('/contact', public.contact);
// -------------- routes ------------------------------

http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});
