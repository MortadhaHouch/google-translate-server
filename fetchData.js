let dotenv = require("dotenv")
dotenv.config();
async function fetchData(requestedService,text,source,target){
    let url;
    let data = {};
    data.text = text;
    if(requestedService==="translation"){
        url = process.env.TRANSLATE_URL;
        data.source = source;
        data.target = target;
    }else if(requestedService==="detection"){
        url = process.env.DETECT_URL;
    }
    try {
        let request = await fetch(url,{method:"POST",body:JSON.stringify(data),headers:{
            "Content-Type":"application/json",
            "X-API-KEY":process.env.X_API_KEY
        }})
        let response = await request.json();
        return response
    } catch (error) {
        console.log(error);
    }
}
module.exports = fetchData