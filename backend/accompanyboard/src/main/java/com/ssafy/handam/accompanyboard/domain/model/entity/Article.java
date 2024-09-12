package com.ssafy.handam.accompanyboard.domain.model.entity;

import lombok.Data;

@Data
public class Article {

    private Long id;
    private Long user_id;
    private Long schedule_id;
    private String title;
    private String description;

    public Article() {}

    public Article(Long id, Long user_id, Long schedule_id, String title, String description) {
        this.id = id;
        this.user_id = user_id;
        this.schedule_id = schedule_id;
        this.title = title;
        this.description = description;
    }
}
