import { useState, useEffect } from 'react';

export const useSearchAndSort = <T,>(
  initialData: T[],
  searchFields: (keyof T)[], // 검색에 사용할 필드 리스트
  sortField: keyof T,        // 정렬에 사용할 필드
  dateField: keyof T         // 날짜 기반으로 정렬할 필드
) => {
  const [filteredArr, setFilteredArr] = useState<T[]>([]);
  const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순');

  useEffect(() => {
    // 초기 데이터 정렬 (기본값: 최신순)
    const sortedArr = [...initialData].sort((a, b) => {
      const dateA = new Date(b[dateField] as any); // dateField에 해당하는 필드값을 Date로 변환
      const dateB = new Date(a[dateField] as any);
      return dateB.getTime() - dateA.getTime();
    });
    setFilteredArr(sortedArr);
  }, [initialData, dateField]);

  // 검색 및 정렬 함수
  const onSearch = (searchTerm: string) => {
    const filtered = initialData.filter((item) =>
      searchFields.some((field) => {
        const value = item[field] as unknown as string; // 검색 필드 값을 string으로 변환
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );

    const sortedArr = [...filtered].sort((a, b) => {
      const dateA = new Date(b[dateField] as any);
      const dateB = new Date(a[dateField] as any);
      return sortOrder === '최신순' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
    setFilteredArr(sortedArr);
  };

  const onSortChange = (newSortOrder: '최신순' | '오래된순') => {
    setSortOrder(newSortOrder);
    const sortedArr = [...filteredArr].sort((a, b) => {
      const dateA = new Date(b[dateField] as any);
      const dateB = new Date(a[dateField] as any);
      return newSortOrder === '최신순' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
    setFilteredArr(sortedArr);
  };

  const showAllItems = () => {
    // 정렬 기준에 따라 전체 리스트를 다시 설정
    const sortedArr = [...initialData].sort((a, b) => {
      const dateA = new Date(b[dateField] as any);
      const dateB = new Date(a[dateField] as any);
      return sortOrder === '최신순' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
    setFilteredArr(sortedArr);
  };

  return { filteredArr, onSearch, onSortChange, showAllItems };
};
