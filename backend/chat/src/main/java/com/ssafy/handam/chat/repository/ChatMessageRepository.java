package com.ssafy.handam.chat.repository;

import com.ssafy.handam.chat.domain.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    Page<ChatMessage> findByChatRoom_ChatRoomId(Long roomId, Pageable pageable);

    ChatMessage findFirstByChatRoom_ChatRoomIdOrderByCreatedDateDesc(Long chatRoomId);
}
