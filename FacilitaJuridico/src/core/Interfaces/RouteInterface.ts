import Coordinate from "../Entities/Coordinate.js";
import Person from "../Entities/Person.js";

export interface RouteInterface {
    GetBestRoute(people: Person[]): Coordinate[];
}