package com.ssafy.handam.accompanyboard.domain.service;

import static org.junit.jupiter.api.Assertions.*;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.domain.entity.Comment;
import com.ssafy.handam.accompanyboard.domain.repository.AccompanyBoardCommentRepository;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.request.comment.AccompanyBoardCommentCreationRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class AccompanyBoardCommentDomainServiceTest {

    @Autowired
    private AccompanyBoardCommentRepository accompanyBoardCommentRepository;

    @Autowired
    private AccompanyBoardCommentDomainService accompanyBoardCommentDomainService;

    @BeforeEach
    void setUp() {
        accompanyBoardCommentDomainService = new AccompanyBoardCommentDomainService(accompanyBoardCommentRepository);
    }

    @Test
    @DisplayName("동행 게시글 댓글 작성 단위 테스트 - H2 DB에 저장")
    void createComment() {
        AccompanyBoardCommentCreationRequest request = new AccompanyBoardCommentCreationRequest(
                1L,
                1L,
                "testContent"
        );

        // when: 댓글을 생성하고 DB에 저장
        Comment savedComment = accompanyBoardCommentDomainService.createComment(request);

        // Then: 저장된 기사가 DB에 있는지 확인
        Comment foundComment = accompanyBoardCommentRepository.findById(savedComment.getId()).orElse(null);

        assertNotNull(foundComment);  // 데이터가 null이 아닌지 확인
        assertEquals(request.userId(), foundComment.getUserId());  // 사용자 ID가 일치하는지 확인
        assertEquals(request.accompanyBoardArticleId(), foundComment.getAccompanyBoardArticleId());  // 게시글이 일치하는지 확인
        assertEquals(request.content(), foundComment.getContent());  // 내용이 일치하는지 확인
    }
}