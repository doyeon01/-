package com.ssafy.handam.plan.infrastructure.repository;

import com.ssafy.handam.plan.domain.entity.TotalPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TotalPlanJpaRepository extends JpaRepository<TotalPlan, Long> {
}
