package com.ssafy.handam.user.presentation.request;

import java.util.List;
import java.util.Map;

public record UserSurveyRequest(
        Map<Integer, String> questions,
        Map<Integer, List<Integer>> photoSelections
) {

    public static UserSurveyRequest of(Map<Integer, String> questions,
                                       Map<Integer, List<Integer>> photoSelections) {
        return new UserSurveyRequest(questions, photoSelections);
    }

}
