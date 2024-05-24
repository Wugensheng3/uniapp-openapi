import { OpenAPIConfig } from './OpenAPI'

export const request = <T>(config: OpenAPIConfig, options: UniApp.RequestOptions & { body?: any }) => {
  return new Promise<T>((resolve, reject) => {
    // 提取可能存在的body、data和query参数
    const { body, data, query, ...restOptions } = options;

    // 构建最终的请求参数
    const requestOptions: UniApp.RequestOptions = {
      ...restOptions,
      url: config.BASE + options.url,
      data: body || data, // 优先使用body参数
      header: {
        ...options.header,
        'Content-Type': options.header?.['Content-Type'] || 'application/json',
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T);
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      },
    };

    // 处理 query 参数，将其添加到 URL 中
    if (query) {
      const queryString = Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
      requestOptions.url += `?${queryString}`;
    }

    uni.request(requestOptions);
  });
};
