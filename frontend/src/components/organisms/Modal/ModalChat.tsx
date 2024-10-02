import React, { useState, useEffect } from 'react';
import { ModalChatProps, ChatRoom, user,Message } from '../../../model/ChatType';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs'; // Client를 사용
import axios from 'axios';



const ModalChat: React.FC<ModalChatProps> = ({ onClose }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [partnerUser, setPartnerUser] = useState<user | null>(null);
  const [userId] = useState(1); 

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:8080/api/v1/chat/user?userId=${userId}`)
        .then((response) => {          
          setChatRooms(response.data.response);
        })
        .catch((error) => {
          console.error('Error fetching chat rooms:', error);
        });
    };
    fetchData();
  }, [userId]);

  const connectWebSocket = (roomId: number) => {
    console.log(`Attempting to connect to WebSocket for room ${roomId}`);
    const socket = new SockJS('http://localhost:8080/chat-websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log(`Connected to chat room ${roomId}`);
        setStompClient(client); 
        client.subscribe(`/topic/chatroom/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
      },
      onDisconnect: () => {
        console.log(`Disconnected from chat room ${roomId}`);
        setTimeout(() => {
          connectWebSocket(roomId);
        }, 5000);
      },
      onWebSocketClose: (event) => {
        console.error('WebSocket connection closed:', event);
        if (!event.wasClean) {
          setTimeout(() => {
            connectWebSocket(roomId);
          }, 5000);
        }
      },
    });
    client.activate();
  };
  
  
  

  const selectChatRoom = (roomId: number, user: user) => {
    setPartnerUser(user);
    setSelectedRoomId(roomId);
    setMessages([]);
      axios
      .get(`http://localhost:8080/api/v1/chat/${roomId}`)
      .then((response) => {
        setMessages(response.data.response);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  
    if (stompClient) {
      stompClient.deactivate(); 
      stompClient.onDisconnect = () => {
        connectWebSocket(roomId);
      };
    } else {
      connectWebSocket(roomId);
      console.log("connectWebSocket");
    }
  };
  

  const sendMessage = () => {
    console.log(1);
    console.log('stompClient:', stompClient);
    console.log('newMessage:', newMessage);
    if (stompClient && newMessage.trim() !== '') {
      console.log(2);
      
      const chatMessage = {
        senderId: userId,
        content: newMessage,
      };
      console.log(newMessage);
      
      stompClient.publish({
        destination: `/app/api/v1/chat/${selectedRoomId}`,
        body: JSON.stringify(chatMessage),
      });
      setNewMessage('');
    }
  };

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F4F4EE] w-full max-w-6xl h-[90vh] rounded-lg shadow-lg overflow-hidden relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-50">
          &times;
        </button>

        <div className="flex h-full">
          <div className="w-1/5 bg-[#E5E2D9] p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="검색"
                className="w-full p-2 rounded-md bg-white border border-gray-300"
              />
            </div>
            <div className="w-full">
              <ul>
                {/* {friends.map((friend, index) => (
                  <li
                    key={index}
                    onClick={() => setCurrentChat(friend)}
                    className="flex items-center mb-4 cursor-pointer"
                  >
                    <img src={friend.img} alt={friend.name} className="w-12 h-12 rounded-full mr-2" />
                    <p className="font-bold">{friend.name}</p>
                  </li>
                ))} */}
              </ul>
            </div>
          </div>

          <div className="w-1/4 bg-[#F4F4EE] p-4 border-l">
            <ul>
              {chatRooms.map((chat, index) => (
                <li
                  key={index}
                  onClick={() => selectChatRoom(chat.chatRoomId,chat.users[1])}
                  className="flex items-center mb-4 cursor-pointer"
                >
                  <img src={chat.users[1].profileImage} alt={chat.users[1].nickname} className="w-10 h-10 rounded-full mr-2" />
                  <div>
                    <p className="font-bold">{chat.lastUserName}</p>
                    <p className="text-sm text-gray-600">{chat.lastMessage}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 p-4 relative z-40">
            {messages&&partnerUser ? (
              <>
                <div className="flex items-center mb-4">
                  <img src={partnerUser.profileImage} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                  <div>
                    <p className="font-bold">{partnerUser.nickname}</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-4 mb-4">
                  {messages.map((message, index) => (
                    <div key={index}>
                      {userId === message.senderId ? (
                        // 내가 보낸 메시지
                        <div className="flex justify-end">
                          <div className="bg-white p-2 rounded-lg border border-gray-300">
                            <p>{message.content}</p>
                            <p className="text-xs text-gray-500 text-right">{message.timeStamp}</p>
                          </div>
                        </div>
                      ) : (
                        // 상대가 보낸 메시지
                        <div className="flex items-start">
                          <img src={partnerUser.profileImage} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                          <div className="bg-[#E5E2D9] p-2 rounded-lg">
                            <p>{message.content}</p>
                            <p className="text-xs text-gray-500 text-right">{message.timeStamp}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>


                {/* 대화입력창 */}
                <div className="absolute bottom-0 left-0 w-full bg-[#F4F4EE] p-4 border-t flex items-center space-x-2 z-50">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력해주세요."
                    className="flex-1 p-2 rounded-md border border-gray-300"
                  />
                  <button onClick={sendMessage} className="bg-[#707C60] text-white px-4 py-2 rounded-md">
                    전송
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">채팅할 친구를 선택하세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ModalChat;
