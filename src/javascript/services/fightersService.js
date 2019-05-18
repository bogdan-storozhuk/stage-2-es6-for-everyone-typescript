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

    try {
      const res = await fetch(`./resources/api/details/fighter/${_id}.json`);
      const jsonObject = await res.json();
      return await jsonObject;
    } catch (error) {
      throw error;
    }

  };
}

export const fighterService = new FighterService();