import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-330e5.firebaseio.com/'
});

export default instance;
