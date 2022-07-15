import rules from "../../data/rules.json";

export default function handler(req, res) {
  res.status(200).json(rules.find((item) => item.id === req.query.id));
}
