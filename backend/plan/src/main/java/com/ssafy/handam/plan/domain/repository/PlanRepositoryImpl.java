package com.ssafy.handam.plan.domain.repository;

import com.ssafy.handam.plan.domain.entity.Plan;
import com.ssafy.handam.plan.infrastructure.repository.PlanJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PlanRepositoryImpl implements PlanRepository {
    private final PlanJpaRepository planJpaRepository;

    @Override
    public Plan save(Plan plan) {
       return planJpaRepository.save(plan);
    }

    @Override
    public List<Plan> findAllByDayPlanId(Long dayPlanId) {
        return planJpaRepository.findAllByDayPlanId(dayPlanId);
    }


}
