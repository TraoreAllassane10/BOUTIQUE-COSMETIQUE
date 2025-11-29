import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Listeclient } from "@/database/data";

const DernierClient = () => {
  const clients = Listeclient.slice(Listeclient.length - 5, Listeclient.length);
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
              <TableHead>Telephone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients?.map((client) => (
              <TableRow key={client.id} className="text-gray-500">
                <TableCell className="font-medium">{client.nom}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.telephone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DernierClient;
