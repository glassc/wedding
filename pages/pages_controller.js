var db = require('../lib/connection');
var Repository = require('../lib/repository');
var pageRepository = new Repository(db, "pages");
var async = require('async');


exports.index = function(req, res) {
    db.collection('pages').find().toArray(function(err, pages) {
        var results = [];
        pages.sort(function(a,b) { return a.order-b.order} ).forEach(function(page) {
            var data = assemble(page);
            results.push(data);
            
        });
        res.send(results);
    });
}
    


exports.details = function(req, res) {
    pageRepository.load(req.params.page, function(err, page) {
        res.send(assemble(page));
    });
}

exports.insert = function(req, res) {
    pageRepository.save({title:req.body.title, content: req.body.content, slug: req.body.slug, order:0}, function(err, page) {
        res.send( assemble(page) );
    });
}


exports.update = function(req, res) {
    pageRepository.load(req.params.page, function(err, page) {
        page.content = req.body.content;
        page.slug = req.body.slug;
        page.title = req.body.title;
        pageRepository.save(page, function(error, count) {
            res.send( assemble(page) );
        });
    });
}
      

exports.edit = function(req, res) {
  res.render(__dirname + "/view/modify");
}

exports.destroy = function(req, res) {
   pageRepository.remove(req.params.page, function(err, result) {
      res.send(204);
   });
}

exports.updateorder = function(req, res) {
    var queue = async.queue(updatepageorder, 1);
    queue.drain =  function() {
        res.send(204)
    }

    var i = 0
    req.body.pages.forEach(function(page) {
        queue.push({page:page, index:i});
        i++;
    });
}
    

function updatepageorder(task, callback) {
    pageRepository.load(task.page, function(err, page) {
        page.order = task.index;
        pageRepository.save(page, function(err, count) {
            callback();
        });
    });
}

function assemble(page)
{
    return {id: page._id, content: page.content, title: page.title, slug: page.slug, links: { self: "/api/pages/" + page._id}, order:page.order };
}