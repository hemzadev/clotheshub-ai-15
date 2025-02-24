
interface UserProfile {
  username: string;
  email: string;
  bio: string;
  profilePicture?: string;
}

class UserStore {
  private static instance: UserStore;
  private userData: UserProfile | null = null;

  private constructor() {}

  static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }

  setUserData(data: UserProfile) {
    this.userData = data;
    // Also save to localStorage for persistence
    localStorage.setItem('userProfile', JSON.stringify(data));
  }

  getUserData(): UserProfile | null {
    if (!this.userData) {
      // Try to get from localStorage
      const stored = localStorage.getItem('userProfile');
      if (stored) {
        this.userData = JSON.parse(stored);
      }
    }
    return this.userData;
  }

  clearUserData() {
    this.userData = null;
    localStorage.removeItem('userProfile');
  }
}

export const userStore = UserStore.getInstance();
