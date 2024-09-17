package com.ssafy.handam.accompanyboard.domain.model.valueobject.response;

import com.ssafy.handam.accompanyboard.domain.model.entity.Article;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticleInfoResponse {

    private Long id;
    private Long user_id;
    private Long schedule_id;
    private String title;
    private String description;

    public static ArticleInfoResponse of(Article article){
        return ArticleInfoResponse.builder()
                .id(article.getId())
                .user_id(article.getUser_id())
                .schedule_id(article.getSchedule_id())
                .title(article.getTitle())
                .description(article.getDescription())
                .build();
    }
}
