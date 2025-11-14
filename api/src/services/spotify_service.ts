import * as spotifyApi from '../utils/spotify.js';

export const getRefreshToken = (clientId: string, code: string, verifier: string) => {
  const data = spotifyApi.getRefreshToken(clientId, code, verifier);
  return data;
}