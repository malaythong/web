// plugins/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://139.162.58.197:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
