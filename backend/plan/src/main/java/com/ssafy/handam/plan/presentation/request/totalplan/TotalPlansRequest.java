    package com.ssafy.handam.plan.presentation.request.totalplan;

    import com.ssafy.handam.plan.application.dto.TotalPlansServiceRequest;
    import com.ssafy.handam.plan.presentation.request.dayplan.DayPlanRequest;
    import lombok.Builder;

    import java.time.LocalDate;
    import java.util.List;
    import java.util.stream.Collectors;

    @Builder
    public record TotalPlansRequest(
            Long userId,
            String title,
            LocalDate startDate,
            LocalDate endDate,
            List<DayPlanRequest> dayPlans
    ) {
        public TotalPlansServiceRequest toTotalPlansServiceRequest(Long userId) {
            return TotalPlansServiceRequest.builder()
                    .userId(userId)
                    .title(this.title)
                    .startDate(this.startDate)
                    .endDate(this.endDate)
                    .dayPlansServiceRequests(this.dayPlans.stream()
                            .map(DayPlanRequest::toDayPlansServiceRequest)
                            .collect(Collectors.toList()))
                    .build();
        }

        @Override
        public String toString() {
            return "TotalPlansRequest{" +
                    "userId=" + userId +
                    ", title='" + title + '\'' +
                    ", startDate=" + startDate +   // 시작일자 toString에 추가
                    ", endDate=" + endDate +       // 종료일자 toString에 추가
                    ", dayPlans=" + dayPlans +
                    '}';
        }
    }