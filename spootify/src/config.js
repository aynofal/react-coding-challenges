import CONFIG from './config.private'
// Adding static token as spotify api is currently down on auth api, CORS.
const {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, access_token, token_type} = CONFIG
export default {
  api: {
    baseUrl: 'https://api.spotify.com/v1/browse',
    authUrl: 'https://accounts.spotify.com/api/token',
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    access_token,
    token_type,
  }
}
