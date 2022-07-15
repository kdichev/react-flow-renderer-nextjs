import { Grid, Paper, TextField } from "@mui/material";
import FlowChart from "../compononents/FlowChart";
import { MarkerType } from "react-flow-renderer";
import { useState } from "react";
import { Button } from "../../node_modules/@mui/material/index";
import { useRouter } from "../../node_modules/next/router";
import useSWR from "swr";

export default function Rules() {
  const router = useRouter();
  const { data, error } = useSWR(
    `/api/getRules/${router.query.id}`,
    (...args) => fetch(...args).then((res) => res.json())
  );
  const [selectedNode, setSelectedNode] = useState(null);
  if (error) return <div>error</div>;
  if (!data) return <div>loading...</div>;
  const headNode = {
    id: data.id,
    type: "input",
    data: { label: data.name },
    position: { x: 0, y: 0 },
  };
  const nodes = [
    headNode,
    ...data.ruleSteps.map((item) => ({
      id: item.id,
      type: item.isEndNode ? "output" : "default",
      data: { label: item.label },
      position: item.position,
    })),
  ];
  const nodeLinks = [
    {
      id: data.id,
      source: data.id,
      target: data.ruleSteps[0].id,
      type: "buttonedge",
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    ...data.ruleSteps.map((item) => ({
      id: `${item.id}-${item.nextRuleWhenFalse}`,
      source: item.id,
      target: item.nextRuleWhenFalse,
      markerEnd: {
        type: MarkerType.Arrow,
      },
    })),
    ...data.ruleSteps.map((item) => ({
      id: `${item.id}-${item.nextRuleWhenTrue}`,
      source: item.id,
      target: item.nextRuleWhenTrue,
      markerEnd: {
        type: MarkerType.Arrow,
      },
    })),
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 0.1 }}>
        <Grid item sm={12} lg={8}>
          <Paper sx={{ padding: 1, height: "85vh" }} variant="outlined">
            <FlowChart
              ruleNodes={nodes}
              ruleLinks={nodeLinks}
              onNodeClick={(_, node) => setSelectedNode(node)}
            />
          </Paper>
        </Grid>
        <Grid item sm={12} lg={4}>
          <Paper sx={{ padding: 1 }} variant="outlined">
            <TextField
              fullWidth
              label="Label name"
              margin="normal"
              value={selectedNode?.data.label || ""}
              InputLabelProps={{ shrink: selectedNode?.data.label || false }}
            />
            <TextField
              fullWidth
              label="Type"
              margin="normal"
              value={selectedNode?.type || ""}
              InputLabelProps={{ shrink: selectedNode?.type || false }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={() => setSelectedNode(null)}
            >
              SAVE
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
