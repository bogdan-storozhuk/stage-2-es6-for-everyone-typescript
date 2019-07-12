const API_URL = 'https://streetfighter-nodejs.herokuapp.com';
interface IFighterData {
  _id: number;
  name: string;
  health: number;
  attack: number;
  defense: number;
  source:string;
}

async function getData(endpoint: string) :Promise<Array<IFighterData>>{
  const url = API_URL + endpoint;
  const result = await fetch(url);
  return await result.json();
}

async function putData(endpoint:string, data:string):Promise<boolean> {
  const result = await fetch(API_URL + endpoint, {
    method: 'PUT',
    mode: 'cors',
    cache: 'default',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
    redirect: 'follow',
    referrer: 'client',
  });

  return result.ok;
}

export {
  getData,
  putData,
  IFighterData
}