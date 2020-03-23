import { GraphQLClient, request } from 'graphql-request';
import { Auth } from '../stores/UserStore';
import { BASE_URL } from 'react-native-dotenv'

export class ApiService {
    protected basePath: string = BASE_URL;
    protected authToken: string = '';
    private graphQLClient = new GraphQLClient(this.basePath);

    public async authenticatedGqlQuery(query: string): Promise<any> {
        const authToken = await this.getAuthToken();

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authToken
        };

        this.graphQLClient.setHeaders(headers);

        const response = await this.graphQLClient.request(query);
        return response;
    }

    private async getAuthToken(): Promise<string> {
        if (null !== Auth.currentUser) {
            return await Auth.currentUser.getIdToken();
        } else {
            return '';
        }
    }
}
