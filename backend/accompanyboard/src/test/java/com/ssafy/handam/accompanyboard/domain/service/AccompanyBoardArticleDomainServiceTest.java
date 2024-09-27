package com.ssafy.handam.accompanyboard.domain.service;

import static org.junit.jupiter.api.Assertions.*;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.domain.repository.AccompanyBoardArticleRepository;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
//@ActiveProfiles("test")
class AccompanyBoardArticleDomainServiceTest {

    @Autowired
    private AccompanyBoardArticleRepository accompanyBoardArticleRepository;

    @Autowired
    private AccompanyBoardArticleDomainService accompanyBoardArticleDomainService;

    @BeforeEach
    void setUp() {
        accompanyBoardArticleDomainService = new AccompanyBoardArticleDomainService(accompanyBoardArticleRepository);
    }

    @Test
    @DisplayName("동행 게시글 작성 단위 테스트 - H2 DB에 저장")
    void createArticleTest() {
        AccompanyBoardArticleCreationRequest request = new AccompanyBoardArticleCreationRequest(
                1L,
                1L,
                "testTitle",
                "testDescription"
        );

        // when: 기사를 생성하고 DB에 저장
        Article savedArticle = accompanyBoardArticleDomainService.createArticle(request);

        // Then: 저장된 기사가 DB에 있는지 확인
        Article foundArticle = accompanyBoardArticleRepository.findById(savedArticle.getId()).orElse(null);

        assertNotNull(foundArticle);  // 데이터가 null이 아닌지 확인
        assertEquals(request.title(), foundArticle.getTitle());  // 제목이 일치하는지 확인
        assertEquals(request.description(), foundArticle.getDescription());  // 내용이 일치하는지 확인
        assertEquals(request.userId(), foundArticle.getUserId());  // 사용자 ID가 일치하는지 확인
        assertEquals(request.scheduleId(), foundArticle.getScheduleId());  // 일정 ID가 일치하는지 확인
    }
}