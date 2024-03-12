import Person from "../Entities/Person.js";
import { RouteInterface } from "../Interfaces/RouteInterface.js";

export class GetClientBestRouteUseCase{

    route_implementation: RouteInterface

    constructor(route_implementation: RouteInterface) {
        this.route_implementation = route_implementation;
      }

      run(people: Person[]){
          return this.route_implementation.GetBestRoute(people)
      }
}