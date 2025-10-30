import { Preferences } from '@capacitor/preferences';

export function useSpotifyApi() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string;
  let code = "" as string | null;
  const token = "" as string;
  let verifier = "" as string;
  let loading = true;

  async function redirectToAuthCodeFlow(client_id: string) {
    verifier = await generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("response_type", "code");
    params.append("redirect_uri", "https://127.0.0.1:3000/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }
  async function generateCodeVerifier(length: number) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  async function generateCodeChallenge(verifier: string) {
    const data = new TextEncoder().encode(verifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  async function getAccessToken(clientId: string, code: string){
      const verifier = localStorage.getItem("verifier") as string;
      const params = new URLSearchParams();

      // STILL NEEDS TO BE FINISHED
      // params.append
    }
    async function fetchUserProfile(token: string): Promise<any> {

    }
    async function populateUI(profile: any){

    }
    async function init(){
    const params = new URLSearchParams(window.location.search)
    const urlCode = params.get('code')

    if (urlCode) {
      await Preferences.set({ key: 'spotify_code', value: urlCode })
      code = urlCode
    } else {
      const stored = await Preferences.get({ key: 'spotify_code' })
      code = stored.value
    }

    loading = false
    }
}
