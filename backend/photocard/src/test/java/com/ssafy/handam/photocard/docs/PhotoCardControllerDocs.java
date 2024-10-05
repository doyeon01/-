package com.ssafy.handam.photocard.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.photocard.application.dto.PhotoCardDetailDto;
import com.ssafy.handam.photocard.presentation.request.PhotoCardCreationRequest;
import com.ssafy.handam.photocard.presentation.response.PhotoCardDetailResponse;
import com.ssafy.handam.photocard.presentation.response.PhotoCardsResponse;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

public class PhotoCardControllerDocs extends RestDocsSupport{

    @Test
    @DisplayName("포토카드 생성 API")
    void createPhotoCardTest() throws Exception{
        PhotoCardCreationRequest request = new PhotoCardCreationRequest(
                1L,
                1L,
                "http://example.com/thumbNail.jpg"
        );

        PhotoCardDetailResponse response = new PhotoCardDetailResponse(
                1L,
                1L,
                1L,
                "http://example.com/photoCard.jpg",
                "2024-10-06"
        );

        given(photoCardArticleService.createPhotoCard(any())).willReturn(response);

        String requestBody = objectMapper.writeValueAsString(request);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/photocards/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(requestBody)
        )
                .andExpect(status().isOk())
                .andDo(document("create-photocard",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("feedId").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("thumbnailUrl").type(JsonFieldType.STRING)
                                        .description("피드 썸네일 URL")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                        .description("포토카드 ID"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.feedId").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.photoCardUrl").type(JsonFieldType.STRING)
                                        .description("생성된 포토카드 URL"),
                                fieldWithPath("response.createdDate").type(JsonFieldType.STRING)
                                        .description("생성 날짜"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @Test
    @DisplayName("특정 피드의 포토 카드 조회 API")
    void getPhotoCardTest() throws Exception{
        PhotoCardDetailDto photoCardDetailDto = new PhotoCardDetailDto(
                1L,
                1L,
                1L,
                "http://example.com/photoCard.jpg",
                "2024-10-06"
        );

        Long requestFeedId = 1L;

        PhotoCardDetailResponse response = PhotoCardDetailResponse.of(photoCardDetailDto);

        given(photoCardArticleService.getPhotoCard(requestFeedId)).willReturn(response);

        mockMvc.perform(
                RestDocumentationRequestBuilders.get("/api/v1/photocards/detail/{feedId}", requestFeedId)
        )
                .andExpect(status().isOk())
                .andDo(document("get-photocard",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("feedId").description("피드 ID")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                        .description("포토카드 ID"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.feedId").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.photoCardUrl").type(JsonFieldType.STRING)
                                        .description("생성된 포토카드 URL"),
                                fieldWithPath("response.createdDate").type(JsonFieldType.STRING)
                                        .description("생성 날짜"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));

    }

    @Test
    @DisplayName("특정 유저의 포토 카드 조회 API")
    void getPhotoCardsTest() throws Exception{
        PhotoCardDetailDto photoCardDetailDto = new PhotoCardDetailDto(
                1L,
                1L,
                1L,
                "http://example.com/photoCard.jpg",
                "2024-10-06"
        );

        Long requestUserId = 1L;

        PhotoCardsResponse response = PhotoCardsResponse.of(List.of(photoCardDetailDto), 0, false);

        Pageable pageable = PageRequest.of(0, 6);

        given(photoCardArticleService.getPhotoCardsByUserId(requestUserId, pageable)).willReturn(response);

        mockMvc.perform(
                RestDocumentationRequestBuilders.get("/api/v1/photocards/search/{userId}", requestUserId)
                        .param("page", "0")
                        .param("size", "6")
        )
                .andExpect(status().isOk())
                .andDo(document("get-photocards-by-user",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("userId").description("사용자 ID")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.photoCards[].id").type(JsonFieldType.NUMBER)
                                        .description("포토카드 ID"),
                                fieldWithPath("response.photoCards[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.photoCards[].feedId").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.photoCards[].photoCardUrl").type(JsonFieldType.STRING)
                                        .description("생성된 포토카드 URL"),
                                fieldWithPath("response.photoCards[].createdDate").type(JsonFieldType.STRING)
                                        .description("생성 날짜"),
                                fieldWithPath("response.currentPage").type(JsonFieldType.NUMBER)
                                        .description("현재 페이지"),
                                fieldWithPath("response.hasNextPage").type(JsonFieldType.BOOLEAN)
                                        .description("다음 페이지 존재 여부"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }
}
