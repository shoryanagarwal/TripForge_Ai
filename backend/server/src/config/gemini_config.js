const {GoogleGenAI} = require('@google/genai')
const dotencv=require('dotenv')
dotencv.config();


const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY

})


module.exports=ai;