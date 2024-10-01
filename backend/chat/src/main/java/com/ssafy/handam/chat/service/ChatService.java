package com.ssafy.handam.chat.service;

import com.ssafy.handam.chat.client.UserServiceClient;
import com.ssafy.handam.chat.controller.response.ChatResponse;
import com.ssafy.handam.chat.controller.response.ChatRoomsResponse;
import com.ssafy.handam.chat.domain.ChatMessage;
import com.ssafy.handam.chat.domain.ChatRoom;
import com.ssafy.handam.chat.dto.ChatMessageDto;
import com.ssafy.handam.chat.repository.ChatMessageRepository;
import com.ssafy.handam.chat.repository.ChatRoomRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserServiceClient userServiceClient;

    public List<ChatRoomsResponse> getChatRoomsByUserId(Long userId, String token) {
        List<ChatRoom> chatRooms = chatRoomRepository.findByUserIdsContaining(userId);
        return chatRooms.stream().map(chatRoom -> {
            List<Long> userIds = chatRoom.getUserIds();
            userIds.remove(userId);
            Long partnerId = userIds.get(0);

            ChatMessage latestMessage = chatMessageRepository.findFirstByChatRoom_ChatRoomIdOrderByCreatedDateDesc(
                    chatRoom.getChatRoomId());

            return ChatRoomsResponse.of(
                    chatRoom.getChatRoomId(),
                    userServiceClient.getUserById(latestMessage.getSenderId(), token).getResponse().nickname(),
                    latestMessage.getContent(),
                    latestMessage.getCreatedDate(),
                    List.of(userServiceClient.getUserById(userId, token).getResponse(),
                            userServiceClient.getUserById(partnerId, token).getResponse())
            );
        }).toList();
    }

    public void saveMessage(ChatMessage chatMessage) {
        chatMessageRepository.save(chatMessage);
    }


    public List<ChatResponse> getChatByRoomId(Long roomId, Pageable pageable) {
        List<ChatMessage> content = chatMessageRepository.findByChatRoom_ChatRoomId(roomId, pageable).getContent();
        return content.stream()
                .map(chatMessage -> ChatResponse.of(
                        chatMessage.getChatRoom().getChatRoomId(),
                        chatMessage.getSenderId(),
                        chatMessage.getContent(),
                        chatMessage.getTimestamp()))
                .toList();
    }


    public ChatRoom getChatRoomsByRoomId(Long roomId) {
        return chatRoomRepository.findById(roomId).orElse(null);
    }

    public ChatRoom createChatRoom(Long userId, Long partnerId) {
        ChatRoom chatRoom = new ChatRoom(List.of(userId, partnerId));
        return chatRoomRepository.save(chatRoom);
    }

    public ChatMessageDto convertToDto(ChatMessage chatMessage) {
        return new ChatMessageDto(
                chatMessage.getMessageId(),
                chatMessage.getChatRoom().getChatRoomId(),
                chatMessage.getSenderId(),
                chatMessage.getContent(),
                chatMessage.getCreatedDate()
        );
    }
}
