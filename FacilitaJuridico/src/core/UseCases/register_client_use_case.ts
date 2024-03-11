import Client from "../Entities/Person.js";
import { ClientInterface } from "../Interfaces/ClientInterface.js";

export class RegisterClientUseCase{

    client_implementation: ClientInterface

    constructor(client_implementation: ClientInterface) {
        this.client_implementation = client_implementation;
      }

      run(client_to_register: Client){
        return this.client_implementation.RegisterClient(client_to_register)
      }
}