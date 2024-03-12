import Coordinate from '../Entities/Coordinate.js';
import Person from '../Entities/Person.js';
import { RouteInterface } from '../Interfaces/RouteInterface.js';

export default class RouteImpl implements RouteInterface {
    GetBestRoute(people: Person[]): Coordinate[] {

        const calculateDistance = (coord1: Coordinate, coord2: Coordinate): number => {
            const dx = coord1.coordinate_x - coord2.coordinate_x;
            const dy = coord1.coordinate_y - coord2.coordinate_y;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const calculateTotalDistance = (route: Coordinate[]): number => {
            let totalDistance = 0;
            for (let i = 0; i < route.length - 1; i++) {
                totalDistance += calculateDistance(route[i], route[i + 1]);
            }
            return totalDistance;
        };

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

        const coordinates = people.map(person => person.coordinate);

        const permutations = permute(coordinates);
        let bestRoute: Coordinate[] = [];
        let shortestDistance = Infinity;
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
