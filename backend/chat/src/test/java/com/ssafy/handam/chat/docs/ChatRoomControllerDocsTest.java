package com.ssafy.handam.chat.docs;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.chat.controller.response.ChatRoomsResponse;
import com.ssafy.handam.chat.dto.Gender;
import com.ssafy.handam.chat.dto.UserDto;
import java.time.MonthDay;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;


public class ChatRoomControllerDocsTest extends RestDocsSupport {

    @DisplayName("채팅 방 목록 조회 API")
    @Test
    void getChatRoomsDocsTest() throws Exception {
        // Given
        Long userId = 1L;
        String token = "Bearer your_jwt_token_here";

        // Prepare mock data
        List<UserDto> users = List.of(
                new UserDto(1L, "User1", MonthDay.of(1, 1), Gender.MALE, "profile1.png"),
                new UserDto(2L, "User2", MonthDay.of(2, 2), Gender.FEMALE, "profile2.png")
        );

        ChatRoomsResponse chatRoom1 = ChatRoomsResponse.of(
                1L, "User1", "Hello there!", "2023-10-01T10:00:00", users
        );

        ChatRoomsResponse chatRoom2 = ChatRoomsResponse.of(
                2L, "User2", "Hi!", "2023-10-01T11:00:00", users
        );

        List<ChatRoomsResponse> chatRoomsResponses = List.of(chatRoom1, chatRoom2);

        // Mock service method
        when(chatService.getChatRoomsByUserId(userId, token)).thenReturn(chatRoomsResponses);

        // When & Then
        mockMvc.perform(get("/api/v1/chatroom/user")
                        .param("userId", userId.toString())
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                // Add more assertions as needed
                .andDo(document("chatroom-getChatRooms",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName("Authorization").description("Bearer authentication token")
                        ),
                        queryParameters(
                                parameterWithName("userId").description("ID of the user requesting chat rooms")
                        ),
                        responseFields(
                                fieldWithPath("success").description("Indicates if the request was successful"),
                                fieldWithPath("response[].chatRoomId").description("Unique ID of the chat room"),
                                fieldWithPath("response[].lastUserName").description(
                                        "Name of the user who sent the last message"),
                                fieldWithPath("response[].lastMessage").description("Content of the last message"),
                                fieldWithPath("response[].lastMessageTime").description(
                                        "Timestamp of the last message"),
                                fieldWithPath("response[].users[]").description("List of users in the chat room"),
                                fieldWithPath("response[].users[].id").description("Unique ID of the user"),
                                fieldWithPath("response[].users[].nickname").description("Nickname of the user"),
                                fieldWithPath("response[].users[].birthday").description(
                                        "Birthday of the user in MM-DD format"),
                                fieldWithPath("response[].users[].gender").description("Gender of the user"),
                                fieldWithPath("response[].users[].profileImage").description(
                                        "URL of the user's profile image"),
                                fieldWithPath("error").optional().description("Error information if the request failed")
                        )
                ));
    }
}
