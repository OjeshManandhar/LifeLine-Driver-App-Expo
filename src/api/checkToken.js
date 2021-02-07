// packages
import Axios from 'axios';

// env
import { API_URL, CHECK_TOKEN } from '@env';

export default async function (userToken) {
  return Axios.post(API_URL + CHECK_TOKEN, {
    token: userToken
  });
}
