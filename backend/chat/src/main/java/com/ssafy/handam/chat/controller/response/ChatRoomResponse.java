package com.ssafy.handam.chat.controller.response;

import com.ssafy.handam.chat.domain.ChatRoom;
import java.util.List;

public record ChatRoomResponse(Long chatRoomId, List<Long> userIds) {

    public static ChatRoomResponse of(ChatRoom chatRoom) {
        return new ChatRoomResponse(chatRoom.getChatRoomId(), chatRoom.getUserIds());
    }
}
