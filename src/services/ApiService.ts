import { AxiosInstance } from 'axios';
import AuthService from './AuthService';

export default class ApiService {
  constructor(
    protected readonly http: AxiosInstance,
    protected readonly authService: AuthService,
    protected readonly baseUri: string
  ) {}

  public async get<T>(urlPath: string, headers: any = {}): Promise<T> {
    const url = this.createURL(urlPath);
    Object.assign(headers, await this.getHeaeders());
    const response = await this.http.get<T>(url, { headers });
    return response.data;
  }

  public async post<T>(path: string, body: any, headers: any = {}): Promise<T> {
    const url = this.createURL(path);
    Object.assign(headers, await this.getHeaeders());
    const response = await this.http.post<T>(url, body, { headers });
    return response.data;
  }

  private createURL(urlPath: string): string {
    return this.baseUri + urlPath;
  }

  private async getHeaeders(): Promise<any> {
    const Authorization = await this.authService.getAuthToken();
    return Authorization ? { Authorization } : {};
  }
}
