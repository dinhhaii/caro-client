import axios from "axios";
import { API_URL } from "./constants";

export default function callAPI(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${API_URL}${endpoint}`,
    data: body
  }).catch(err => {
    console.log(err);
  });
}
