import { atom } from 'recoil';

// 검색어 상태 관리
export const PlanInputState = atom({
  key: 'PlanInputState', 
  default: '', 
});

// 정렬 상태 관리
export const PlanSortState = atom({
  key: 'PlanSortState', 
  default: '최신순' as '최신순' | '오래된순', 
});
