import axios, { AxiosResponse } from 'axios';

type DataType = string | boolean | number;
export interface ResponseDataProps {
  [key: string]: DataType;
}

// Need to fix this
// In case of network error
const prepareResponse = (response: AxiosResponse): ResponseDataProps => {
  return {
    success: true,
    error: false,
    status: response.status,
    message: response.data.msg,
    data: response.data.data,
  };
};

// Prepare catch
const prepareCatchResponse = (err: ResponseDataProps) => {
  return {
    success: false,
    error: true,
    message: `${err.name} - ${err.message}`,
    status: err.status,
  };
};

export const getRequest = (url: string, next: (d: ResponseDataProps) => void) => {
  axios
    .get(url)
    .then((response) => next(prepareResponse(response)))
    .catch((err) => next(prepareCatchResponse(err)));
};
