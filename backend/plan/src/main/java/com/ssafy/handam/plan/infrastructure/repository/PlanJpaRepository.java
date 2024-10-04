package com.ssafy.handam.plan.infrastructure.repository;

import com.ssafy.handam.plan.domain.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanJpaRepository extends JpaRepository<Plan, Long> {
}
