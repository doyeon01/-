import { useState, useCallback } from 'react';

export function useSearchAndSort<T>(
  data: T[],                   // 원본 데이터
  searchFields: (keyof T)[],    // 검색에 사용할 필드 배열
  dateField: keyof T            // 정렬에 사용할 필드 (날짜 필드)
) {
  // 상태 정의
  const [filteredArr, setFilteredArr] = useState<T[]>(data);
  const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순');

  // 배열을 복사하여 정렬하는 함수
  const sortArray = useCallback((arr: T[], order: '최신순' | '오래된순') => {
    return [...arr].sort((a, b) => {
      const dateA = new Date(a[dateField] as unknown as string).getTime();
      const dateB = new Date(b[dateField] as unknown as string).getTime();
      return order === '최신순' ? dateB - dateA : dateA - dateB;
    });
  }, [dateField]);

  // 검색어를 기반으로 필터링하는 함수
  const filterArray = useCallback((searchTerm: string) => {
    return data.filter(item =>
      searchFields.some(field =>
        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchFields]);

  // 전체 항목을 보여주고 정렬하는 함수
  const showAllItems = useCallback(() => {
    const sortedArr = sortArray(data, sortOrder);
    setFilteredArr(sortedArr);
  }, [data, sortOrder, sortArray]);

  // 검색 기능 (검색 후 정렬도 적용)
  const onSearch = useCallback((searchTerm: string) => {
    const filtered = filterArray(searchTerm);
    const sortedFiltered = sortArray(filtered, sortOrder);
    setFilteredArr(sortedFiltered);
  }, [filterArray, sortArray, sortOrder]);

  // 정렬 기능 (최신순, 오래된순)
  const onSortChange = useCallback((newSortOrder: '최신순' | '오래된순') => {
    setSortOrder(newSortOrder);

    // 현재 필터링된 데이터가 있으면 해당 데이터에 정렬 적용, 없으면 원본 데이터에 정렬 적용
    const sortedArr = sortArray(filteredArr.length ? filteredArr : data, newSortOrder);
    setFilteredArr(sortedArr);
  }, [filteredArr, data, sortArray]);

  return { filteredArr, onSearch, onSortChange, showAllItems };
}
