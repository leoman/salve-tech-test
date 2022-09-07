import { Response } from '../types/response'
import { Clinic } from '../types/clinic'
import { Patient } from '../types/patient'

enum METHODS {
  GET = 'GET',
}

export const BASE_URL = 'http://localhost:4003/dev'

class HTTPClient {

  async request(method: METHODS, url: string) {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw response;
      }
      
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error: any) {
      throw error
    }
  }

  async get<R>(url: string): Promise<R> {
    return this.request(METHODS.GET, url)
  }
}

class API {

  protected client: HTTPClient
  protected clinicsURL = 'clinics';
  protected patientsURL = 'patients';

  constructor() {
    this.client = new HTTPClient();
  }

  public getClinics(): Promise<Response<Clinic[]>> {
    return this.client.get(`${BASE_URL}/${this.clinicsURL}`)
  }

  public getPatients(id: number): Promise<Response<Patient[]>> {
    return this.client.get(`${BASE_URL}/${this.patientsURL}/${id}`)
  }
  
}

export default new API();