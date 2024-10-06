package com.ssafy.handam.plan.infrastructure.repository;

import com.ssafy.handam.plan.domain.entity.DayPlan;
import com.ssafy.handam.plan.domain.entity.TotalPlan;
import com.ssafy.handam.plan.domain.repository.TotalPlanRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TotalPlanJpaRepository extends JpaRepository<TotalPlan, Long> {
    List<TotalPlan> findAllByUserId(Long userId);
    TotalPlan findTotalPlanById(Long totalPlanId);

}
