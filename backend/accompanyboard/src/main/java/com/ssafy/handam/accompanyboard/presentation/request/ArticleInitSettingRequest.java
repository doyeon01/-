package com.ssafy.handam.accompanyboard.presentation.request;


public record ArticleInitSettingRequest (Long id) {
    public static ArticleInitSettingRequest of(Long id) {
        return new ArticleInitSettingRequest(id);
    }
}
