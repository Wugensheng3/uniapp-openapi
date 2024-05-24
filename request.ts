/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { ApiError } from './ApiError';
import type { ApiRequestOptions } from './ApiRequestOptions'
import { CancelablePromise } from './CancelablePromise';
import type { OpenAPIConfig } from './OpenAPI'

export const request = <T>(config: OpenAPIConfig, options: ApiRequestOptions): CancelablePromise<T> => {
  return new CancelablePromise((resolve, reject, onCancel) => {
    const url = config.BASE + options.url;
    const data = options.body;

    const headers = {
      'Content-Type': 'application/json', // 根据需要修改
      ...options.headers,
    };

    const requestOptions: UniApp.RequestOptions = {
      url,
      method: options.method ?? 'GET',
      header: headers,
      data: data,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T);
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      },
    };

    const requestTask = uni.request(requestOptions);

    onCancel(() => requestTask.abort()); // 处理取消请求

  });
};
