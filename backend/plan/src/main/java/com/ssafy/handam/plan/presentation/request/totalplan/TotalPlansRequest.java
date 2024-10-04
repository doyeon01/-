    package com.ssafy.handam.plan.presentation.request.totalplan;

    import com.ssafy.handam.plan.application.dto.TotalPlansServiceRequest;
    import com.ssafy.handam.plan.presentation.request.dayplan.DayPlanRequest;
    import lombok.Builder;

    import java.util.List;
    import java.util.stream.Collectors;

    @Builder
    public record TotalPlansRequest(
            Long userId,
            String title,
            List<DayPlanRequest> dayPlans
    ) {
        public TotalPlansServiceRequest toTotalPlansServiceRequest() {
            return TotalPlansServiceRequest.builder()
                    .userId(this.userId)
                    .title(this.title)
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
                    ", dayPlans=" + dayPlans +
                    '}';
        }
    }