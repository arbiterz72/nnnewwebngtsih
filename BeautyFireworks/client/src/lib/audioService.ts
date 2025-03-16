// Singleton pattern untuk mengelola musik latar agar tidak berhenti ketika berpindah halaman
class AudioService {
  private static instance: AudioService;
  private backgroundMusic: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  
  private constructor() {
    // Singleton pattern - private constructor
  }
  
  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }
  
  public initBackgroundMusic(): void {
    if (!this.backgroundMusic) {
      // Gunakan file musik background dari folder public
      this.backgroundMusic = new Audio('/assets/background-music.mp3');
      this.backgroundMusic.loop = true;
      
      // Pastikan volume sesuai
      this.backgroundMusic.volume = 0.6;
      
      // Event listener untuk handling autoplay restrictions
      document.addEventListener('click', this.tryPlayMusic, { once: true });
      document.addEventListener('touchstart', this.tryPlayMusic, { once: true });
    }
  }
  
  private tryPlayMusic = (): void => {
    if (this.backgroundMusic && !this.isPlaying) {
      this.play();
    }
  }
  
  public play(): Promise<void> {
    if (!this.backgroundMusic) {
      this.initBackgroundMusic();
    }
    
    if (this.backgroundMusic && !this.isPlaying) {
      // Add a user interaction context to attempt to play
      // Modern browsers require user interaction for autoplay
      return this.backgroundMusic.play()
        .then(() => {
          this.isPlaying = true;
          console.log("Background music playing");
        })
        .catch(error => {
          // On browsers with strict autoplay policy, this will fail initially
          // We mark it as playing to maintain UI consistency 
          // and the music will start on the first user interaction
          console.log("Background music failed to play:", error);
          // Don't throw error, just return resolved promise
          // The music will play after first user interaction
          return Promise.resolve();
        });
    }
    
    return Promise.resolve();
  }
  
  public pause(): void {
    if (this.backgroundMusic && this.isPlaying) {
      this.backgroundMusic.pause();
      this.isPlaying = false;
    }
  }
  
  public toggle(): Promise<void> {
    if (this.isPlaying) {
      this.pause();
      return Promise.resolve();
    } else {
      return this.backgroundMusic?.play()
        .then(() => {
          this.isPlaying = true;
          console.log("Background music playing after toggle");
        })
        .catch(error => {
          // Handle autoplay restrictions gracefully
          console.log("Unable to toggle music:", error);
          // Don't throw further
          return Promise.resolve();
        }) || Promise.resolve();
    }
  }
  
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioService = AudioService.getInstance();
export default audioService;