import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import RegisterClient from './components/RegisterClient';
import ClientList from './components/ClientList';

interface Client {
  first_name: string;
  last_name: string;
  age: string;
  address: string;
}

const App: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:4000/Clients');
        const data = await response.json();
        setClients(data.clients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterTerm(e.target.value);
  };

  const filteredClients = clients.filter((client) => {
    const searchTerm = filterTerm.toLowerCase();
    return (
      client.first_name.toLowerCase().includes(searchTerm) ||
      client.last_name.toLowerCase().includes(searchTerm) ||
      (client.age !== null && client.age.toString().includes(searchTerm)) ||
      client.address.toLowerCase().includes(searchTerm)
    );
  });

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
          // Update client list after successful registration
          const updatedClients = await fetchClients();
          setClients(updatedClients);
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

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:4000/Clients');
      const data = await response.json();
      return data.clients;
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  };

  return (
    <Container>
      <h1 className="mt-4">Client List</h1>
      <Form.Group controlId="formFilter">
        <Form.Label>Filter by Name or Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Procure por Nome, idade, ou endereço"
          value={filterTerm}
          onChange={handleFilterChange}
        />
      </Form.Group>

      <ClientList clients={filteredClients} />

      <RegisterClient onSubmit={handleRegisterSubmit} />
    </Container>
  );
};

export default App;
