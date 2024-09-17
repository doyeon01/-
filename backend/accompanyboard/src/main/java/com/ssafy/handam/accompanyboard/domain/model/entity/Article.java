package com.ssafy.handam.accompanyboard.domain.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Article extends BaseEntity{

    @Id
    private Long id;
    private Long user_id;
    private Long schedule_id;
    private String title;
    private String description;

    @Builder
    public Article(Long id,
                   Long user_id,
                   Long schedule_id,
                   String title,
                   String description) {
        this.id = id;
        this.user_id = user_id;
        this.schedule_id = schedule_id;
        this.title = title;
        this.description = description;
    }
}
