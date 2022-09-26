import Head from "next/head";
import styles from "../styles/Home.module.css";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { Container, Snackbar, Alert } from "@mui/material";
import { TodoContext } from "../context/TodoContext";
import { useState } from "react";
import Loading from "../components/Loading";
import Login from "../components/Login";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [todo, setTodo] = useState({ title: "", description: "" });
  const showAlert = (type, msg) => {
    setAlertMessage(msg);
    setAlertType(type);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
return <Login />
return <Loading type="spinningBubbles" color="gray"/>
  return (
    <TodoContext.Provider value={{ showAlert,todo,setTodo }}>
      <Container maxWidth="md">
        <Head>
          <title>ToDo App</title>
          <meta name="description" content="NextJs ToDo application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={alertType} sx={{ width: "100%" }}>
              {alertMessage}
            </Alert>
          </Snackbar>
          <TodoForm />
          <TodoList />
        </main>

        <footer className={styles.footer}>
          <a href="https://shenolosman.github.io/" target="_blank" rel="noopener noreferrer">
            Shenol Osman
          </a>
        </footer>
      </Container>
    </TodoContext.Provider>
  );
}
