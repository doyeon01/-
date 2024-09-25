import { UserIcon } from '../../assets/icons/svg';
import { ButtonPersonalInfo } from '../atoms/button/ButtonPersonalInfo.tsx';
import { FeedCard } from '../molecules/Card/FeedCard.tsx';
import testImg1 from './../../assets/statics/test1.jpg'
import testImg2 from './../../assets/statics/test2.jpg'
import testImg3 from './../../assets/statics/test3.png'
import testImg4 from './../../assets/statics/test4.jpg'
import testImg5 from './../../assets/statics/test5.jpg'

export const YourPage:React.FC= () => {
  
  // 유저 id를 받아.. feed 내용 가져오기 .

  const feedInfos = [
    {
      title: '서울 전통 테마 여행',
      content: '눈이 즐거운 하루!',
      createdDate: '2024-09-18',
      comment: 6,
      like: 7,
      image: testImg1,
    },
    {
      title: '서울 전통 테마 여행',
      content: '눈이 즐거운 하루!',
      createdDate: '2024-09-18',
      comment: 6,
      like: 7,
      image: testImg2,
    },
    {
      title: '서울 전통 테마 여행',
      content: '눈이 즐거운 하루!',
      createdDate: '2024-09-18',
      comment: 6,
      like: 7,
      image: testImg3,
    },
    {
      title: '서울 전통 테마 여행',
      content: '눈이 즐거운 하루!',
      createdDate: '2024-09월-18',
      comment: 6,
      like: 7,
      image: testImg4,
    },
    {
      title: '서울 전통 테마 여행',
      content: '눈이 즐거운 하루!',
      createdDate: '2024-09-18',
      comment: 6,
      like: 7,
      image: testImg5,
    },
  ];


  return (
    <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg mt-40 mb-20">
      <div className="flex justify-center pb-8">
        <div className="flex justify-center pt-14 gap-8">
          <UserIcon />
          <div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">닉네임</div>
              <div className="flex justify-center">
                <ButtonPersonalInfo label="팔로우" className="mr-2" />
              </div>
            </div>
            <div className="text-base text-gray-500 pt-4 font-semibold">자기소개</div>
            <div className="mt-4">
              <span className="text-base font-light mr-1">동행온도 </span><span className="font-bold mr-6">36.5</span>
              <span className="text-base font-light mr-1">팔로워 </span><span className="font-bold mr-6">200</span>
              <span className="text-base font-light mr-1">팔로잉 </span><span className="font-bold mr-6">200</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {feedInfos.map((feed, index) => (
        <FeedCard
          key={index}
          title={feed.title}
          content={feed.content}
          createdDate={feed.createdDate}
          comment={feed.comment}
          like={feed.like}
          image={feed.image}
        />
      ))}
    </div>
    </div>
  );
};
