// Expo
import * as SecureStore from 'expo-secure-store';

// env
import { USER_INFO_KEY } from '@env';

class UserInfo {
  #token = null;
  #info = {
    name: null,
    contact: null,
    role: 'driver'
  };

  async init() {
    console.log('UserInfo init()');

    const data = await JSON.parse(
      await SecureStore.getItemAsync(USER_INFO_KEY)
    );

    if (data) {
      this.#token = data.token;
      this.#info = {
        name: data.name,
        role: data.role,
        contact: data.contact
      };
    }
  }

  async set(data) {
    await SecureStore.setItemAsync(USER_INFO_KEY, JSON.stringify(data));
    this.#info = {
      name: data.name,
      contact: data.contact,
      role: data.role
    };
    this.#token = data.token;
  }

  async setNewToken(token) {
    const data = { ...this.#info, token };

    await SecureStore.setItemAsync(USER_INFO_KEY, JSON.stringify(data));

    this.#token = token;
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
      role: 'driver'
    };
    this.#token = null;
  }
}

export default new UserInfo();
