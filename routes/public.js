var db = require('../database');
var async = require('async');

var blocks = {};

blocks.foter = function(req, res, model, done){
	model.foter = 'Copyright © 2072 <a href="#">Your Company Name</a> | <a href="http://www.templatemo.com/preview/templatemo_365_orando">Orando</a> by <a href="http://www.templatemo.com" target="_parent" title="free templates">templatemo.com</a>';
	done();
}

blocks.topMenu = function(req, res, model, done){
	model.topMenu = [
		{ name : 'Home', url : '/' },
		{ name : 'About', url : '/about', 
			links : [
				{ name : 'Template Page 1', url : 'http://www.templatemo.com/page/1'},
				{ name : 'Template Page 1', url : 'http://www.templatemo.com/page/2'},
				{ name : 'Template Page 1', url : 'http://www.templatemo.com/page/3'},
				{ name : 'Template Page 1', url : 'http://www.templatemo.com/page/4'}
			]
		},
		{ name : 'Gallery', url : '/gallery', 
			links : [
				{ name : 'Sub Page 1', url : 'http://www.templatemo.com/page/1'},
				{ name : 'Sub Page 2', url : 'http://www.templatemo.com/page/2'},
				{ name : 'Sub Page 3', url : 'http://www.templatemo.com/page/3'},
				{ name : 'Sub Page 4', url : 'http://www.templatemo.com/page/4'},
				{ name : 'Sub Page 5', url : 'http://www.templatemo.com/page/5'},
				{ name : 'Sub Page 6', url : 'http://www.templatemo.com/page/6'}					
			]
		},
		{ name : 'Blog', url : '/blog'},
		{ name : 'Contact', url : '/contact'}			
	];
	model.selected = "/" + req.path.split('/')[1];
	done();
}

blocks.recent_posts = function(req, res, model, done){
	db.Post.find({}).sort({date: -1}).limit(3).exec(function(e, recent_posts){
		model.recent_posts = recent_posts;
		done();	
	});
}
blocks.popular_posts = function(req, res, model, done){
	db.Post.find({}).sort({coments_count: -1}).limit(3).exec(function(e, recent_posts){
		model.popular_posts = recent_posts;
		done();	
	});
}
blocks.blog_list =  function(req, res, model, done){
	db.Post.find({}).limit(3).exec(function(e, posts){
		model.posts = posts;
		done();	
	});
}

blocks.blog_detail = function(req, res, model, done){	
	db.Post.findById(req.params["id"], function(e, post){
		model.post = post;
		done(e);
	});	
}

blocks.categories = function(req, res, model, done){	
	model.categories = [
		"Integer placerat dolor vel", 
		"Condimentum vulputate augue", 
		"Felis pharetra felis sed", 
		"Tortor mi in massa donec", 
		"Dolor vel condimentum",
		"Augue felis pharetra felis sed",
		"Vulputate tortor mi in massa"
	];
	done();
};

blocks.gallery = function(req, res, model, done){	
	model.items = [
		{ _id : '1', img : 'images/portfolio/01.jpg', title : 'Etiam Faucibus Aliquet', text : 'Donec iaculis felis vel enim dignissim egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam lobortis sollicitudin nisi nec tempus. Fusce posuere gravida tincidunt. Fusce eleifend, dui in dapibus porttitor, lacus risus accumsan elit, id tempor est risus quis eros. Sed ullamcorper iaculis tristique. Aliquam id eros ante.' },
		{ _id : '2', img : 'images/portfolio/02.jpg', title : 'Aenean Rutrum Velit', text : 'Suspendisse augue velit, cursus sed tristique at, venenatis in sem. Pellentesque a sapien ligula, sed accumsan metus. Pellentesque vehicula ante ut odio dignissim ac volutpat augue fringilla. Vestibulum a sem leo, non adipiscing erat. Proin sagittis convallis turpis eget vulputate. Nullam euismod feugiat blandit.' },
		{ _id : '3', img : 'images/portfolio/03.jpg', title : 'In Augue Cursus Tortor', text : 'Nunc ac odio sed odio ultrices tincidunt id id enim. Integer ac eros tortor, a volutpat nunc. Vestibulum ipsum dolor, congue vitae molestie nec, cursus ac nibh. Sed gravida ultrices neque, sed placerat eros cursus sit amet. Donec fermentum nisl at arcu tempor semper. Curabitur neque dolor, vehicula sed volutpat in, consectetur eget lectus. Sed ut libero non massa semper dignissim.' },
		{ _id : '4', img : 'images/portfolio/04.jpg', title : 'Phasellus Tempor', text : 'Sed quis tortor quis ligula pretium viverra. Nunc vestibulum commodo massa et varius. Mauris semper, mauris sed ornare imperdiet, ipsum nisl laoreet velit, eu vulputate est magna quis magna. Cras in fringilla dui. Etiam luctus imperdiet suscipit. Nunc condimentum ultrices enim et aliquam. Vivamus viverra massa id tellus vulputate pellentesque.' },
	];
	done();
};

var render = function(req, res, view, blocks_for_render){
	var tasks = [];
	var model = {};
	for (var n = 0; n < blocks_for_render.length; n++) {
		var block_name = blocks_for_render[n];
		(function(block_name){
			tasks.push(function(callback){
				console.log('call ', block_name, ' >>');
				blocks[block_name](req, res, model, callback);
			});
		})(block_name);
		
	};

	async.parallel(tasks,
	function(err, results){
		console.log(model);
		res.render(view, model);	
	});
}

exports.index = function(req, res){
	render(req, res, 'pages/index', ['recent_posts', 'topMenu', 'foter']);
};

exports.about = function(req, res){
	render(req, res, 'pages/about', ['recent_posts', 'topMenu', 'foter']);
};

exports.gallery = function(req, res){
	render(req, res, 'pages/portfolio', ['gallery', 'recent_posts', 'topMenu', 'foter']);
};


exports.blog_list = function(req, res){
	render(req, res, 'pages/blog', ['blog_list', 'categories', 'popular_posts', 'recent_posts', 'topMenu', 'foter']);
};

exports.blog_detail = function(req, res){
	render(req, res, 'pages/fullpost', ['blog_detail', 'categories', 'popular_posts', 'recent_posts', 'topMenu', 'foter']);
};


exports.contact = function(req, res){
	render(req, res, 'pages/contact', ['recent_posts', 'topMenu', 'foter']);
};