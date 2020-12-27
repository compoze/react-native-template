import { User } from '../model/User';
import { request } from 'graphql-request';
import { ApiService } from './ApiService';
import { Auth } from '../stores/UserStore';
import fetch from 'node-fetch';
// @ts-ignore
import { BASE_URL, ENVIRONMENT } from 'react-native-dotenv';
import * as http from 'http';
import env = require('react-native-dotenv');

const BASE_API: string = BASE_URL;

export class UserService {
  private apiService = new ApiService();

  public async signUpUser(
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    password: string
  ): Promise<User> {
    const mutationString: string = `
        mutation { signUpUser(
            email: "${email}"
            firstName: "${firstName}"
            lastName: "${lastName}"
            phoneNumber: "${phoneNumber}"
            password: "${password}"
          ) {
                user {
                    id
                    email
                    firstName
                    lastName
                    phoneNumber
                }
                errors {
                    message
                }
            }
        }
      `;

    return request(BASE_API, mutationString).then((data) => {
      if (data.signUpUser.user === null || data.signUpUser.errors.length > 0) {
        throw data.signUpUser.errors;
      }
      return new User(data.signUpUser.user);
    });
  }

  public async getAuthenticatedUser(): Promise<User> {
    const query: string = `
        query { getUserByFirebaseId(
            id: "${Auth.currentUser.uid}"
          ) {
                user {
                    id
                    email
                    firstName
                    lastName
                    phoneNumber
                }
                errors {
                    message
                }
            }
        }
      `;

    const response = await this.apiService.authenticatedGqlQuery(query);

    if (
      response.getUserByFirebaseId.user === null ||
      response.getUserByFirebaseId.errors.length > 0
    ) {
      throw response.getUserByFirebaseId.errors;
    }

    return new User(response.getUserByFirebaseId.user);
  }

  public async signUpAuthUser(
    email: string,
    firstName: string,
    lastName: string,
    authId: string,
    phoneNumber?: string
  ): Promise<User> {
    const mutationString: string = `
        mutation { signUpAuthorizedUser(
            email: "${email}"
            firstName: "${firstName}"
            lastName: "${lastName}"
            phoneNumber: "${phoneNumber}"
            authId: "${authId}"
          ) {
                user {
                    id
                    email
                    firstName
                    lastName
                    phoneNumber
                }
                errors {
                    message
                }
            }
        }
      `;

    const response = await this.apiService.authenticatedGqlQuery(
      mutationString
    );

    if (
      response.getUserByFirebaseId.user === null ||
      response.getUserByFirebaseId.errors.length > 0
    ) {
      throw response.getUserByFirebaseId.errors;
    }

    return new User(response.getUserByFirebaseId.user);
  }

  public async uploadUserProfilePhoto(userId: number, filePath: string) {
    const env = ENVIRONMENT.toString().toLowerCase();
    //  http://localhost:4000/upload/uploadUserProfilePhoto/dev/0 default local url
    const uri = !BASE_URL.toString().includes('http')
      ? `https://${BASE_URL}/upload/uploadUserProfilePhoto/${env}/${userId}`
      : `${BASE_URL}/upload/uploadUserProfilePhoto/${env}/${userId}`;
    const options = {
      method: 'POST',
      json: {
        fields: {
          file: filePath,
        },
      },
    };
    await fetch(uri, options);
  }
}
