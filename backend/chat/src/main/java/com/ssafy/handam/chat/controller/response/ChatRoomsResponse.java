package com.ssafy.handam.chat.controller.response;

import com.ssafy.handam.chat.client.UserDto;
import java.time.LocalDateTime;
import java.util.List;

public record ChatRoomsResponse(
        Long chatRoomId,
        String lastUserName,
        String lastMessage,
        LocalDateTime lastMessageTime,
        List<UserDto> users
) {

    public static ChatRoomsResponse of(
            Long chatRoomId,
            String lastUserName,
            String lastMessage,
            LocalDateTime lastMessageTime,
            List<UserDto> users) {
        return new ChatRoomsResponse(
                chatRoomId,
                lastUserName,
                lastMessage,
                lastMessageTime, users);
    }
}
