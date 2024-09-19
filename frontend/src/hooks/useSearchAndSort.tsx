import { useState, useCallback } from 'react';

export function useSearchAndSort<T>(
  data: T[],
  searchFields: (keyof T)[],  // 검색에 사용할 필드 배열
  dateField: keyof T          // 정렬에 사용할 필드 (날짜 필드)
) {
  const [filteredArr, setFilteredArr] = useState<T[]>(data);
  const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순');

  // 전체 항목을 표시하는 함수
  const showAllItems = useCallback(() => {
    setFilteredArr(data);  // 초기 데이터를 설정
  }, [data]);

  // 검색 기능
  const onSearch = useCallback((searchTerm: string) => {
    const filtered = data.filter(item =>
      searchFields.some(field =>
        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredArr(filtered);
  }, [data, searchFields]);

  // 정렬 기능 (최신순, 오래된순)
  const onSortChange = useCallback((sortOrder: '최신순' | '오래된순') => {
    setSortOrder(sortOrder);
    const sortedArr = [...filteredArr].sort((a, b) => {
      const dateA = new Date(a[dateField] as unknown as string).getTime();
      const dateB = new Date(b[dateField] as unknown as string).getTime();
      return sortOrder === '최신순' ? dateB - dateA : dateA - dateB;
    });
    setFilteredArr(sortedArr);
  }, [filteredArr, dateField]);

  return { filteredArr, onSearch, onSortChange, showAllItems };
}
