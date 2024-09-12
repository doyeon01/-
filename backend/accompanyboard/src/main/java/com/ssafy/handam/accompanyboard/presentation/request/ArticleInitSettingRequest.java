package com.ssafy.handam.accompanyboard.presentation.request;

import lombok.Data;

@Data
public class ArticleInitSettingRequest {
    private Long id;

    public static ArticleInitSettingRequest defaultRequest() {
        ArticleInitSettingRequest request = new ArticleInitSettingRequest();
        request.id = 1L;
        return request;
    }
}
