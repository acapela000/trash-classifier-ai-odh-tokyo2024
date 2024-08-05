import axios from "axios";

const JpPostApi = {
  prefs: "",
  cities: "",
  postalcode: "",
  towns: "",
};

export function callJpPostApi() {
  return axios({
    method: "GET",
    url: "https://postal-codes-jp.azurewebsites.net/index.html",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
      throw error;
    });
}
