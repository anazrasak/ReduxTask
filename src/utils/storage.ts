import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@users';
const CURRENT_USER_KEY = '@current_user';

export const storeUser = async (user: { username: string; password: string; isAdmin?: boolean }) => {
  try {
    const existingUsers = await getUsers();
    
    // Check if user already exists
    if (existingUsers.some(u => u.username === user.username)) {
      return false;
    }
    
    const newUsers = [...existingUsers, user];
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUsers));
    return true;
  } catch (e) {
    console.error('Error storing user', e);
    return false;
  }
};

export const getUsers = async (): Promise<{ username: string; password: string; isAdmin?: boolean }[]> => {
  try {
    const users = await AsyncStorage.getItem(USER_KEY);
    return users ? JSON.parse(users) : [];
  } catch (e) {
    console.error('Error getting users', e);
    return [];
  }
};

export const setCurrentUser = async (user: { username: string } | null) => {
  try {
    if (user) {
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Error setting current user', e);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Error getting current user', e);
    return null;
  }
};

export const initializeAdmin = async () => {
  const users = await getUsers();
  const adminExists = users.some(u => u.username === 'admin');
  
  if (!adminExists) {
    await storeUser({ username: 'admin', password: 'admin', isAdmin: true });
  }
};