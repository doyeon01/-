package com.ssafy.handam.chat.controller;

import com.ssafy.handam.chat.domain.ChatMessage;
import com.ssafy.handam.chat.domain.ChatRoom;
import com.ssafy.handam.chat.dto.ChatMessageDto;
import com.ssafy.handam.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/api/v1/chat/{roomId}")
    @SendTo("/topic/chatroom/{roomId}")
    public ChatMessageDto sendMessage(@DestinationVariable String roomId, ChatMessage chatMessage) {
        ChatRoom chatRoom = chatService.getChatRoomsByRoomId(Long.parseLong(roomId));
        chatMessage.sendTo(chatRoom);
        chatService.saveMessage(chatMessage);
        return chatService.convertToDto(chatMessage);
    }
}
