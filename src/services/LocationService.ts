import { Location } from '../model/Location';
import { ApiService } from './ApiService';

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

    const response = await this.apiService.authenticatedGqlQuery(query);

    if (
      response.getLocations.locations === null ||
      response.getLocations.errors.length > 0
    ) {
      throw response.getLocations.errors;
    }

    const locations: Location[] = response.getLocations.locations;

    return locations;
  }
}
