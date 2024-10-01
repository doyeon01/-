package com.ssafy.handam.user.domain.model.valueobject;

import lombok.Builder;

@Builder
public record UserSurveyData (
        String nickname,
        String residence,
        String introduction,
        String travelStyl1,
        String travelStyl2,
        String travelStyl3,
        String travelStyl4
){
}
