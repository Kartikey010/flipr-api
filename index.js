import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"

import { notesModal } from "./Modal/noteSchema.js";

const app= express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT= 8000 || process.env.PORT;
const MONGODB_URL=process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        app.listen(PORT,()=>{
            console.log("server running on port 8000");
        })
    })
    .catch((error)=>{
        console.log(error);
    })

app.get("/",(req,res)=>{
    res.send("api is working ");
})

app.post("/add-note",async(req,res)=>{
    
    console.log(req.body);
    const title =req.body.title;
    const description =req.body.description;
    
const newNote = new notesModal({ title:title, description:description });
try {
  await newNote.save();
  res.status(200).send("Note added successfully");
} catch (error) {
  console.log(error);

  }
}
)

app.patch("/update",async(req,res)=>{
    
    const title = req.body.title;
    const description = req.body.description;
    
    await notesModal.findOneAndUpdate({title:title},{description:description},{new:true})
    .then(()=>{
        res.status(200).send("note updated successfully");
    })
    .catch(error=>{
        console.log(error);
    })
})

app.delete("/delete-note",async(req,res)=>{
     
     const title = req.body.title;

     try{
    const noteDelete = await notesModal.findOneAndDelete({title:title})
    if(noteDelete){
    res.status(200).send("Note deleted successfully");
    }
    else{
        res.send("NO user found to delete");
    }
     }
     catch(error){
      console.log(error);
     }

})

app.get("/fetch-note",(req,res)=>{

    const title = req.body.title;
    try{
    const isNoteAvailable = notesModal.find({title:title});
    if(isNoteAvailable){
        res.status(200).send(isNoteAvailable.description);
    }
    else{
        res.send("note not available for this title")
    }
   }
   catch(error){
    console.log(error);
   }

})

app.get("/fetch-all-notes",async (req,res)=>{

    try{
        const allNotes = await notesModal.find({}).select("title -_id description");
        //const allNotes = await Notes.toArray();
        if(allNotes){
            res.status(200).send(allNotes);
        }
        else{
            res.send("There are no notes to show")
        }
    }
    catch(error){
        console.log(error);
    }
})



