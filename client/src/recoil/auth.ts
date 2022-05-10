import { localStorageEffect } from '../utils/localStorageEffects';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const user = atom({
  key: 'user',
  default: {
    accessToken: '',
    email: '',
    name: '',
    nickname: '',
    userId: '',
    profileImage: '',
    statusCode: '',
  },
  effects_UNSTABLE: [localStorageEffect('tooliv_info')],
});

export const authTrigger = atom({
  key: 'authTrigger',
  default: 0,
});

export const isLoginState = selector({
  key: 'isLoginState',
  get: ({ get }) => {
    return !!get(user).accessToken;
  },
});

export const accessToken = selector({
  key: 'accessToken',
  get: ({ get }) => {
    return get(user).accessToken;
  },
});
