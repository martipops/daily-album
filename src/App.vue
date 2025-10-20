<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';

export default {
  components: {
    IonApp,
    IonRouterOutlet
  },
  data() {
    return {
      CLIENT_ID: '' as string,
      CLIENT_SECRET: '' as string,
      code: '' as string | null,
      token: '' as string,
      verifier: '' as string,
      loading: true
    }
  },
  methods: {
    async getAccessToken(clientId: string, code: string){
      const verifier = localStorage.getItem("verifier") as string;
      const url = 'https://accounts.spotify.com/api/token';
      const params = new URLSearchParams();

      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", "https://127.0.0.1:3000/callback");
      params.append("client_id", clientId);
      params.append("code_verifier", verifier);

      const response = await fetch(url, {
        method: "POST",
        body: params.toString(),
      })

      const data = await response.json();
    },
    async fetchUserProfile(token: string): Promise<any> {

    },
    async populateUI(profile: any){

    },
    async redirectToAuthCodeFlow(clientId: string) {
      this.verifier = await this.generateCodeVerifier(128);
      const challenge = await this.generateCodeChallenge(this.verifier);

      localStorage.setItem("verifier", this.verifier);

      const params = new URLSearchParams();
      params.append("client_id", this.CLIENT_ID);
      params.append("response_type", "code");
      params.append("redirect_uri", "https://127.0.0.1:3000/callback");
      params.append("scope", "user-read-private user-read-email");
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", challenge);

      window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    },
    async generateCodeVerifier(length: number): Promise<string>{
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    async generateCodeChallenge(verifier: string){
      const data = new TextEncoder().encode(verifier);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
    },
    logInAction(){
      this.redirectToAuthCodeFlow(this.CLIENT_ID);
    },
  },
  async mounted() {
    this.CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
    this.CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || '';
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    
    if (!this.CLIENT_ID) {
      console.error('CLIENT_ID is still not defined! Environment variables not loading properly');
      return;
    }
    if (code) {
      await Preferences.set({ key: 'spotify_code', value: code });
      this.code = code;
      this.getAccessToken(this.CLIENT_ID, this.code);
    } else {
      const stored = await Preferences.get({ key: 'spotify_code' });
      this.code = stored.value;
    }
    
    if (!this.code) {
      this.redirectToAuthCodeFlow(this.CLIENT_ID);
    } else {
      console.log(this.code);
    }
  }
}
</script>
