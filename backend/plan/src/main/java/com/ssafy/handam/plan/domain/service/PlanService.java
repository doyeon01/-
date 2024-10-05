package com.ssafy.handam.plan.domain.service;

import com.ssafy.handam.plan.domain.entity.DayPlan;
import com.ssafy.handam.plan.domain.entity.Plan;
import com.ssafy.handam.plan.domain.entity.TotalPlan;
import com.ssafy.handam.plan.domain.repository.DayPlanRepository;
import com.ssafy.handam.plan.domain.repository.PlanRepository;
import com.ssafy.handam.plan.domain.repository.TotalPlanRepository;
import com.ssafy.handam.plan.domain.valueobject.TotalPlanData;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class PlanService {
    private final PlanRepository planRepository;
    private final DayPlanRepository dayPlanRepository;
    private final TotalPlanRepository totalPlanRepository;

    public void createPlan(TotalPlanData totalPlanData) {
        TotalPlan savedTotalPlan = totalPlanRepository.save( //전체일정
                TotalPlan.builder()
                        .userId(totalPlanData.userId())
                        .startDate(totalPlanData.startDate())
                        .endDate(totalPlanData.endDate())
                        .title(totalPlanData.title())
                        .build()
        );
        totalPlanData.dayPlanData().forEach(dayPlansData -> { //각 전체일정의 일별일정
            DayPlan savedDayPlan = dayPlanRepository.save(
                    DayPlan.builder()
                            .day(dayPlansData.day())
                            .totalPlan(savedTotalPlan)
                            .build()
            );

            dayPlansData.plansData().forEach(planData -> planRepository.save( //각 일별일정의 장소
                    Plan.builder()
                            .placeName(planData.placeName())
                            .imageUrl(planData.imageUrl())
                            .address1(planData.address1())
                            .address2(planData.address2())
                            .longitude(planData.longitude())
                            .latitude(planData.latitude())
                            .placeType(planData.placeType())
                            .details(planData.details())
                            .dayPlan(savedDayPlan)
                            .build()
            ));
        });
    }
    public List<TotalPlan> getTotalPlans(Long userId) {
        return totalPlanRepository.findAllByUserId(userId);
    }
    public List<Long> getDayPlanIdsByTotalPlanId(Long totalPlanId) {
        return dayPlanRepository.findAllByTotalPlanId(totalPlanId)
                .stream()
                .map(DayPlan::getId)
                .collect(Collectors.toList());
    }
    public List<Plan> getPlansByDayPlanId(Long dayPlanId) {
        return planRepository.findAllByDayPlanId(dayPlanId);
    }

}
