import { atom } from 'recoil';

export const chatState = atom<boolean>({
  key: 'chatState', 
  default: false,    
});
