const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


const groqClient = axios.create({
  baseURL: "https://api.groq.com/openai/v1",
  headers: {
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    "Content-Type": "application/json",
  },
});

module.exports = groqClient;