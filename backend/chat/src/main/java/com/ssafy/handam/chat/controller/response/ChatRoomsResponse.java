package com.ssafy.handam.chat.controller.response;

import java.time.LocalDateTime;

public record ChatRoomsResponse(
        Long chatRoomId,
        String lastUserName,
        String lastMessage,
        LocalDateTime lastMessageTime,
        Long userId
) {

    public static ChatRoomsResponse of(
            Long chatRoomId,
            String lastUserName,
            String lastMessage,
            LocalDateTime lastMessageTime,
            Long userId) {
        return new ChatRoomsResponse(
                chatRoomId,
                lastUserName,
                lastMessage,
                lastMessageTime,
                userId);
    }
}
