import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import { db } from "./lib/db.js";
import { app,server } from "./lib/socket.js"
import cors from "cors"
dotenv.config();
const PORT= process.env.PORT || 3000;
app.use(express.json()) 
app.use(cookieParser())
app.use(cors({
   origin: ['http://localhost:5173', 'https://chat-application-ebon-phi.vercel.app'],
  credentials: true
}));
const predefinedQA = [
  { question: "What services do you offer?", answer: "We provide AI automation, chatbot integration, and data scraping solutions." },
  { question: "How can I contact support?", answer: "You can reach us at support@example.com." },
  { question: "What is your pricing model?", answer: "Our pricing is flexible and depends on the service package you choose." },
  { question: "What is your business model?", answer: "We provide Fintech services" },
];
app.get('/api/questions', (req, res) => {
  res.json(predefinedQA);
});
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
server.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
    db()
})