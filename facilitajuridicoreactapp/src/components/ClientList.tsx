import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

interface Client {
  first_name: string;
  last_name: string;
  age: string;
  address: string;
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
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{client.first_name}</td>
            <td>{client.last_name}</td>
            <td>{client.age}</td>
            <td>{client.address}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClientList;
