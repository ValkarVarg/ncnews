import axios from 'axios'

const newsApi = axios.create({
    baseURL: 'https://nc-news-k0xf.onrender.com/api'
  });

export default newsApi