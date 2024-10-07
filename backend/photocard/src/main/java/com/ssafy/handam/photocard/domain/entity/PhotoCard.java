package com.ssafy.handam.photocard.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoCard extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long totalPlanId;
    private String photoCardUrl;
    private String caption;

    public PhotoCard(Long userId, Long totalPlanId, String photoCardUrl, String caption) {

        this.userId = userId;
        this.totalPlanId = totalPlanId;
        this.photoCardUrl = photoCardUrl;
        this.caption = caption;
    }
}
