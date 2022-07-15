import { Grid, Paper, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Router from "next/router";

const columns = [
  { field: "name", headerName: "Name", width: 300 },
  { field: "type", headerName: "Type", width: 300 },
  { field: "field", headerName: "Field", width: 300 },
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "actions",
    headerName: "Actions",
    width: 300,
    renderCell: (params) => {
      return (
        <Button
          variant="contained"
          onClick={() => Router.push(`/rules/${params.id}`)}
        >
          Edit
        </Button>
      );
    },
  },
];

export const rows = [
  {
    id: "c27f0baf-a8dd-44ab-a008-e2893e6acbf6",
    name: "Unit Number Required",
    type: "editable",
    field: "UnitNumber",
  },
  {
    id: "aeb2080b-b36b-4d34-85b4-8b9a48b32af8",
    name: "Unit Number Valid",
    type: "valid",
    field: "UnitNumber",
  },
];

export default function Home() {
  return (
    <Grid ontainer spacing={2} sx={{ marginTop: 1 }}>
      <Paper>
        <div style={{ height: "85vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            isCellEditable={false}
            isRowSelectable={false}
          />
        </div>
      </Paper>
    </Grid>
  );
}
