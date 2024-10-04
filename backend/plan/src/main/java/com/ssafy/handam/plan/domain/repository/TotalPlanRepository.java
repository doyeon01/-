package com.ssafy.handam.plan.domain.repository;

import com.ssafy.handam.plan.domain.entity.TotalPlan;

import java.util.List;

public interface TotalPlanRepository {
    TotalPlan save(TotalPlan totalPlan);
    List<TotalPlan> findAllByUserId(Long userId);
}
