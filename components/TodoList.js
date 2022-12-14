import React, { useState, useEffect, useContext } from "react";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase/config";
import Todo from "./Todo";
import { Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const ref = collection(db, "todos");
    const q = query(ref,where("userMail","==",currentUser?.email), orderBy("createdDate", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      setTodos(
        snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdDate: doc.data().createdDate?.toDate().getTime(),
        }))
      );
    });
    return unsub;
  }, []);

  return (
    <div>
      {todos.length === 0 ? (
        <Typography variant="h5" sx={{ mt: 5, fontWeight: "bold" }}>
          Not yet any todos...
        </Typography>
      ) : (
        <Typography sx={{ mt: 5, fontWeight: "bold" }} variant="h6">
          Todo List
        </Typography>
      )}

      {todos.map((x) => (
        <Todo key={x.id} todo={x} />
      ))}
    </div>
  );
};

export default TodoList;
