import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

interface Client {
  firstName: string;
  lastName: string;
  age: string;
  address: string;
  coordinate: Coordinate
}
interface Coordinate{
  coordinate_x: number,
  coordinate_y: number
}

interface ClientListProps {
  clients: Client[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Idade</th>
          <th>Endereço</th>
          <th>Coordenada X</th>
          <th>Coordenada Y</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{client.firstName}</td>
            <td>{client.lastName}</td>
            <td>{client.age}</td>
            <td>{client.address}</td>
            <td>{client.coordinate.coordinate_x}</td>
            <td>{client.coordinate.coordinate_y}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClientList;
