import axios from 'axios';
import CONFIG from '../config';

const {api: apiConfig} = CONFIG
const {
  baseUrl: baseURL,
  authUrl,
  clientId: client_id,
  clientSecret: client_secret,
  access_token,
  token_type,
} = apiConfig;

let authHeader = btoa(client_id + ":" + client_secret)

/*
      params: {
        client_id: clientId,
        client_secret: clientSecret,
      }
 */
export default class SpotifyApi {
  constructor() {
    if (access_token && token_type) {
      this.access_token = access_token
      this.token_type = token_type
    }
    this.authAxios = axios.create({
      baseURL: authUrl,
      headers: {
        'Content-Type': 'application/x-www-form-url-encoded',
        'Authorization': `Basic ${authHeader}`
      }
    })
    if (!this.access_token && !this.token_type) {
      this.getAuthToken()
    }
    this.fetchAxios = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-url-encoded',
        'Authorization': `${this.token_type} ${this.access_token}`
      }
    })
  }

  getNewReleases() {
    return this.fetchAxios.get('new-releases', {
      params: {
        client_id,
        client_secret,
      }
    }).then(res => {
      return res.data.albums.items;
    }).catch(e => console.log(JSON.stringify(e)))
  }

  getFeaturedPlaylists() {
    return this.fetchAxios.get('featured-playlists', {
      params: {
        client_id,
        client_secret,
      }
    }).then(res => {
      return res.data.playlists.items;
    }).catch(e => console.log(JSON.stringify(e)))
  }

  getCategories() {
    return this.fetchAxios.get('categories', {
      params: {
        client_id,
        client_secret,
      }
    }).then(res => {
      return res.data.categories.items;
    }).catch(e => console.log(JSON.stringify(e)))
  }

  getAuthToken() {
    this.authAxios.post('/', {
      grant_type: 'client_credentials'
    }).then(res => {
      return res;
    }).catch(e => console.log(JSON.stringify(e)))
  }
}