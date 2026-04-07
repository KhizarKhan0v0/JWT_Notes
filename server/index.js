const express = require('express')
const cors = require('cors')
const AssignToken = require('./services/auth.service')
// 👇
const cookieParser = require('cookie-parser')
const AdminOnly = require('./Middleware/authenticate')

const app = express()
app.use(express.json())
// 👇
app.use(cookieParser())
// 👇
app.use(cors({origin:'http://localhost:5174', credentials:true}))


let posts = [
    {name : 'post1', likes : '100'},
    {name : 'post2', likes : '100'},
    {name : 'post3', likes : '100'},
]


app.get('/', (req,res)=>{
    res.status(200).json({message: "working"})
})

app.get('/login', (req,res)=>{
    let {username, password} = req.query;
    console.log(username)

    if (username != 'a') {
        return res.status(404).json({message : 'incorrect username'})
    }
    try {
        let Token = AssignToken(username)
        res.cookie('jwtToken', Token, {httpOnly:true, secure:false, sameSite:'lax'})
        return res.status(200).json({logindata : {username,password}})
        
    } catch (error) {
        console.log('⚠ Error in sending response : \n', error)
    }
})

app.get('/getdata', AdminOnly , (req,res)=>{
    console.log("💬 Request received")
    res.status(200).json(posts)
})

app.listen(8080, ()=>{
    console.log("---------------------------\n\n\n\n\n\n\n\n\n");
    console.log("✅ Server Running");
    console.log("👉 http://localhost:8080/");
    
})