import { UserStore } from './UserStore';

export const StoreNames = {
  UserStore: 'userStore',
};

const userStore = new UserStore();

export const Stores = {
  [StoreNames.UserStore]: userStore,
};
