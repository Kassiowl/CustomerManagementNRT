import Person from "../Entities/Person.js";

export interface ClientInterface {
    RegisterClient(person: Person): Promise<boolean>;
    GetAllClients(): Promise<Person[]>;
    GetClientsWithFilter(filter: string): Promise<Person[]>;
    // GetClientsBestRoutes();
}