package com.ssafy.handam.accompanyboard.presentation;

import static com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.success;

import com.ssafy.handam.accompanyboard.domain.model.valueobject.response.ArticleInitSettingResponse;
import com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.accompanyboard.presentation.request.ArticleInitSettingRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accompanyboard")
public class AccompanyBoardController {

    @GetMapping("/articles/{id}")
    public ApiResult<ArticleInitSettingResponse> getArticle(@PathVariable("id") Long id) {

        ArticleInitSettingRequest request = ArticleInitSettingRequest.defaultRequest();
        request.setId(id);

        ArticleInitSettingResponse response = ArticleInitSettingResponse.of(request.getId());

        return success(response);
    }
}
