import { useState, useCallback } from 'react';

export function useSearchAndSort<T>(
  data: T[],
  searchFields: (keyof T)[],  // 검색에 사용할 필드 배열
  dateField: keyof T          // 정렬에 사용할 필드 (날짜 필드)
) {
  const [filteredArr, setFilteredArr] = useState<T[]>(data);
  const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순');
  
  // 정렬 적용 함수 (원본 배열을 복사한 후 정렬)
  const applySorting = useCallback((arr: T[], sortOrder: '최신순' | '오래된순') => {
    const sortedArr = [...arr];  // 배열을 복사한 후 정렬
    return sortedArr.sort((a, b) => {
      const dateA = new Date(a[dateField] as unknown as string).getTime();
      const dateB = new Date(b[dateField] as unknown as string).getTime();
      return sortOrder === '최신순' ? dateB - dateA : dateA - dateB;
    });
  }, [dateField]);

  // 전체 항목을 표시하는 함수
  const showAllItems = useCallback(() => {
    const sortedArr = applySorting(data, sortOrder);  // 정렬 후 설정
    setFilteredArr(sortedArr);
  }, [data, sortOrder, applySorting]);

  // 검색 기능
  const onSearch = useCallback((searchTerm: string) => {
    const filtered = data.filter(item =>
      searchFields.some(field =>
        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    const sortedFiltered = applySorting(filtered, sortOrder); // 검색 후 정렬 적용
    setFilteredArr(sortedFiltered);
  }, [data, searchFields, sortOrder, applySorting]);

  // 정렬 기능 (최신순, 오래된순)
  const onSortChange = useCallback((newSortOrder: '최신순' | '오래된순') => {
    setSortOrder(newSortOrder);

    // 원본 데이터를 기준으로 다시 정렬 적용
    const sortedArr = applySorting(filteredArr.length ? filteredArr : data, newSortOrder);
    setFilteredArr(sortedArr);
  }, [filteredArr, data, applySorting]);

  return { filteredArr, onSearch, onSortChange, showAllItems };
}
