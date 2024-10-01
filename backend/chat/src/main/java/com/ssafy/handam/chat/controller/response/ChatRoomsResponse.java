package com.ssafy.handam.chat.controller.response;

import com.ssafy.handam.chat.dto.UserDto;
import java.util.List;

public record ChatRoomsResponse(
    Long chatRoomId,
    String lastUserName,
    String lastMessage,
    String lastMessageTime,
    List<UserDto> users
) {

    public static ChatRoomsResponse of(Long chatRoomId, String lastUserName, String lastMessage, String lastMessageTime, List<UserDto> users) {
        return new ChatRoomsResponse(chatRoomId, lastUserName , lastMessage, lastMessageTime, users);
    }
}
