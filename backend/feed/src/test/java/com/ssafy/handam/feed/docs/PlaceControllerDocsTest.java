package com.ssafy.handam.feed.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.feed.RestDocsSupport;
import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.entity.Place;
import com.ssafy.handam.feed.presentation.response.place.PlaceDetailResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

class PlaceControllerDocsTest extends RestDocsSupport {

    @DisplayName("장소 상세 정보 조회 API")
    @Test
    void getPlaceDetail() throws Exception {
        PlaceDetailResponse response = PlaceDetailResponse.of(createPlace());

        given(placeService.getPlaceDetail(any())).willReturn(response);

        mockMvc.perform(get("/api/v1/places")
                        .param("id", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("place-detail", preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답 데이터"),
                                fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                        .description("장소 ID"),
                                fieldWithPath("response.name").type(JsonFieldType.STRING)
                                        .description("장소 이름"),
                                fieldWithPath("response.address1").type(JsonFieldType.STRING)
                                        .description("장소 주소"),
                                fieldWithPath("response.address2").type(JsonFieldType.STRING)
                                        .description("장소 상세 주소"),
                                fieldWithPath("response.imageUrl").type(JsonFieldType.STRING)
                                        .description("장소 이미지 URL"),
                                fieldWithPath("response.longitude").type(JsonFieldType.NUMBER)
                                        .description("장소 경도"),
                                fieldWithPath("response.latitude").type(JsonFieldType.NUMBER)
                                        .description("장소 위도"),
                                fieldWithPath("response.likeCount").type(JsonFieldType.NUMBER)
                                        .description("좋아요 수"),
                                fieldWithPath("response.placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러 메시지")
                        )
                ));


    }

    private Place createPlace() {
        return Place.builder()
                .id(1L)
                .name("장소 이름")
                .address1("장소 주소")
                .address2("장소 상세 주소")
                .imageUrl("장소 이미지 URL")
                .longitude(37.123456)
                .latitude(127.123456)
                .placeType(PlaceType.RESTAURANT)
                .build();
    }
}
