import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:1500/seed",
  headers: {
    "Content-type": "application/json"
  }
});