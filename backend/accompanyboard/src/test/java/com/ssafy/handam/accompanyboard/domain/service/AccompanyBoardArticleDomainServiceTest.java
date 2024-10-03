package com.ssafy.handam.accompanyboard.domain.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.domain.repository.AccompanyBoardArticleRepository;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
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

    @Test
    @DisplayName("동행 게시글 전체 조회 테스트 - H2 DB에 저장")
    void getArticlesTest() {
        Article article1 = new Article(1L, 1L, "testTitle1", "testDescription1");
        Article article2 = new Article(2L, 2L, "testTitle2", "testDescription2");
        accompanyBoardArticleRepository.save(article1);
        accompanyBoardArticleRepository.save(article2);

        List<Article> result = accompanyBoardArticleDomainService.getArticles();

        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getUserId());
        assertEquals(1L, result.get(0).getScheduleId());
        assertEquals("testTitle1", result.get(0).getTitle());
        assertEquals("testDescription1", result.get(0).getDescription());
        assertEquals(2L, result.get(1).getUserId());
        assertEquals(2L, result.get(1).getScheduleId());
        assertEquals("testTitle2", result.get(1).getTitle());
        assertEquals("testDescription2", result.get(1).getDescription());
    }
}