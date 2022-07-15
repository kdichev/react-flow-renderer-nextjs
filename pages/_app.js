import { CssBaseline, AppBar, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>Hello World</Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
