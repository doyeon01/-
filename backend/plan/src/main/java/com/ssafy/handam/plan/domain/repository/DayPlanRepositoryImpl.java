package com.ssafy.handam.plan.domain.repository;

import com.ssafy.handam.plan.domain.entity.DayPlan;
import com.ssafy.handam.plan.infrastructure.repository.DayPlanJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DayPlanRepositoryImpl implements DayPlanRepository {
    private final DayPlanJpaRepository dayPlanJpaRepository;
    @Override
    public DayPlan save(DayPlan dayPlan) {
        return dayPlanJpaRepository.save(dayPlan);
    }
}
