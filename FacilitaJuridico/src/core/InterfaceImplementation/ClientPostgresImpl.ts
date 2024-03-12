import Person from "../Entities/Person.js";
import { ClientInterface } from "../Interfaces/ClientInterface.js";
import dotenv from "dotenv";
import pg from 'pg';

dotenv.config();

const Client = pg.Client;

const connectionString = process.env.DATABASE_CONNECTION_STRING


export class ClientPostgresImpl implements ClientInterface{
    private client;
    constructor() {
      this.client = new Client({
        connectionString
      });
    }
  
    async connect() {
      await this.client.connect();
    }
  
    async disconnect() {
      await this.client.end();
    }
    async RegisterClient(person: Person): Promise<boolean> {
        try {
            await this.connect();
      
            const result = await this.client.query(
              'INSERT INTO clients (first_name, last_name, age, address, coordinate_x, coordinate_y) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
              [person.firstName, person.lastName, person.age, person.address, person.coordinate.coordinate_x, person.coordinate.coordinate_y]
            );
          
            await this.disconnect();
      
            return true; 
          } catch (error) {
            console.error('Error registering client:', error);
            return false; 
          }
    }
    async GetAllClients(): Promise<Person[]> {
      try {
          await this.connect();
          
        const result = await this.client.query(
          `SELECT * FROM clients;`
        );
        const clients: Person[] = result.rows.map(row => ({
            firstName: row.first_name,
            lastName: row.last_name,
            age: row.age,
            address: row.address,
            coordinate: {
                coordinate_x: row.coordinate_x,
                coordinate_y: row.coordinate_y
            }
        }));
    
        await this.disconnect();
    
        return clients;
      } catch (error) {
        console.error('Error executing query', error);
        throw error;
      }
    }

    async GetClientsWithFilter(filter: string): Promise<Person[]> {
      try {
          await this.connect();
          
        const result = await this.client.query(
          `SELECT * FROM clients WHERE "first_name" ILIKE $1 OR "clients.last_name" ILIKE $1`,
          [`%${filter}%`]
        );
    
        const clients: Person[] = result.rows;
    
        this.client.release(); 
    
        return clients;
      } catch (error) {
        console.error('Error executing query', error);
        throw error;
      }
    }
    // GetClientsBestRoutes() {
    //     throw new Error("Method not implemented.");
    // }

}