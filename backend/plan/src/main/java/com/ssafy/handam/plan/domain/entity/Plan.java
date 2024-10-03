package com.ssafy.handam.plan.domain.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placeName;
    private String imageUrl;
    private String address1;
    private String address2;
    private Double longitude;
    private Double latitude;

    private String placeType;
    private String details;

    @ManyToOne
    @JoinColumn(name = "day_plan_id")
    private DayPlan dayPlan;

    @Builder
    private Plan(
            String placeName,
            String imageUrl,
            String address1,
            String address2,
            Double longitude,
            Double latitude,
            String placeType,
            String details,
            DayPlan dayPlan
    ) {
        this.placeName = placeName;
        this.imageUrl = imageUrl;
        this.address1 = address1;
        this.address2 = address2;
        this.longitude = longitude;
        this.latitude = latitude;
        this.placeType = placeType;
        this.details = details;
        this.dayPlan = dayPlan;
    }
}