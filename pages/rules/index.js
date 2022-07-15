import { Grid, Paper, Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Home() {
  const router = useRouter();
  const { data, error } = useSWR("/api/getRules", (...args) =>
    fetch(...args).then((res) => res.json())
  );
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "field", headerName: "Field", flex: 1 },
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => router.push(`/rules/${params.id}`)}
          >
            Edit
          </Button>
        );
      },
    },
  ];
  return (
    <Grid ontainer spacing={2} sx={{ marginTop: 1 }}>
      <Box sx={{ height: "85vh", width: "100%" }}>
        <DataGrid
          rows={data || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          isCellEditable={false}
          isRowSelectable={false}
          loading={!data}
          error={error}
        />
      </Box>
    </Grid>
  );
}
