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
    private String photoCardUrl;

    public PhotoCard(Long userId, Long feedId, String photoCardUrl) {

        this.userId = userId;
        this.feedId = feedId;
        this.photoCardUrl = photoCardUrl;
    }
}
