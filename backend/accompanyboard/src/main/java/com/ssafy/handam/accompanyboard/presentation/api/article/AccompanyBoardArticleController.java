package com.ssafy.handam.accompanyboard.presentation.api.article;

import static com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.success;
import static com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest.toServiceRequest;

import com.ssafy.handam.accompanyboard.application.AccompanyBoardArticleService;
import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticlePreviewDto;
import com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/accompanyboards/articles")
@RequiredArgsConstructor
public class AccompanyBoardArticleController {

    private final AccompanyBoardArticleService accompanyBoardArticleService;

    @PostMapping("/create")
    public ApiResult<AccompanyBoardArticleDetailResponse>createArticle(@RequestBody AccompanyBoardArticleCreationRequest request) {
        return success(accompanyBoardArticleService.createArticle(toServiceRequest(request)));
    }

    @GetMapping
    public ApiResult<AccompanyBoardArticlesResponse> getArticles() {
        return success(accompanyBoardArticleService.getArticles());
    }
//
//    @GetMapping("/{articleId}")
//    public ApiResult<AccompanyBoardArticleDetailResponse> getArticleDetails(@PathVariable Long articleId) {
//        return success(accompanyBoardArticleService.getArticleDetails(articleId));
//    }
}
