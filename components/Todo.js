import { ListItem, ListItemText, IconButton } from "@mui/material";
import moment from "moment";
import "moment/locale/sw";
import { Delete, MoreVert } from "@mui/icons-material";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { TodoContext } from "../context/TodoContext";
import { useState, useContext } from "react";
import { useRouter } from "next/router";

export default function Todo({ todo }) {
  const { id, title, description, createdDate } = todo;
  const router = useRouter();
  const { showAlert, setTodo } = useContext(TodoContext);
  const handleDelete = async (id, e) => {
    e.preventDefault();
    const ref = doc(db, "todos", id);
    await deleteDoc(ref);
    showAlert("warning", "Todo with " + id + " deleted!");
  };

  const handleShowMore=(id,e)=>{
  router.push(`/todos/${id}`)
  }
  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#fafafa" }}
      onClick={() => setTodo({ id, title, description, createdDate })}
      secondaryAction={
        <>
          <IconButton onClick={(e) => handleDelete(id, e)}>
            <Delete />
          </IconButton>
          <IconButton onClick={(e)=>handleShowMore(id,e)}>
            <MoreVert />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={title} secondary={moment(createdDate).format("LLL")} />
    </ListItem>
  );
}
