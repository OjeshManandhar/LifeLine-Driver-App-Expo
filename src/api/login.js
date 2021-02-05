// packages
import axios from 'axios';

// env
import { API_URL, LOGIN_ENDPOINT } from '@env';

export default async function (phoneNumber, password) {
  const url = API_URL + LOGIN_ENDPOINT;

  return axios.post(
    url,
    {},
    {
      auth: { username: phoneNumber, password }
    }
  );
}
