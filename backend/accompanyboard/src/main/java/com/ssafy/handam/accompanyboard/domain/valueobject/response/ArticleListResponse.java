package com.ssafy.handam.accompanyboard.domain.valueobject.response;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ArticleListResponse {
    public static List<ArticleInfoResponse> of(List<Article> articles) {
        return articles.stream()
                .map(article -> ArticleInfoResponse.builder()
                        .id(article.getId())
                        .user_id(article.getUser_id())
                        .schedule_id(article.getSchedule_id())
                        .title(article.getTitle())
                        .description(article.getDescription())
                        .build())
                .collect(Collectors.toList());
    }
}
