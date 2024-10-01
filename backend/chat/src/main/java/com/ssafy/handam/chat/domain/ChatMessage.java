package com.ssafy.handam.chat.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class ChatMessage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    private Long senderId;

    private String content;

    private LocalDateTime timestamp;

    public ChatMessage(ChatRoom chatRoom, Long senderId, String content) {
        this.chatRoom = chatRoom;
        this.senderId = senderId;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }

    public ChatMessage(Long messageId, ChatRoom chatRoom, Long senderId, String content, LocalDateTime timestamp) {
        super();
    }

    public void sendTo(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
    }
}
