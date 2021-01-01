// @ts-ignore
import { ENVIRONMENT, BASE_URL } from 'react-native-dotenv';

export const environment = (ENVIRONMENT || 'LOCAL').toString();

export const baseUrl = (BASE_URL || 'http://localhost:4000').toString();