import {
  getData,
  putData
} from '../helpers/apiHelper';

class FighterService {

  async getFighters() {
    try {
      const endpoint = '/users/';
      const apiResult = await getData(endpoint);

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async updateFighterDetails(figther) {
    const endpoint = `/users/${figther._id}`;
    try {
      let jsonFigther = JSON.stringify(figther);
      return putData(endpoint, jsonFigther);
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();