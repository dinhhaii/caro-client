import axios from "axios";
const API_URL = "http://localhost:3000";

export default function callAPI(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${API_URL}${endpoint}`,
    data: body
  }).catch(err => {
    console.log(err);
  });
}
