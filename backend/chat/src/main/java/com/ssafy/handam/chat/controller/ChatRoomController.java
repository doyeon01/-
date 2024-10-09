package com.ssafy.handam.chat.controller;

import static com.ssafy.handam.chat.controller.ApiUtils.success;

import com.ssafy.handam.chat.controller.ApiUtils.ApiResult;
import com.ssafy.handam.chat.controller.response.ChatResponse;
import com.ssafy.handam.chat.controller.response.ChatRoomResponse;
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
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatService chatService;

    @GetMapping("/user")
    public ApiResult<List<ChatRoomsResponse>> getChatRooms(
            @RequestParam("userId") Long userId,
            @CookieValue(value = "accessToken", required = false) String token) {

        return success(chatService.getChatRoomsByUserId(userId, token));
    }

    @GetMapping("/{roomId}")
    public ApiResult<List<ChatResponse>> getChatMessages(
            @CookieValue(value = "accessToken", required = false) String token,
            @PathVariable("roomId") Long roomId,
            @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageable) {

        return success(chatService.getChatByRoomId(roomId, pageable));
    }


    @PostMapping
    public ApiResult<ChatRoomResponse> createChatRoom(
            @RequestParam("userId") Long userId,
            @RequestParam("partnerId") Long partnerId) {

        return success(ChatRoomResponse.of(chatService.createChatRoom(userId, partnerId)));
    }
}
