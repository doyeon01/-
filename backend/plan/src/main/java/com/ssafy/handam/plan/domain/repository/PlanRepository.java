package com.ssafy.handam.plan.domain.repository;

import com.ssafy.handam.plan.domain.entity.Plan;

import java.util.List;

public interface PlanRepository {
    Plan save(Plan plan);
    List<Plan> findAllByDayPlanId(Long dayPlanId);

}