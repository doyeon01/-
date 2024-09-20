import React, { useState } from 'react';

interface ModalChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Friend {
  name: string;
  img: string;
  lastMessage: string;
}
const friends = [
  { name: '여행러버', img: 'https://i.pravatar.cc/150?img=1', lastMessage: '안녕하세요 !! 반갑습니다 ㅎㅎ' },
  { name: '김목자', img: 'https://i.pravatar.cc/150?img=2', lastMessage: '반가워요!' },
  { name: '올레', img: 'https://i.pravatar.cc/150?img=3', lastMessage: '다음에 또 봐요' },
  { name: '논네임', img: 'https://i.pravatar.cc/150?img=4', lastMessage: '좋은 하루 되세요' },
  { name: '이팔청춘', img: 'https://i.pravatar.cc/150?img=5', lastMessage: '여행 잘 하세요!' },
  { name: '닉네임1', img: 'https://i.pravatar.cc/150?img=6', lastMessage: '다음에 또 연락해요!' },
];

const mydata ={ name: '고도연짱짱짱123', img: 'https://i.pravatar.cc/150?img=7',}

const ModalChat: React.FC<ModalChatProps> = ({ isOpen, onClose }) => {
  const [currentChat, setCurrentChat] = useState<Friend | null>(null);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F4F4EE] w-full max-w-6xl h-[90vh] rounded-lg shadow-lg overflow-hidden relative">
        {/* 닫기버ㅌ,ㄴ */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <div className="flex h-full">
          {/* 친구창 */}
          <div className="w-1/5 bg-[#E5E2D9] p-4">
            {/*  검색 */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="검색"
                className="w-full p-2 rounded-md bg-white border border-gray-300"
              />
            </div>

            {/* 친구목록 */}
            <div className="w-full">
              <ul>
                {friends.map((friend, index) => (
                  <li
                    key={index}
                    onClick={() => setCurrentChat(friend)}  
                    className="flex items-center mb-4 cursor-pointer"
                  >
                    <img
                      src={friend.img}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full mr-2"
                    />
                    <p className="font-bold">{friend.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 채팅목록 */}
          <div className="w-1/4 bg-[#F4F4EE] p-4 border-l ">
            {/*내프로필 */}
            <div className="flex items-center mb-6">
              <img
                src={mydata.img}
                alt="MyProfile"
                className="w-12 h-12 rounded-full mr-2"
              />
              <div>
                <p className="font-bold">{mydata.name}</p>
              </div>
            </div>

            {/* 친구목록 */}
            <ul>
              {friends.map((friend, index) => (
                <li
                  key={index}
                  onClick={() => setCurrentChat(friend)}  
                  className="flex items-center mb-4 cursor-pointer "
                >
                  <img
                    src={friend.img}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="font-bold">{friend.name}</p>
                    <p className="text-sm text-gray-600 ">{friend.lastMessage}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 채팅 대화방 */}
          <div className="flex-1 p-4">
            {currentChat ? (
              <>
                <div className="flex items-center mb-4">
                  <img
                    src={currentChat.img}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="font-bold">{currentChat.name}</p>
                  </div>
                </div>

                {/* 메시지 */}
                <div className="flex flex-col space-y-4 mb-4">
                  <div className="flex items-start">
                    <img
                      src={currentChat.img}
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div className="bg-[#E5E2D9] p-2 rounded-lg">
                      <p>{currentChat.lastMessage}</p>
                      <p className="text-xs text-gray-500 text-right">PM 10:33</p>
                    </div>
                  </div>

                  {/* 내가보낸메시지 */}
                  <div className="flex justify-end">
                    <div className="bg-white p-2 rounded-lg border border-gray-300">
                      <p>안녕하세요!!!!!</p>
                      <p className="text-xs text-gray-500 text-right">PM 10:31</p>
                    </div>
                  </div>
                </div>

                {/* 대화입력창 */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="메시지를 입력해주세요."
                    className="w-10/12 p-2 rounded-md border border-gray-300"
                  />
                  <button className="bg-[#707C60] text-white px-4 py-2 rounded-md">
                    전송
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">대화를 시작할 사람을 선택해주세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalChat;
