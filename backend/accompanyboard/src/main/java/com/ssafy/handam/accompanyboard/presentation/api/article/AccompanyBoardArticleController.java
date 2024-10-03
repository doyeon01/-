package com.ssafy.handam.accompanyboard.presentation.api.article;

import static com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.success;
import static com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest.toServiceRequest;

import com.ssafy.handam.accompanyboard.application.AccompanyBoardArticleService;
import com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesByTitleResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesByUserResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ApiResult<AccompanyBoardArticlesResponse> getArticles(@PageableDefault(size = 10) Pageable pageable) {
        return success(accompanyBoardArticleService.getArticles(pageable));
    }

    @GetMapping("/{articleId}")
    public ApiResult<AccompanyBoardArticleDetailResponse> getArticleDetails(@PathVariable Long articleId) {
        return success(accompanyBoardArticleService.getArticleDetails(articleId));
    }

    @GetMapping("/user/{userId}")
    public ApiResult<AccompanyBoardArticlesByUserResponse> getArticlesByUser(@PathVariable Long userId, @PageableDefault(size = 10) Pageable pageable) {
        return success(accompanyBoardArticleService.getArticlesByUser(userId, pageable));
    }

    @GetMapping("/search")
    public ApiResult<AccompanyBoardArticlesByTitleResponse> getArticlesByTitle(@RequestParam String title, @PageableDefault(size = 10) Pageable pageable) {
        return success(accompanyBoardArticleService.getArticlesByTitle(title, pageable));
    }
}
