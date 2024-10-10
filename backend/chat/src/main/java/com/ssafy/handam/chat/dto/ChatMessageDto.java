package com.ssafy.handam.chat.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatMessageDto {
    private Long messageId;
    private Long chatRoomId;
    private Long senderId;
    private String content;
    private LocalDateTime timestamp;
}
