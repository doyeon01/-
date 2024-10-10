package com.ssafy.handam.chat.repository;

import com.ssafy.handam.chat.domain.ChatRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findByUserIdsContaining(Long userId);
}
