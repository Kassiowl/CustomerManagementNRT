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
    coordinate_x: '',
    coordinate_y: '',
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
      coordinate_x: '',
      coordinate_y: '',
    });
  };

  return (
    <Container>
      <h1 className="mt-4">Registrar Client</h1>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="formFirstName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Sobrenome"
            name="Sobrenome"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAge">
          <Form.Label>Idade</Form.Label>
          <Form.Control
            type="number"
            placeholder="Idade"
            name="Idade"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            type="text"
            placeholder="Endereço"
            name="Endereço"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCoordinatesX">
          <Form.Label>Coordenada X</Form.Label>
          <Form.Control
            type="number"
            placeholder="coordenada X"
            name="coordinate_x"
            value={formData.coordinate_x}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCoordinatesY">
          <Form.Label>Coordenada Y</Form.Label>
          <Form.Control
            type="number"
            placeholder="Coordenada Y"
            name="coordinate_y"
            value={formData.coordinate_y}
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
