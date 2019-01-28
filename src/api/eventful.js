import axios from 'axios';

export default axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});
