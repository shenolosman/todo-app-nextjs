import { Grid, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, providerGoogle } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
export default function Login() {
  const loginGoogle = () => {
    signInWithPopup(auth, providerGoogle);
  };

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
      <Button variant="contained" startIcon={<GoogleIcon />} onClick={loginGoogle}>
        Signin with Google
      </Button>
    </Grid>
  );
}
