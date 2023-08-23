import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class AxiosApiCallerService {
  async DoPostApiCallAsync(
    url: string,
    payload: any,
    headers: any,
  ): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(url, payload, {
        headers,
      });

      // Check the status code and handle different response types
      if (response.status >= 200 && response.status < 300) {
        return response.data; // Return successful response data
      } else {
        throw new HttpException(response.data, response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new HttpException(
          axiosError.response?.data || 'Internal Server Error',
          axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    let response: AxiosResponse<any, any> = await axios.post(url, payload, {
      headers,
    });

    return response;
  }

  async DoGetApiCallAsync(
    url: string,
    headers: any,
  ): Promise<AxiosResponse<any, any>> {
    let response: AxiosResponse<any, any> = await axios.get(url, {
      headers,
    });

    return response;
  }

  async DoDeleteApiCallAsync(
    url: string,
    headers: any,
  ): Promise<AxiosResponse<any, any>> {
    let response: AxiosResponse<any, any> = await axios.delete(url, {
      headers,
    });

    return response;
  }
}
