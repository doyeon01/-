package com.ssafy.handam.plan.domain.repository;

import com.ssafy.handam.plan.domain.entity.DayPlan;

import java.util.List;

public interface DayPlanRepository {
    DayPlan save(DayPlan dayPlan);
    List<DayPlan> findAllByTotalPlanId(Long totalId);
}
