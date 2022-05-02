import Recoil, { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const user = atom({
  key: 'user',
  default: {
    accessToken: undefined,
    email: '',
    name: '',
    nickname: '',
    userId: '',
  },
  effects_UNSTABLE: [persistAtom],
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
