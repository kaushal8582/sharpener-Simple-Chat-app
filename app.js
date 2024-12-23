const express = require("express")
const bodyParser = require("body-parser")
const userRoute = require("./router/user.router.js")

const app = express()
app.use(bodyParser.urlencoded({extended:false}))

app.use(userRoute)


app.listen(4000,()=>{
    console.log("Server is started");
})
