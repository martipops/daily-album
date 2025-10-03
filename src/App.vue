<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

export default {
  components: {
    IonApp,
    IonRouterOutlet
  },
  data() {
    return {
      CLIENT_ID: import.meta.env.CLIENT_ID,
      CLIENT_SECRET: import.meta.env.CLIENT_SECRET,
      token: null as string | null,
      loading: true
    }
  },
  methods: {
    async fetchSpotifyToken() {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
      })
      const data = await response.json()
      this.token = data.access_token
      this.loading = false
      console.log('Fetched Spotify token:', this.token)
    }
  },
  mounted() {
    this.fetchSpotifyToken()
  }
}
</script>
