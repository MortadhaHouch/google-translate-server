let express = require("express")
let dotenv = require("dotenv")
dotenv.config();
let cors = require("cors")
let bodyParser = require("body-parser");
const fetchData = require("./fetchData");
let app = express()
let {PORT} = process.env;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin:"*",
    methods:["GET","POST"]
}))
app.listen(PORT,()=>{
    console.log("server running on port ",PORT);
})
app.get("/",(req,res)=>{
    res.status(200).json({response:"hello"})
})
app.post("/translation",async(req,res)=>{
    let {requestedService,text,source,target} = req.body;
    console.log(req.body);
    try {
        let result = await fetchData(requestedService,text,source,target);
        res.status(200).json({result})
    } catch (error) {
        console.log(error);
    }
})
app.post("/detection",async(req,res)=>{
    let {requestedService,text} = req.body;
    try {
        let result = await fetchData(requestedService,text);
        res.status(200).json({result})
    } catch (error) {
        console.log(error);
    }
})