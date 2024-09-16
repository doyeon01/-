package com.ssafy.handam.user.presentation.request;

import lombok.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSurveyRequest {

    private Map<Integer, String> questions;

    private Map<Integer, List<Integer>> photoSelections;

    public static UserSurveyRequest initSurveyRequest() {
        UserSurveyRequest request = new UserSurveyRequest();
        request.questions = new HashMap<>();
        request.photoSelections = new HashMap<>();
        for (int i = 1; i <= 4; i++) {
            request.getQuestions().put(i, (i % 2 == 0) ? "B" : "A");
        }

        for (int i = 1; i <= 4; i++) {
            List<Integer> selections = new ArrayList<>();
            selections.add(100 + i);
            request.getPhotoSelections().put(i, selections);
        }

        return request;
    }
}
