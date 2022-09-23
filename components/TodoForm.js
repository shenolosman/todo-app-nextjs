import { Button, TextField, Typography } from "@mui/material";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { useState, useContext, useRef, useEffect } from "react";
import { db } from "../firebase/config";
import { TodoContext } from "../context/TodoContext";
export default function TodoForm() {
  const { showAlert, todo, setTodo } = useContext(TodoContext);
  const inputRef = useRef();
  useEffect(() => {
    const clickControl = (e) => {
      if (!inputRef.current.contains(e.target)) {
        console.log("clicked the input");
        setTodo({ title: "", description: "" });
      } else {
        console.log("Clicked somewhere else");
      }
    };
    document.addEventListener("mousedown", clickControl);
    return () => {
      document.removeEventListener("mousedown", clickControl);
    };
  }, []);
  const handleClick = async (e) => {
    e.preventDefault();
    //console.log(todo)
    if (todo.title == "" || todo.description == "") {
      showAlert("error", "Title or description can't be empty!");
      return;
    }
    if (todo?.hasOwnProperty("id")) {
      //update
      const ref = doc(db, "todos", todo.id);
      const newTodo = { title: todo.title, description: todo.description, lastUpdateDate: serverTimestamp() };

      updateDoc(ref, newTodo);
      setTodo({ title: "", description: "" });
      showAlert("success", "Todo updated!");
    } else {
      //add
      const ref = collection(db, "todos");
      const docRef = await addDoc(ref, { ...todo, createdDate: serverTimestamp() });
      // console.log(docRef.id)
      setTodo({ title: "", description: "" });
      // alert(`${todo.title} added!`)
      showAlert("success", `${todo.title} added!`);
    }
  };
  return (
    <div ref={inputRef}>
      {/* <pre>{JSON.stringify(todo, null, `\t`)}</pre> */}
      <Typography sx={{ mt: 3, fontWeight: "bold" }} variant="h5" color="darkgrey">
        Add Todo
      </Typography>

      <TextField
        fullWidth
        label="Title"
        margin="normal"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        value={todo.title}
      ></TextField>
      <TextField
        fullWidth
        label="Description"
        margin="normal"
        maxRows={3}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        value={todo.description}
      ></TextField>

      {todo?.hasOwnProperty("id") ? (
        <Button sx={{ mt: 3 }} variant="outlined" color="warning" onClick={handleClick}>
          Update
        </Button>
      ) : (
        <Button sx={{ mt: 3 }} variant="outlined" color="success" onClick={handleClick}>
          Add
        </Button>
      )}
    </div>
  );
}
