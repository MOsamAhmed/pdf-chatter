import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class AxiosApiCallerService {
  async DoPostApiCallAsync(
    url: string,
    payload: any,
    headers: any
  ): Promise<AxiosResponse<any, any>> {
    let response: AxiosResponse<any, any> = await axios.post(url, payload, {
      headers,
    });

    return response;
  }

  async DoGetApiCallAsync(
    url: string,
    headers: any
  ): Promise<AxiosResponse<any, any>> {
    let response: AxiosResponse<any, any> = await axios.get(url, {
      headers,
    });

    return response;
  }

  async DoDeleteApiCallAsync(
    url: string,
    headers: any
  ): Promise<AxiosResponse<any, any>> {
    let response: AxiosResponse<any, any> = await axios.delete(url, {
      headers,
    });

    return response;
  }
}
