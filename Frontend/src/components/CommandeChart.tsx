import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CommandeChart = () => {
  const data = [
    { mois: "Jan", total: 300000 },
    { mois: "Fév", total: 370000 },
    { mois: "Mar", total: 390000 },
    { mois: "Avr", total: 150000 },
    { mois: "Mai", total: 520000 },
    { mois: "Juin", total: 500000 },
    { mois: "Juil", total: 650000 },
    { mois: "Août", total: 800000 },
    { mois: "Sep", total: 850000 },
    { mois: "Oct", total: 900000 },
    { mois: "Nov", total: 950000 },
    { mois: "Déc", total: 1000000 },
  ];
  return (
    <Card className="w-full p-6">
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#4f46e5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CommandeChart;
