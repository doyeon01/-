package com.ssafy.handam.chat.controller.response;

import com.ssafy.handam.chat.dto.ChatUserDto;
import java.time.LocalDateTime;

public record ChatRoomsResponse(
        Long chatRoomId,
        String lastUserName,
        String lastMessage,
        LocalDateTime lastMessageTime,
        ChatUserDto user
) {

    public static ChatRoomsResponse of(
            Long chatRoomId,
            String lastUserName,
            String lastMessage,
            LocalDateTime lastMessageTime,
            ChatUserDto user) {
        return new ChatRoomsResponse(
                chatRoomId,
                lastUserName,
                lastMessage,
                lastMessageTime,
                user);
    }
}
