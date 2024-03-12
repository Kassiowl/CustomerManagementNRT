import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form } from 'react-bootstrap';
import RegisterClient from './components/RegisterClient';
import ClientList from './components/ClientList';
import GetRoutes from './components/GetRoutes';

interface Coordinate {
  coordinate_x: number;
  coordinate_y: number;
}

interface Client {
  firstName: string;
  lastName: string;
  age: string;
  address: string;
  coordinate: Coordinate;
}

interface RouteCoordinate {
  coordinate_x: number;
  coordinate_y: number;
}

const fetchClients = async () => {
  try {
    const response = await fetch('http://localhost:4000/Clients');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clients and route:', error);
    return { clients: [], route: [] };
  }
};

const App: React.FC = () => {
  const [rawClients, setRawClients] = useState<Client[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [filterTerm, setFilterTerm] = useState('');
  const [route, setRoute] = useState<RouteCoordinate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { clients, route } = await fetchClients();
      setRawClients(clients);
      setClients(clients);
      setRoute(route);
    };

    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilterTerm(searchTerm);

    const filteredClients = rawClients.filter(client =>
      client.firstName.toLowerCase().includes(searchTerm) ||
      client.lastName.toLowerCase().includes(searchTerm) ||
      (client.age !== null && client.age.toString().includes(searchTerm)) ||
      client.address.toLowerCase().includes(searchTerm)
    );
    setClients(filteredClients);
  };

  const handleRegisterSubmit = async (formData: {
    first_name: string;
    last_name: string;
    age: string;
    address: string;
  }) => {
    try {
      const response = await fetch('http://localhost:4000/RegisterClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const updatedClients = await fetchClients();
          setRawClients(updatedClients.clients);
          setClients(updatedClients.clients);
          setRoute(updatedClients.route);
        } else {
          console.error('Registration failed');
        }
      } else {
        console.error('Server error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <h1 className="mt-4">Client List</h1>
      <Form.Group controlId="formFilter">
        <Form.Label>Filter by Name or Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Procure por nome, idade ou endereço"
          value={filterTerm}
          onChange={handleFilterChange}
        />
      </Form.Group>

      <ClientList clients={clients} />

      <RegisterClient onSubmit={handleRegisterSubmit} />

      <GetRoutes route={route} />
    </Container>
  );
};

export default App;
