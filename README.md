### CustomerManagementNRT

#### Instruções de Configuração

1. **Clonar o repositório**


2. **Criar a Database no PostgreSQL**
- Execute o seguinte comando no PostgreSQL para criar a tabela necessária:
  ```sql
  CREATE TABLE clients (
    person_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    coordinate_x INTEGER NOT NULL,
    coordinate_y INTEGER NOT NULL
  );
  ```

3. **Instalar as Dependências do Backend**
- Navegue até a pasta `FacilitaJuridico` e execute:
  ```
  cd FacilitaJuridico
  npm install
  ```

4. **Instalar as Dependências do Frontend**
- Navegue até a pasta `facilitajuridicoreactapp` e execute:
  ```
  cd facilitajuridicoreactapp
  npm install
  ```

5. **Iniciar o Servidor do Frontend**
- Execute o seguinte comando na pasta `facilitajuridicoreactapp`:
  ```
  npm start
  ```

6. **Compilar e Iniciar o Servidor do Backend**
- Navegue até a pasta `FacilitaJuridico` e execute:
  ```
  npm run build
  npm run start
  ```

Essas instruções devem ajudar a configurar e executar o projeto CustomerManagementNRT. Certifique-se de ter o PostgreSQL instalado e em execução antes de criar a tabela do banco de dados.
