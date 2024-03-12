import Coordinate from "./Coordinate.js";

export default interface Person {
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    coordinate: Coordinate
}