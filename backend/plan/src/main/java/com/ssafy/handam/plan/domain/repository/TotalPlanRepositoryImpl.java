package com.ssafy.handam.plan.domain.repository;

import com.ssafy.handam.plan.domain.entity.TotalPlan;
import com.ssafy.handam.plan.infrastructure.repository.TotalPlanJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TotalPlanRepositoryImpl implements TotalPlanRepository {
    private final TotalPlanJpaRepository totalPlanJpaRepository;

    @Override
    public TotalPlan save(TotalPlan totalPlan) {
        return totalPlanJpaRepository.save(totalPlan);
    }
}
