package com.ssafy.handam.plan.domain.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class DayPlan extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long day;

    @OneToMany(mappedBy = "dayPlan")
    private List<Plan> plans;

    @ManyToOne
    @JoinColumn(name = "total_plan_id")
    private TotalPlan totalPlan;

    @Builder
    public DayPlan(Long day, List<Plan> plans, TotalPlan totalPlan) {
        this.day = day;
        this.plans = plans;
        this.totalPlan = totalPlan;
    }
}