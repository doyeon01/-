package com.ssafy.handam.plan.domain.repository;

import com.ssafy.handam.plan.domain.entity.Plan;

public interface PlanRepository {
    Plan save(Plan plan);
}