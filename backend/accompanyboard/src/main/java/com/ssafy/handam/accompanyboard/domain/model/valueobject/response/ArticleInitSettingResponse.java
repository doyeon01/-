package com.ssafy.handam.accompanyboard.domain.model.valueobject.response;

import lombok.Data;

@Data
public class ArticleInitSettingResponse {

    private Long id;
    private Long user_id;
    private Long schedule_id;
    private String title;
    private String description;

    public static ArticleInitSettingResponse of(Long articleId){

        ArticleInitSettingResponse response = new ArticleInitSettingResponse();
        response.id = 1L;
        response.user_id = 1L;
        response.schedule_id = 1L;
        response.title = "동행 게시글 제목";
        response.description = "동행 게시글 내용";
        return response;
    }
}
