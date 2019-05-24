const API_URL = 'https://streetfighter-nodejs.herokuapp.com';


async function getData(endpoint) {
  const url = API_URL + endpoint;
  const result = await fetch(url);
  return await result.json();
}

async function putData(endpoint, data) {
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
  putData
}