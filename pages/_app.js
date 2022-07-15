import { CssBaseline, AppBar, Toolbar } from "@mui/material";
import { Container } from "@mui/system";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>Rules</Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
