// packages
import axios from 'axios';

// env
import { API_URL, CHECK_TOKEN } from '@env';

export default async function (userToken) {
  return axios.post(API_URL + CHECK_TOKEN, {
    token: userToken
  });
}
