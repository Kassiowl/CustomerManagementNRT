import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';

interface RegisterClientProps {
  onSubmit: (formData: {
    first_name: string;
    last_name: string;
    age: string;
    address: string;
  }) => void;
}

const RegisterClient: React.FC<RegisterClientProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    address: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      first_name: '',
      last_name: '',
      age: '',
      address: '',
    });
  };

  return (
    <Container>
      <h1 className="mt-4">Register Client</h1>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterClient;
