import { useEffect, useState } from 'react';
import { UserIcon } from '../../assets/icons/svg';
import { ButtonPersonalInfo } from '../atoms/button/ButtonPersonalInfo.tsx';
import { FeedCard } from '../molecules/Card/FeedCard.tsx';
import { useParams } from 'react-router-dom';
import { UserInfoType } from '../../model/MyPageType';
import { getYourInfo } from '../../services/api/UserService.ts';
import { FeedList } from '../../services/api/FeedService.ts';
import { useInView } from 'react-intersection-observer';
import { FeedType, FeedResponseType } from '../../model/MyPageType.ts';
import  ModalFeedDetail  from '../../components/organisms/Modal/ModalFeedDetail';

export const YourPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null); // 초기값을 null로 변경
  const [nickName, setNickName] = useState<string | null>(''); // string | null 허용
  const [introduce, setIntroduce] = useState<string | null>(''); // string | null 허용
  const [accompanyTemperature, setAccompanyTemperature] = useState<number>(0); // 초기값 설정
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [feedInfos, setFeedInfos] = useState<FeedType[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [ref, inView] = useInView();

  // 모달을 위한 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState<number | null>(null);

  const { targetId } = useParams<{ targetId: string }>();
  const numericTargetId = Number(targetId); // targetId를 숫자로 변환

  const openModal = (feedId: number) => {
    setSelectedFeedId(feedId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getYourInfo(numericTargetId); // 비동기 함수 호출
        if (data.success) {
          const info: UserInfoType = data.response;
          setImage(info.profileImage);
          setNickName(info.name);
          setIntroduce(info.introduction);
          setAccompanyTemperature(info.accompanyTemperature);
          setFollowingCount(info.followingCount);
          setFollowerCount(info.followerCount);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [targetId]);

  useEffect(() => {
    if (hasNextPage) {
      loadMoreFeeds();
    }
  }, [page, hasNextPage]);

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasNextPage]);

  const loadMoreFeeds = () => {
    FeedList(numericTargetId, page)
      .then((res) => {
        const data: FeedResponseType = res.data;
        if (data.success) {
          if (data.response.feeds.length > 0) {
            setFeedInfos((prevFeeds) => [...prevFeeds, ...data.response.feeds]);
            setHasNextPage(data.response.hasNextPage);
          } else {
            setHasNextPage(false);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg mt-40 mb-20">
      <div className="flex justify-center pb-8">
        <div className="flex justify-center pt-14 gap-8">
          {image ? (
            <img
              src={image}
              alt="프로필 사진"
              className="w-[150px] h-[150px] rounded-full object-cover"
            />
          ) : (
            <UserIcon />
          )}
          <div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{nickName}</div>
              <div className="flex justify-center">
                <ButtonPersonalInfo label="팔로우" className="mr-2" />
              </div>
            </div>
            <div className="text-base text-gray-500 pt-4 font-semibold">
              {introduce}
            </div>
            <div className="mt-4">
              <span className="text-base font-light mr-1">동행온도 </span>
              <span className="font-bold mr-6">{accompanyTemperature}</span>
              <span className="text-base font-light mr-1">팔로워 </span>
              <span className="font-bold mr-6">{followerCount}</span>
              <span className="text-base font-light mr-1">팔로잉 </span>
              <span className="font-bold mr-6">{followingCount}</span>
            </div>
          </div>
        </div>
      </div>

      {feedInfos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedInfos.map((feed) => (
            <FeedCard
              key={feed.id}
              title={feed.title}
              content={feed.content}
              createdDate={feed.createdDate}
              comment={feed.commentCount}
              like={feed.likeCount}
              image={feed.imageUrl}
              onClick={() => openModal(feed.id)} // 클릭 시 해당 피드의 ID를 모달에 넘기기
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <hr className="w-full max-w-4xl border-t border-gray-300" />
          <p className="text-center my-10 ">게시물이 없습니다.</p>
        </div>
      )}
      <div ref={ref} />

      {isModalOpen && selectedFeedId && (
        <ModalFeedDetail
          selectedId={selectedFeedId} // 선택된 피드 ID를 모달로 전달
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

