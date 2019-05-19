import {
  callApi
} from '../helpers/apiHelper';

class FighterService {

  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(_id) {
    const path = `./resources/api/details/fighter/${_id}.json`;
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error(`Could not fetch ${path}` +
        `, received ${res.status}`)
    }
    const jsonObject = await res.json();
    return await jsonObject;

  };
}

export const fighterService = new FighterService();