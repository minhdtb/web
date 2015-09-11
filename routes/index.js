var express = require('express');
var router = express.Router();

var request = require('request');
var async = require('async');
var _ = require('lodash');
var path = require('path');
var qs = require('querystring');

const thumborRoot = 'http://127.0.0.1:8888/unsafe/';
const serviceRoot = 'http://127.0.0.1:8080/';

var get = function (url, cb) {
    request
        .get(url)
        .on('response', function (response) {
            var body = '';

            response.on('data', function (chunk) {
                body += chunk;
            });

            response.on('end', function () {
                try {
                    cb(JSON.parse(body));
                }
                catch (e) {
                    e.body = body;
                    e.url = url;
                    console.log(e);
                    cb();
                }
            });
        })
        .on('error', function () {
            cb();
        });
};

router.get('/', function (req, res) {
    async.parallel({
            hotBooks: function (callback) {
                get(serviceRoot + 'books?page=1&direction=0&sort=weight', function (books) {
                    callback(null, books);
                });
            },
            updatedBooks: function (callback) {
                get(serviceRoot + 'books?page=1&direction=0&sort=updatedAt', function (books) {
                    callback(null, books);
                });
            },
            newBooks: function (callback) {
                get(serviceRoot + 'books?page=1&direction=0&sort=createdAt', function (books) {
                    callback(null, books);
                });
            },
            topViewBooks: function (callback) {
                get(serviceRoot + 'books?page=1&direction=0&sort=views', function (books) {
                    callback(null, books);
                });
            }
        },
        function (error, result) {
            res.render('index', {
                hotBooks: result.hotBooks,
                updatedBooks: result.updatedBooks,
                newBooks: result.newBooks,
                topViewBooks: result.topViewBooks
            });
        });

});

router.get('/truyen/:book', function (req, res, next) {
    var bookNameGen = qs.escape(req.params.book);

    async.parallel({
            book: function (callback) {
                get(serviceRoot + 'book/' + bookNameGen, function (book) {
                    if (!book) {
                        return next();
                    }

                    callback(null, book);
                });
            },
            hotBooks: function (callback) {
                get(serviceRoot + 'books?page=1&direction=0&sort=weight', function (books) {
                    callback(null, books);
                });
            },
            newBooks: function (callback) {
                get(serviceRoot + 'books?page=1&direction=0&sort=createdAt', function (books) {
                    callback(null, books);
                });
            },
            topViewBooks: function (callback) {
                get(serviceRoot + 'books?page=1&direction=0&sort=views', function (books) {
                    callback(null, books);
                });
            },
            reladedBooks: function (callback) {
                get(serviceRoot + 'books?related=' + bookNameGen, function (books) {
                    console.log(books);
                    callback(null, books);
                });
            },
            chapters: function (callback) {
                get(serviceRoot + 'chapters?book=' + bookNameGen, function (chapters) {
                    callback(null, chapters);
                });
            }
        },
        function (error, result) {
            res.render('book', {
                book: result.book,
                newBooks: result.newBooks,
                hotBooks: result.hotBooks,
                topViewBooks: result.topViewBooks,
                reladedBooks: result.reladedBooks,
                chapters: result.chapters
            });
        });
});

router.get('/truyen/:book/:chapter', function (req, res) {
    var bookNameGen = qs.escape(req.params.book);
    var chapterNameGen = qs.escape(req.params.chapter);

    async.parallel({
            book: function (callback) {
                get(serviceRoot + 'book/' + bookNameGen, function (book) {
                    callback(null, book);
                });
            },
            chapter: function (callback) {
                get(serviceRoot + 'chapter?book=' + bookNameGen + '&chapter=' + chapterNameGen, function (chapter) {
                    callback(null, chapter);
                });
            },
            chapters: function (callback) {
                get(serviceRoot + 'chapters?book=' + bookNameGen, function (chapters) {
                    callback(null, chapters);
                });
            },
            nextChapter: function (callback) {
                get(serviceRoot + 'chapter?book=' + bookNameGen + '&chapter=' + chapterNameGen + '&type=next', function (chapter) {
                    callback(null, chapter);
                });
            },
            prevChapter: function (callback) {
                get(serviceRoot + 'chapter?book=' + bookNameGen + '&chapter=' + chapterNameGen + '&type=prev', function (chapter) {
                    callback(null, chapter);
                });
            },
            images: function (callback) {
                get(serviceRoot + 'image?book=' + bookNameGen + '&chapter=' + chapterNameGen, function (image) {
                    if (image) {
                        callback(null, image.images);
                    }
                    else {
                        callback(new Error('Image error.'));
                    }
                });
            }
        },
        function (error, result) {
            res.render('content', {
                book: result.book,
                chapter: result.chapter,
                chapters: result.chapters,
                nextChapter: result.nextChapter,
                prevChapter: result.prevChapter,
                images: result.images
            });
        });

});

router.get('/cover/:width/:height/:book', function (req, res, next) {
    var width = req.params.width;
    var height = req.params.height;
    var filterExt = path.extname(req.params.nameGen);
    var filter = 'filters:format(' + filterExt.substring(1) + ')';

    var bookNameGen = qs.escape(path.basename(req.params.book, filterExt));

    get(serviceRoot + 'book/' + bookNameGen, function (book) {
        if (!book) {
            return next();
        }

        request(thumborRoot + width + 'x' + height + '/' + filter + '/' + book.cover)
            .on('response', function (response) {
                res.writeHead(response.statusCode, response.headers);
            })
            .on('error', function () {
                return next();
            })
            .pipe(res);
    });
});

module.exports = router;
