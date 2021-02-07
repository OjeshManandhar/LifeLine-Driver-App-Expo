// Expo
import * as SecureStore from 'expo-secure-store';

// env
import { USER_INFO_KEY } from '@env';

class UserInfo {
  #token = null;
  #info = {
    name: null,
    contact: null,
    role: 'Driver'
  };

  async init() {
    const data = JSON.parse(await SecureStore.getItemAsync(USER_INFO_KEY));

    if (data) {
      this.#token = data.token;
      this.#info = {
        name: data.name,
        role: data.role,
        contact: data.contact
      };
    }
    console.log('userInfo init:', data, this.#token, this.#info);
  }

  async set(info) {
    await SecureStore.setItemAsync(USER_INFO_KEY, JSON.stringify(info));
    this.#info = {
      name: info.name,
      contact: info.contact,
      role: info.role
    };
    this.#token = info.token;
  }

  getToken() {
    return this.#token;
  }

  getContact() {
    return this.#info.contact;
  }

  getInfo() {
    return this.#info;
  }

  async delete() {
    await SecureStore.deleteItemAsync(USER_INFO_KEY);
    this.#info = {
      name: null,
      contact: null,
      role: 'Driver'
    };
    this.#token = null;
  }
}

export default new UserInfo();