import Head from "next/head";
import styles from "../styles/Home.module.css";
import TodoList from "../components/TodoList";
import { Container } from "@mui/material";
export default function Home() {
  return (
    <Container maxWidth="md">
      <Head>
        <title>ToDo App</title>
        <meta name="description" content="NextJs ToDo application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TodoList />
      </main>

      <footer className={styles.footer}>
        <a href="https://shenolosman.github.io/" target="_blank" rel="noopener noreferrer">
          Shenol Osman
        </a>
      </footer>
    </Container>
  );
}
