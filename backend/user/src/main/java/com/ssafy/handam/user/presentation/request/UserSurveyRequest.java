package com.ssafy.handam.user.presentation.request;

public record UserSurveyRequest(
        String nickname,
        String residence,
        String introduction,
        String travelStyl1,
        String travelStyl2,
        String travelStyl3,
        String travelStyl4
) {

    public static UserSurveyRequest of(String nickname,
                                       String residence,
                                       String introduction,
                                       String travelStyl1,
                                       String travelStyl2,
                                       String travelStyl3,
                                       String travelStyl4) {
        return new UserSurveyRequest(nickname, residence, introduction, travelStyl1, travelStyl2, travelStyl3, travelStyl4);
    }
}
