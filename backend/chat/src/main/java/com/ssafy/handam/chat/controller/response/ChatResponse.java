package com.ssafy.handam.chat.controller.response;

import java.time.LocalDateTime;

public record ChatResponse(Long chatRoomId, Long senderId, String content, LocalDateTime timeStamp) {

    public static ChatResponse of(Long chatRoomId, Long senderId, String content, LocalDateTime timeStamp) {
        return new ChatResponse(chatRoomId, senderId, content, timeStamp);
    }
}
