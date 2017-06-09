const express = require('express')
const session = require('express-session')
const app = express()

app.use(express.static('public'));

app.set('view engine','ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.get('/',(req,res)=>{
	var info = req.session;
	var username = '';
	if(info){
         console.log(req.session)
        username = info.username;
    }
    res.render('index',{
        username: info.username
    })
})

app.get('/login',(req,res)=>{
    req.session.login = true;
    req.session.username = "wally"
    res.send("登录成功")
})

app.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            throw new Error(err)
        }
        res.send('退出登录成功')
    })
})

app.listen(3000)
