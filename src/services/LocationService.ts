// import { BASE_URL } from 'react-native-dotenv'
import { Location } from '../model/Location';
import { ApiService } from './ApiService';
import { Auth } from '../stores/UserStore';

// const BASE_API: string = BASE_URL;

export class LocationService {
    private apiService = new ApiService();

    public async getLocations(): Promise<Location[]> {
        const query: string = `
        query { getLocations(
            input: ""
          ) {
                locations{
                    id
                    latitude
                    longitude
                    name
                    description
                },
                errors{
                    message
                }
            }
        }
      `;

        try {
            const response = await this.apiService.authenticatedGqlQuery(query);
            if (response.getLocations.locations === null || response.getLocations.errors.length > 0) {
                throw (response.getLocations.errors);
            }
            const locations: Location[] = response.getLocations.locations;
            return locations;
        } catch (error) {
            throw (error);
        }
    }

}