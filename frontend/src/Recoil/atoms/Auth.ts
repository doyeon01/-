import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// recoil-persist 설정
const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // 로컬 스토리지에 저장될 키 이름
  storage: localStorage,  // localStorage를 사용하여 상태를 저장
});

// 유저 ID 상태 관리
export const UserId = atom<number>({
  key: 'UserIdState',  
  default: 0,  // 기본값 설정
  effects_UNSTABLE: [persistAtom], 
});
