<template>
  <ion-page>
    <ion-content class="callback-content">
      <div class="callback-container">
        <div v-if="loading">
          <ion-spinner></ion-spinner>
          <h2>Processing authentication...</h2>
        </div>
        
        <div v-else-if="error">
          <ion-icon :icon="$icons.alertCircle" color="danger" size="large"></ion-icon>
          <h2>Authentication failed</h2>
          <p>{{ error }}</p>
          <ion-button @click="retry">Try Again</ion-button>
        </div>
        
        <div v-else>
          <ion-icon :icon="$icons.checkmarkCircle" color="success" size="large"></ion-icon>
          <h2>Authentication successful!</h2>
          <p>Redirecting to app...</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonPage, 
  IonContent, 
  IonSpinner, 
  IonButton
} from '@ionic/vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    IonPage,
    IonContent,
    IonSpinner,
    IonButton
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      loading: true,
      error: null as string | null,
    }
  },
  methods: {
    async handleCallback() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        
        if (error) {
          throw new Error(`Authorization failed: ${error}`);
        }
        
        if (!code) {
          throw new Error('No authorization code received');
        }
        
        this.loading = false;
        setTimeout(() => {
          this.router.push('/tabs/tab1');
        }, 2000);
        
      } catch (err) {
        this.loading = false;
        this.error = err instanceof Error ? err.message : 'Unknown error occurred';
      }
    },
    
    retry() {
      localStorage.removeItem('spotify_auth_code');
      localStorage.removeItem('verifier');
      this.router.push('/');
    }
  },
  
  mounted() {
    this.handleCallback();
  }
}
</script>

<style scoped>
.callback-content {
  --background: var(--ion-color-light);
}

.callback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
}

.callback-container h2 {
  margin: 1rem 0;
  color: var(--ion-color-primary);
}

.callback-container p {
  margin: 0.5rem 0 1.5rem 0;
  color: var(--ion-color-medium);
}

ion-icon {
  margin-bottom: 1rem;
}
</style>
