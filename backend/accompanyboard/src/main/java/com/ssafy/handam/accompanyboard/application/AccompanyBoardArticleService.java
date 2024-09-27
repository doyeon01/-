package com.ssafy.handam.accompanyboard.application;

import com.ssafy.handam.accompanyboard.domain.service.AccompanyBoardArticleDomainService;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AccompanyBoardArticleService {

    private final AccompanyBoardArticleDomainService accompanyBoardArticleDomainService;

    public AccompanyBoardArticleDetailResponse createArticle(AccompanyBoardArticleCreationRequest request) {
        return new AccompanyBoardArticleDetailResponse(
                1L,
                1L,
                1L,
                "testTitle",
                "testDescription"
        );
    }
}
