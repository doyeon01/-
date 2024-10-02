import {useState, useEffect} from 'react';
import PersonalSearch from '../../atoms/input/PersonalSearch';
import { useSearchAndSort } from '../../../hooks/useSearchAndSort';
import { FeedCard } from './FeedCard';
import ArticleList from '../../../dummydata/companion/accompnyBoardsUserArticleList.json'
// import { articleList } from '../../../services/api/AccompanyBoardAPI';
import { UserArticle, UserArticleApiResponse } from '../../../model/AccompanyBoardType';
// import { useRecoilValue } from 'recoil';
// import { UserId } from '../../../Recoil/atoms/Auth';


// 1. 우선 json 더미데이터 가져와서 리스트로 만들어놓기
// 2. axios 연결해서 response 값으로 리스트 만들어서 적어놓기


export const PersonalCompanionDetail: React.FC = () => {
  
  const [userArticleList, setUserArticleList] = useState<UserArticle[]>([])
  // const userId = useRecoilValue(UserId);


  useEffect(()=>{
    const typedArticleList = ArticleList as UserArticleApiResponse
    if(typedArticleList.success){
      setUserArticleList(typedArticleList.response.articles)
    }
    // articleList(userId)
    // .then((res)=>{
    //   setUserArticleList(res.response.articles)
    // })
    // .catch((error)=>{
    //   console.log(error)})

  },[])
  

  const { filteredArr, onSearch, onSortChange, showAllItems } = useSearchAndSort<UserArticle>(
    userArticleList,
    ['title', 'description'], // 검색에 사용할 필드 배열(address추가해야함)
    'createdDate' // 정렬에 사용할 날짜 필드
  );


  return (
    <>
      <div className="mb-5">
        <PersonalSearch onSearch={onSearch} showAllItems={showAllItems} onSortChange={onSortChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredArr.length > 0 ? (
          filteredArr.map((plan, index) => (
            <div key={index}>
              <FeedCard
              key={index}
              title={plan.title}
              address={plan.address}
              content={plan.description}
              createdDate={plan.createdDate}
              comment={plan.commentCount}
              image={plan.imageUrl}
             
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">일정이 없습니다.</p>
        )}
      </div>
    </>
  );
};
