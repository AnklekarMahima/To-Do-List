import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";
env.config();
const app=express()
const port=5000;

const db=new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.use(cors());
app.use(express.json());

//ROUTES

//create todo
app.post("/todos",async(req,res)=>{
    try{
        const {description}= req.body;
        const newtodo= await db.query("INSERT INTO todo(description) VALUES($1)",[description]);
        res.json(newtodo);
    }catch(err){
        console.log(err.message);
    }
});

//get all todos
app.get("/todos",async(req,res)=>{
    try{
        const alltodos=await db.query("SELECT * FROM todo");
        res.json(alltodos.rows);
    }catch(err){
        console.log(err.message);
    }
});

//get a todo
app.get("/todos/:id",async(req,res)=>{
    try{
        const {id} =req.params;
        const currtodo=await db.query("SELECT * FROM todo WHERE todo_id=$1",[id]);
        res.json(currtodo.rows[0]);
    }catch(err){
        console.log(err.message);
    }
});

//update a todo
app.put("/todos/:id",async(req,res)=>{
    try{
        const {description}=req.body;
        const {id} =req.params;
        const updatetodo =await db.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id]);
        res.json("Todo updated!");
    }catch(err){
        console.log(err.message);
    }
});

//delete a todo
app.delete("/todos/:id",async(req,res)=>{
    try{
        const {id} =req.params;
        await db.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        res.json("Todo deleted");
        
    }catch(err){
        console.log(err.message);
    }
});
 
app.listen(port, ()=>{
    console.log("server has started");
})