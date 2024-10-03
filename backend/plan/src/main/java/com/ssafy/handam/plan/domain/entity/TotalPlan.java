package com.ssafy.handam.plan.domain.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class TotalPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String title;

    @OneToMany(mappedBy = "totalPlan")
    private List<DayPlan> dayPlans;

    @Builder
    public TotalPlan(Long userId, String title, List<DayPlan> dayPlans) {
        this.userId = userId;
        this.title = title;
        this.dayPlans = dayPlans;
    }
}