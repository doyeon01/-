package com.ssafy.handam.plan.domain.repository;

import com.ssafy.handam.plan.domain.entity.TotalPlan;
import com.ssafy.handam.plan.infrastructure.repository.TotalPlanJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TotalPlanRepositoryImpl implements TotalPlanRepository {
    private final TotalPlanJpaRepository totalPlanJpaRepository;

    @Override
    public TotalPlan save(TotalPlan totalPlan) {
        return totalPlanJpaRepository.save(totalPlan);
    }

    @Override
    public List<TotalPlan> findAllByUserId(Long userId) {
        return totalPlanJpaRepository.findAllByUserId(userId);
    }
}
