import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useGetDataDashboardQuery } from "@/store/api/dashboardApi";

interface Client {
  id: number;
  name: string;
  email: string;
}

const DernierClient = () => {
  const { data } = useGetDataDashboardQuery(undefined);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <h1>5 Derniers clients</h1>
      </CardHeader>
      <CardContent className="w-full">
        <Table className="w-full">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="w-[100px]">Nom</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.derniersClients.map((client: Client) => (
              <TableRow key={client.id} className="text-gray-500">
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DernierClient;
