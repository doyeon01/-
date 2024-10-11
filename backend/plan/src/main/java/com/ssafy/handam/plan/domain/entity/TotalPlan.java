package com.ssafy.handam.plan.domain.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class TotalPlan extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String title;

    private LocalDate startDate;

    private LocalDate endDate;

    @OneToMany(mappedBy = "totalPlan")
    private List<DayPlan> dayPlans;

    @Builder
    public TotalPlan(Long userId, String title, LocalDate startDate, LocalDate endDate, List<DayPlan> dayPlans) {
        this.userId = userId;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.dayPlans = dayPlans;
    }
}