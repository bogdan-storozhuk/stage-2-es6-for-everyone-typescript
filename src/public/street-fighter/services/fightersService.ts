import {
  getData,
  putData,
  IFighterData
} from '../helpers/apiHelper';
interface IFighterService {
  getFighters:()=>Promise<Array<IFighterData>>;
  updateFighterDetails:(figther:IFighterData)=>Promise<boolean>;
}

class FighterService implements IFighterService {

  async getFighters():Promise<Array<IFighterData>> {
    try {
      const endpoint = '/users/';
      const apiResult = await getData(endpoint);

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async updateFighterDetails(figther:IFighterData):Promise<boolean>{
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