package com.ssafy.handam.user.presentation.request;

import com.ssafy.handam.user.application.dto.request.UserSurveyServiceRequest;
import lombok.Builder;

@Builder
public record UserSurveyRequest(
        String nickname,
        String residence,
        String introduction,
        String travelStyl1,
        String travelStyl2,
        String travelStyl3,
        String travelStyl4
) {

    public UserSurveyServiceRequest toServiceRequest(UserSurveyRequest userSurveyRequest) {
        return UserSurveyServiceRequest.builder()
                .nickname(userSurveyRequest.nickname())
                .residence(userSurveyRequest.residence())
                .introduction(userSurveyRequest.introduction())
                .travelStyl1(userSurveyRequest.travelStyl1())
                .travelStyl2(userSurveyRequest.travelStyl2())
                .travelStyl3(userSurveyRequest.travelStyl3())
                .travelStyl4(userSurveyRequest.travelStyl4())
                .build();
    }
}
