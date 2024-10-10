package com.ssafy.handam.user.application.dto.request;

import com.ssafy.handam.user.domain.model.valueobject.UserSurveyData;
import lombok.Builder;

@Builder
public record UserSurveyServiceRequest(String nickname,
                                      String residence,
                                      String introduction,
                                      String travelStyl1,
                                      String travelStyl2,
                                      String travelStyl3,
                                      String travelStyl4
) {
    public UserSurveyData toSurveyData(UserSurveyServiceRequest userSurveyServiceRequest) {
        return UserSurveyData.builder()
                .nickname(userSurveyServiceRequest.nickname())
                .residence(userSurveyServiceRequest.residence())
                .introduction(userSurveyServiceRequest.introduction())
                .travelStyl1(userSurveyServiceRequest.travelStyl1())
                .travelStyl2(userSurveyServiceRequest.travelStyl2())
                .travelStyl3(userSurveyServiceRequest.travelStyl3())
                .travelStyl4(userSurveyServiceRequest.travelStyl4())
                .build();
    }
}
