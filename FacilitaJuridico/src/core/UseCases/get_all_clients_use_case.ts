import Client from "../Entities/Person.js";
import { ClientInterface } from "../Interfaces/ClientInterface.js";

export class GetAllClientsUseCase{

    client_implementation: ClientInterface

    constructor(client_implementation: ClientInterface) {
        this.client_implementation = client_implementation;
      }

      run(){
        return this.client_implementation.GetAllClients();
      }
}