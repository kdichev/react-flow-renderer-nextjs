import { Grid, Paper, TextField } from "@mui/material";
import FlowChart from "../compononents/FlowChart";
import { MarkerType } from "react-flow-renderer";
import { useState } from "react";
import { Button } from "../../node_modules/@mui/material/index";

const RuleSetTestData = {
  id: "c27f0baf-a8dd-44ab-a008-e2893e6acbf6",
  name: "Unit Number Required",
  type: "editable",
  field: "UnitNumber",
  position: { x: 100, y: 100 },
  ruleSteps: [
    {
      id: "2ae51e5e-ddc7-426d-8976-2f426d5a1106",
      label: "Channel Route",
      nextRuleWhenFalse: "cb3097c9-5672-4266-aee0-d2f890b03a3b",
      nextRuleWhenTrue: "bd077ce9-0d56-42f9-be4b-e73b4cbe6e83",
      position: { x: 100, y: 200 },
      ruleResult: null,
      isEndNode: false,
    },
    {
      id: "cb3097c9-5672-4266-aee0-d2f890b03a3b",
      label: "Unit Type requires unit number",
      nextRuleWhenFalse: "true",
      nextRuleWhenTrue: "false",
      position: { x: 100, y: 300 },
      ruleResult: null,
      isEndNode: false,
    },
    {
      id: "bd077ce9-0d56-42f9-be4b-e73b4cbe6e83",
      label: "Unit number is required",
      nextRuleWhenFalse: null,
      nextRuleWhenTrue: null,
      position: { x: 75, y: 400 },
      ruleResult: true,
      isEndNode: true,
    },
    {
      id: "bd077ce9-0d56-42f9-be4b-e73b4cbe6e84",
      label: "Unit number is not required",
      nextRuleWhenFalse: null,
      nextRuleWhenTrue: null,
      position: { x: 300, y: 400 },
      ruleResult: false,
      isEndNode: true,
    },
  ],
};

const initialLink = {
  id: RuleSetTestData.id,
  source: RuleSetTestData.id,
  target: RuleSetTestData.ruleSteps[0].id,
  type: "buttonedge",
  markerEnd: {
    type: MarkerType.Arrow,
  },
};
const nodeLinks = [
  initialLink,
  ...RuleSetTestData.ruleSteps.map((item) => ({
    id: `{item.id}-{item.nextRuleWhenFalse}`,
    source: item.id,
    target: item.nextRuleWhenFalse,
    markerEnd: {
      type: MarkerType.Arrow,
    },
  })),
  ...RuleSetTestData.ruleSteps.map((item) => ({
    id: `{item.id}-{item.nextRuleWhenTrue}`,
    source: item.id,
    target: item.nextRuleWhenTrue,
    markerEnd: {
      type: MarkerType.Arrow,
    },
  })),
];

export default function Rules() {
  const headNode = {
    id: RuleSetTestData.id,
    type: "input",
    data: { label: RuleSetTestData.name },
    position: { x: 0, y: 0 },
  };
  const ruleNodes = RuleSetTestData.ruleSteps.map((item) => ({
    id: item.id,
    type: item.isEndNode ? "output" : "default",
    data: { label: item.label },
    position: item.position,
  }));
  const [selectedNode, setSelectedNode] = useState(null);
  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item sm={12} lg={8}>
          <Paper sx={{ padding: 1, height: "85vh" }}>
            <FlowChart
              ruleNodes={[headNode, ...ruleNodes]}
              ruleLinks={nodeLinks}
              onNodeClick={(_, node) => setSelectedNode(node)}
            />
          </Paper>
        </Grid>
        <Grid item sm={12} lg={4}>
          <Paper sx={{ padding: 1 }}>
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
