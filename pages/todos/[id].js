import { Grid, Button, Card, CardContent, CardActions, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db } from "../../firebase/config";

export default function TodoDetail({ todoProps }) {
  const todo = JSON.parse(todoProps);

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
      <Grid item sx={4}>
        <Card sx={{ minWidth: 300, maxWidth: 600, boxShadow: 3 }} style={{ backgroundColor: "#fafafa" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {todo.title}
            </Typography>
            <Typography variant="h5" component="div" sx={{ mt: 2 }} color="GrayText">
              {todo.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/">
              <Button size="small">Back</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export const getStaticPaths = async () => {
  const snap = await getDocs(collection(db, "todos"));
  const paths = snap.docs.map((doc) => {
    return {
      params: {
        id: doc.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const docRef = doc(db, "todos", id);
  const docSnap = await getDoc(docRef);

  return {
    props: { todoProps: JSON.stringify(docSnap.data()) || null },
  };
};
