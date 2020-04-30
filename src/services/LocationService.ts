// import { BASE_URL } from 'react-native-dotenv'
import { Location } from '../model/Location';
// const BASE_API: string = BASE_URL;

export class LocationService {

    public async getLocations(): Promise<Location[]> {
        const locationA: Location =
        {
            latitude: 44.976400,
            longitude: -93.268548,
            description: "Customer location A",
            name: "Custom A"
        }
        const locationB: Location =
        {
            latitude: 44.986400,
            longitude: -93.368548,
            description: "Customer location B",
            name: "Custom B"
        }

        return [locationA, locationB];
    }

}