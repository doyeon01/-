package com.ssafy.handam.chat.docs;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.chat.controller.response.ChatResponse;
import com.ssafy.handam.chat.controller.response.ChatRoomsResponse;
import com.ssafy.handam.chat.domain.ChatRoom;
import com.ssafy.handam.chat.dto.Gender;
import com.ssafy.handam.chat.dto.UserDto;
import jakarta.servlet.http.Cookie;
import java.time.LocalDateTime;
import java.time.MonthDay;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;

public class ChatRoomControllerDocsTest extends RestDocsSupport {

    @DisplayName("채팅 방 목록 조회 API")
    @Test
    void getChatRoomsDocsTest() throws Exception {

        Long userId = 1L;
        String token = "your_jwt_token_here";

        List<UserDto> users = List.of(
                new UserDto(1L, "User1", MonthDay.of(1, 1), Gender.MALE, "profile1.png"),
                new UserDto(2L, "User2", MonthDay.of(2, 2), Gender.FEMALE, "profile2.png")
        );

        ChatRoomsResponse chatRoom1 = ChatRoomsResponse.of(
                1L, "User1", "안녕하세요!", LocalDateTime.now(), users
        );

        ChatRoomsResponse chatRoom2 = ChatRoomsResponse.of(
                2L, "User2", "안녕!", LocalDateTime.now(), users
        );

        List<ChatRoomsResponse> chatRoomsResponses = List.of(chatRoom1, chatRoom2);

        when(chatService.getChatRoomsByUserId(userId, token)).thenReturn(chatRoomsResponses);

        mockMvc.perform(get("/api/v1/chatroom/user")
                        .param("userId", userId.toString())
                        .cookie(new Cookie("accessToken", token))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("chatroom-getChatRooms",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestCookies(
                                cookieWithName("accessToken").description("인증을 위한 액세스 토큰")
                        ),
                        queryParameters(
                                parameterWithName("userId").description("채팅 방을 요청하는 사용자의 ID")
                        ),
                        responseFields(
                                fieldWithPath("success").description("요청의 성공 여부를 나타냅니다"),
                                fieldWithPath("response[].chatRoomId").description("채팅 방의 고유 ID"),
                                fieldWithPath("response[].lastUserName").description("마지막 메시지를 보낸 사용자의 이름"),
                                fieldWithPath("response[].lastMessage").description("마지막 메시지의 내용"),
                                fieldWithPath("response[].lastMessageTime").description("마지막 메시지의 타임스탬프"),
                                fieldWithPath("response[].users[]").description("채팅 방의 사용자 목록"),
                                fieldWithPath("response[].users[].id").description("사용자의 고유 ID"),
                                fieldWithPath("response[].users[].nickname").description("사용자의 닉네임"),
                                fieldWithPath("response[].users[].birthday").description("MM-DD 형식의 사용자의 생일"),
                                fieldWithPath("response[].users[].gender").description("사용자의 성별"),
                                fieldWithPath("response[].users[].profileImage").description("사용자의 프로필 이미지 URL"),
                                fieldWithPath("error").optional().description("요청 실패 시 오류 정보")
                        )
                ));
    }

    @DisplayName("채팅 메시지 목록 조회 API")
    @Test
    void getChatMessagesDocsTest() throws Exception {
        // Given
        Long roomId = 1L;
        String token = "your_jwt_token_here";
        Pageable pageable = PageRequest.of(0, 10, Sort.by("createdDate").descending());

        given(chatService.getChatByRoomId(roomId, pageable)).willReturn(List.of(
                ChatResponse.of(1L, 1L, "안녕하세요",  LocalDateTime.now()),
                ChatResponse.of(2L, 2L, "안녕하세요",  LocalDateTime.now())
        ));

        // When & Then
        mockMvc.perform(get("/api/v1/chatroom/{roomId}", roomId)
                        .cookie(new Cookie("accessToken", token))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("chatroom-getChatMessages",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestCookies(
                                cookieWithName("accessToken").description("인증을 위한 액세스 토큰")
                        ),
                        pathParameters(
                                parameterWithName("roomId").description("조회할 채팅 방의 ID")
                        ),
                        responseFields(
                                fieldWithPath("success").
                                        description("요청의 성공 여부를 나타냅니다"),
                                fieldWithPath("response[].chatRoomId").type(Long.class)
                                                .description("채팅 방 ID"),
                                fieldWithPath("response[].senderId").type(Long.class)
                                                .description("메시지를 보낸 사용자 ID"),
                                fieldWithPath("response[].content").type(String.class)
                                                .description("메시지 내용"),
                                fieldWithPath("response[].timeStamp").type(String.class)
                                                .description("메시지 보낸 시간"),
                                fieldWithPath("error").optional().description("요청 실패 시 오류 정보")
                        )
                ));
    }


    @DisplayName("채팅 방 생성 API")
    @Test
    void createChatRoomDocsTest() throws Exception {
        // Given
        Long userId = 1L;
        Long partnerId = 2L;
        String token = "your_jwt_token_here";

        ChatRoom chatRoom = new ChatRoom(List.of(userId, partnerId));

        // 리플렉션을 사용하여 chatRoomId 설정
        java.lang.reflect.Field field = ChatRoom.class.getDeclaredField("chatRoomId");
        field.setAccessible(true);
        field.set(chatRoom, 1L);

        // 서비스 메서드 목킹
        when(chatService.createChatRoom(userId, partnerId)).thenReturn(chatRoom);

        // When & Then
        mockMvc.perform(post("/api/v1/chatroom")
                        .param("partnerId", partnerId.toString())
                        .param("userId", userId.toString())
                        .cookie(new Cookie("accessToken", token))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("chatroom-createChatRoom",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestCookies(
                                cookieWithName("accessToken").description("인증을 위한 액세스 토큰")
                        ),
                        responseFields(
                                fieldWithPath("success").description("요청의 성공 여부를 나타냅니다"),
                                fieldWithPath("response.chatRoomId").description("생성된 채팅 방의 고유 ID"),
                                fieldWithPath("response.userIds[]").description("채팅 방에 참여한 사용자 ID 목록"),
                                fieldWithPath("error").optional().description("요청 실패 시 오류 정보")
                        )
                ));
    }
}
