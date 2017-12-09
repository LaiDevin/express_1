var express = require('express');
var router = express.Router();
var mysql = require('../models/db');


router.get('/', (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    }
    res.redirect('/home');

}).get('/login', (req, res, next) => {
    res.render('login', {});
}).get('/signup', (req, res, next) => {
    res.render('signup');
}).post('/login', (req, res) => {
    console.log('login body: ', req.body);
    var resData = {'code': -200, 'msg': 'failed' ,'data': []};
    let email = req.body.email, ps = req.body.password;

    mysql.sqlquery("select name from user where 1=1 and name='" + email + "' and ps = '" + ps + "'", data => {
        console.log("data: ",data);
        if (data.length < 1) {
            resData['msg'] = '账户不存在或账户密码错误';
        } else {
            resData['code'] = 0;
            resData['msg'] = "success";
            resData['data'].push({'type': 1, 'name': 'Nodejs'})

            req.session.user = req.body;
        }
        res.send(resData);
        res.end();
    });  
   
}).get('/logout', (req, res, next) => {
    req.session.user = null;
    res.redirect('/login');
}).post('/signup', (req, res, next) => {
    var dat = req.body;
    console.log(dat);

    var resData = {'code': -200, 'msg': 'failed' ,'data': []};

    mysql.sqlquery("select name from user where 1=1 and name='" + dat.s_email + "'", data => {
        console.log("data: ",data);
        if (data.length > 0) {
            resData['msg'] = '已经存在这个用户名邮箱了';
            res.send(resData);
            res.end();
        } else {

            var insertsql = "insert into `user`(`name`, ps, sex)values('" + dat.s_email + "','" + dat.s_ps + "','" + dat.gender + "');"

            mysql.sqlquery(insertsql, insertdata => {
                console.log('insertdata:',insertdata)
                req.session.user = null;
                resData['code'] = 0;
                resData['msg'] = "success";
                res.send(resData);
                res.end();
            })
        }
       
    });  
})

router.post('/home/:article_cate', (req, res, next) => {

    if (!req.session.user) {
        res.redirect('../login');
    }

    console.log('req body: ', req.body);

    var getCateSql = "SELECT ar.*,ar_con.`content` FROM "
    + " (SELECT a.*, au.`name`, au.`phone` FROM article a LEFT JOIN author au ON a.`author_id` = au.`author_id` ) ar "
    + " LEFT JOIN article_content ar_con ON ar.`article_id` = ar_con.`article_id` WHERE ar.`cate_type` = " + req.body.type + ";";

    var category = ['Nodejs', 'C++', 'Python', 'Java']
    
    var content = [];

    mysql.sqlquery(getCateSql, data => {
        console.log('data: ', data);
        data.forEach(e => {
            content.push(e) 
        })
        content = data;
        //console.log('content: ', content[0].name);

        res.send( {'title': 'Welcome To My Blog',  'content': content, 'category': category});
        res.end();
    });

}).get('/home', (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    }

    res.render('home', {'title': 'Welcome To My Blog', 'blog': {'title': 'Nodejs'}});
})

module.exports = router;