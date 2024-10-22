import axios from 'axios';

interface JpPostApi {
  prefs: '';
  cities: '';
  postalcode: '';
  towns: '';
}

export function callJpPostApi(postalCode: string) {
  return axios({
    method: 'GET',
    url: `https://postal-codes-jp.azurewebsites.net/api/PostalCodes/${postalCode}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      //console.log(response.data[0].city.pref);
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
      throw error;
    });
}
