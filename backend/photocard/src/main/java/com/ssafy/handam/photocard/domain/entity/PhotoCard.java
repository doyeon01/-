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
    private Long feedId;
    private Long totalPlanId;
    private String planTitle;
    private String photoCardUrl;

    public PhotoCard(
            Long userId,
            Long feedId,
            Long totalPlanId,
            String planTitle,
            String photoCardUrl) {

        this.userId = userId;
        this.feedId = feedId;
        this.totalPlanId = totalPlanId;
        this.planTitle = planTitle;
        this.photoCardUrl = photoCardUrl;
    }
}
