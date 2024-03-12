import React from 'react';

interface Coordinate {
  coordinate_x: number;
  coordinate_y: number;
}

interface Props {
  route: Coordinate[];
}

const RotaOtimizada: React.FC<Props> = ({ route }) => {
  return (
    <div className='mt-4'>
      <h2>Melhor Rota:</h2>
      <ol>
        {route.map((client, index) => (
          <li key={index}>{`Cliente ${index + 1}: (${client.coordinate_x}, ${client.coordinate_y})`}</li>
        ))}
      </ol>
    </div>
  );
}

export default RotaOtimizada;
