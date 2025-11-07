import { Router, useRouter } from "vue-router";


export function useSpotifyApi() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string;
  let code = "" as string | null;
  let token = "" as string;
  let verifier = "" as string;
  let loading = true;
  let error: string | null = null;

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

  async function handleRedirectCallBack(): Promise<string> {
    const router = useRouter();
    const response = new URLSearchParams(window.location.search);
    code = response.get("code");
    localStorage.setItem("code", code as string);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = localStorage.getItem("code");
      const authError = urlParams.get('error');

      if (authError) {
        retry(router);
        loading = false;
        throw new Error(`Authorization failed: ${authError}`);
      }

      if (!code) {
        retry(router);
        loading = false;
        throw new Error('No authorization code received');
      }
      const token = await getAccessToken(CLIENT_ID, code);
      loading = false;
      setTimeout(() => {
        router.push('/tabs/tab1');
      }, 2000);
      console.log("TOKEN:", token);
    } catch (err) {
      retry(router);
      loading = false;
      error = err instanceof Error ? err.message : 'Unknown error occurred';
    }
    return code as string;
  }

  function retry(router: Router){
      localStorage.removeItem('spotify_auth_code');
      localStorage.removeItem('verifier');
      router.push('/');
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

  async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://127.0.0.1:3000/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    if (!result.ok) {
      const errorText = await result.text();
      console.error("Spotify token error:", errorText);
      throw new Error(`Token request failed (${result.status})`);
    }

    const { access_token } = await result.json();
    return access_token;
  }

  async function fetchUserProfile(token: string): Promise<any> {

  }
  async function populateUI(profile: any) {

  }

  return {
    redirectToAuthCodeFlow,
    CLIENT_ID,
    getAccessToken,
    handleRedirectCallBack,
    loading,
    error,
    retry
  };
}
