
import { Button, TextField, Typography } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";
export default function TodoForm() {
  const [todo, setTodo] = useState({ title: "", description: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    //console.log(todo)
    if(todo.title==""||todo.description==""){return}
    const ref = collection(db, "todos");
    const docRef=await addDoc(ref,{...todo,createdDate:serverTimestamp()})
    // console.log(docRef.id)
    setTodo({title:"",description:""})
    // alert(`${todo.title} added!`)
  };
  return (
    <div>
      <Typography sx={{ mt: 3, fontWeight: "bold" }} variant="h5" color="darkgrey">
        Add Todo
      </Typography>

      <TextField
        fullWidth
        label="Title"
        margin="normal"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })} value={todo.title}
      ></TextField>
      <TextField
        fullWidth
        label="Description"
        margin="normal"
        maxRows={3}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })} value={todo.description}
      ></TextField>

      <Button sx={{ mt: 3 }} variant="outlined" color="success" onClick={handleClick}>
        Add
      </Button>
    </div>
  );
}
