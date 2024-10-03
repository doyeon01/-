package com.ssafy.handam.plan.domain.repository;

import com.ssafy.handam.plan.domain.entity.Plan;
import com.ssafy.handam.plan.infrastructure.repository.PlanJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PlanRepositoryImpl implements PlanRepository {
    private final PlanJpaRepository planJpaRepository;

    @Override
    public Plan save(Plan plan) {
       return planJpaRepository.save(plan);
    }




}
