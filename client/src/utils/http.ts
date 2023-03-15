export const host = "http://localhost:3001";

export const httpGet = (path: string, options?: any) => {
  return fetch(`${host}${path}`, options);
};

export const httpPost = (path: string, options?: any) => {
  return fetch(`${host}${path}`, {
    method: "POST",
    ...options
  });
};

export const httpPut = (path: string, options?: any) => {
  return fetch(`${host}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });
};

export const httpDelete = (path: string, options?: any) => {
  return fetch(`${host}${path}`, options);
};
