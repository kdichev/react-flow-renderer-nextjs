import { Grid, Button } from "@mui/material";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();
  return (
    <Grid ontainer spacing={2} sx={{ marginTop: 1 }}>
      <Button variant="contained" onClick={() => router.push("/rules")}>
        Go to Routes
      </Button>
    </Grid>
  );
};

export default IndexPage;
