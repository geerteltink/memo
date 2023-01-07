import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);
  public axiosRef: HttpService['axiosRef'];

  constructor(private readonly httpService: HttpService) {
    this.axiosRef = httpService.axiosRef;

    this.httpService.axiosRef.interceptors.request.use((config: AxiosRequestConfig) => {
      this.logger.log(
        `Sending a ${config.method.toLocaleUpperCase()} request to '${config.baseURL || ''}${config.url}'.`
      );

      return config;
    });

    this.httpService.axiosRef.interceptors.response.use(
      (response: AxiosResponse) => {
        const { status, config } = response;
        const { url } = config;
        this.logger.log({
          service: HttpClientService.name,
          type: 'response',
          url,
          status,
        });

        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          const response = error.response;
          const { status, config, data } = response;
          const { url } = config;

          if (status >= 400 && status < 500) {
            this.logger.warn(`Client error response ${status} received from '${url}': ${JSON.stringify(data)}`);
          } else {
            this.logger.error(`Server error response ${status} received from '${url}': ${JSON.stringify(data)}`);
          }
        } else if (error.request) {
          this.logger.error(`Request error for '${error.request.config.url}': ${error.message}`);
        } else {
          this.logger.error(`Unknown error: ${JSON.stringify(error)}`);
        }

        return Promise.reject(error);
      }
    );
  }
}
