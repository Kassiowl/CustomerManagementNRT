import Coordinate from '../Entities/Coordinate.js';
import Person from '../Entities/Person.js';
import { RouteInterface } from '../Interfaces/RouteInterface.js';

export default class RouteImpl implements RouteInterface {
    GetBestRoute(people: Person[]): Coordinate[] {
        // Function to calculate the distance between two points
        const calculateDistance = (coord1: Coordinate, coord2: Coordinate): number => {
            const dx = coord1.coordinate_x - coord2.coordinate_x;
            const dy = coord1.coordinate_y - coord2.coordinate_y;
            return Math.sqrt(dx * dx + dy * dy);
        };

        // Function to calculate the total distance of a route
        const calculateTotalDistance = (route: Coordinate[]): number => {
            let totalDistance = 0;
            for (let i = 0; i < route.length - 1; i++) {
                totalDistance += calculateDistance(route[i], route[i + 1]);
            }
            return totalDistance;
        };

        // Function to permute an array
        const permute = (arr: any[]): any[][] => {
            if (arr.length === 1) return [arr];
            const result = [];
            for (let i = 0; i < arr.length; i++) {
                const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
                const permutations = permute(rest);
                for (const perm of permutations) {
                    result.push([arr[i], ...perm]);
                }
            }
            return result;
        };

        // Map client coordinates to an array of coordinate objects
        const coordinates = people.map(person => person.coordinate);

        // Calculate all permutations of client locations
        const permutations = permute(coordinates);

        // Initialize the best route with an empty array
        let bestRoute: Coordinate[] = [];
        let shortestDistance = Infinity;

        // Find the route with the shortest total distance
        for (const permutation of permutations) {
            const route = [{ coordinate_x: 0, coordinate_y: 0 }, ...permutation];
            const totalDistance = calculateTotalDistance(route);
            if (totalDistance < shortestDistance) {
                shortestDistance = totalDistance;
                bestRoute = route;
            }
        }

        return bestRoute;
    }
}
