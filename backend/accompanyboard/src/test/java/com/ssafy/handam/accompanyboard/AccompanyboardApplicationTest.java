package com.ssafy.handam.accompanyboard;

import static com.ssafy.handam.accompanyboard.ApiDocumentUtils.getDocumentRequest;
import static com.ssafy.handam.accompanyboard.ApiDocumentUtils.getDocumentResponse;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.RestDocsSupport;
import com.ssafy.handam.accompanyboard.presentation.request.AccompanyBoardArticleRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class AccompanyboardApplicationTest extends RestDocsSupport {

	@Test
	@DisplayName("id로 동행 게시글 상세 조회")
	void getArticle() throws Exception {

		mockMvc.perform(get("/api/v1/accompanyboard/articles/{id}", 1L)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.response.id").isNumber())
				.andExpect(jsonPath("$.response.user_id").isNumber())
				.andExpect(jsonPath("$.response.schedule_id").isNumber())
				.andExpect(jsonPath("$.response.title").isString())
				.andExpect(jsonPath("$.response.description").isString())
				.andDo(print())
				.andDo(document("get-article",
						getDocumentRequest(),
						getDocumentResponse(),
						pathParameters(
								parameterWithName("id").description("동행게시글 ID")
						),
						responseFields(
								fieldWithPath("success").description("응답의 성공 여부 (true 또는 false"),
								fieldWithPath("response").description("응답 객체"),
								fieldWithPath("response.id").description("동행게시글 ID"),
								fieldWithPath("response.user_id").description("유저 ID"),
								fieldWithPath("response.schedule_id").description("여행일정 ID"),
								fieldWithPath("response.title").description("제목"),
								fieldWithPath("response.description").description("설명"),
								fieldWithPath("error").description("오류 정보 (있다면, null일 수 있음)")
						)
				));
	}

	@Test
	@DisplayName("모든 동행 게시글 조회")
	void getArticles() throws Exception {

		mockMvc.perform(get("/api/v1/accompanyboard/articles")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andDo(print())
				.andDo(document("get-articles",
						getDocumentRequest(),
						getDocumentResponse(),
						responseFields(
								fieldWithPath("success").description("응답의 성공 여부 (true 또는 false"),
								fieldWithPath("response[]").description("응답 객체"),
								fieldWithPath("response[].id").description("동행게시글 ID"),
								fieldWithPath("response[].user_id").description("유저 ID"),
								fieldWithPath("response[].schedule_id").description("여행일정 ID"),
								fieldWithPath("response[].title").description("제목"),
								fieldWithPath("response[].description").description("설명"),
								fieldWithPath("error").description("오류 정보 (있다면, null일 수 있음)")
						)
				));
	}

	@Test
	@DisplayName("동행 게시글 작성")
	void postArticle() throws Exception {

		AccompanyBoardArticleRequest request = createAccompanyBoardArticleRequest();
		String requestBody = objectMapper.writeValueAsString(request);

		mockMvc.perform(post("/api/v1/accompanyboard/article")
						.contentType(MediaType.APPLICATION_JSON)
						.content(requestBody))
				.andExpect(status().isOk())
				.andDo(print())
				.andDo(document("post-article",
						getDocumentRequest(),
						getDocumentResponse(),
						requestFields(
                                    fieldWithPath("user_id").description("동행 게시글을 올린 사용자의 id"),
                                    fieldWithPath("schedule_id").description("사용자가 동행을 구할 여행 일정의 id"),
                                    fieldWithPath("title").description("동행 게시글의 제목"),
                                    fieldWithPath("description").description("동행 게시글의 내용")
						),
						responseFields(
								fieldWithPath("success").description("응답의 성공 여부 (true 또는 false)"),
								fieldWithPath("response").description("응답 데이터 (이 경우 null일 수 있음)"),
								fieldWithPath("error").description("오류 정보 (null일 수 있음)")
						)
				));

	}

	public AccompanyBoardArticleRequest createAccompanyBoardArticleRequest() {

		Long user_id = 1L;
		Long schedule_id = 1L;
		String title = "작성한 동행 게시글 제목";
		String description = "작성한 동행 게시글 내용";

		return AccompanyBoardArticleRequest.of(user_id, schedule_id, title, description);
	}

}
