package com.ssafy.handam.chat.controller;

import static com.ssafy.handam.chat.controller.ApiUtils.success;

import com.ssafy.handam.chat.controller.ApiUtils.ApiResult;
import com.ssafy.handam.chat.controller.response.ChatRoomsResponse;
import com.ssafy.handam.chat.domain.ChatMessage;
import com.ssafy.handam.chat.domain.ChatRoom;
import com.ssafy.handam.chat.dto.ChatMessageDto;
import com.ssafy.handam.chat.service.ChatService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chatroom")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatService chatService;

    @GetMapping("/user")
    public ApiResult<List<ChatRoomsResponse>> getChatRooms(
            @RequestParam("userId") Long userId,
            @RequestHeader("Authorization") String token) {
        return success(chatService.getChatRoomsByUserId(userId, token));
    }

    @GetMapping("/{roomId}")
    public ApiResult<Page<ChatMessageDto>> getChatMessages(
            @PathVariable("roomId") Long roomId,
            @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ChatMessage> messages = chatService.getChatByRoomId(roomId, pageable);
        Page<ChatMessageDto> dtoPage = messages.map(chatService::convertToDto);
        return success(dtoPage);
    }


    @PostMapping
    public ApiResult<ChatRoom> createChatRoom(
            @RequestParam("userId") Long userId,
            @RequestParam("partnerId") Long partnerId) {
        return success(chatService.createChatRoom(userId, partnerId));
    }
}
