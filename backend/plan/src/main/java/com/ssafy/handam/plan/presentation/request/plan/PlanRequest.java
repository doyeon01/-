package com.ssafy.handam.plan.presentation.request.plan;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.ssafy.handam.plan.application.dto.PlanServiceRequest;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = PlanFeedRequest.class, name = "feed"),
        @JsonSubTypes.Type(value = PlanPlaceRequest.class, name = "place")
})
public interface PlanRequest {
    PlanServiceRequest toPlanServiceRequest();
}
