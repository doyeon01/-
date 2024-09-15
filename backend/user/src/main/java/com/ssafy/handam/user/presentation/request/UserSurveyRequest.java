package com.ssafy.handam.user.presentation.request;

import lombok.Getter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSurveyRequest {

    private static final int BASE_PHOTO_ID = 100;
    private Map<Integer, String> questions;
    private Map<Integer, List<Integer>> photoSelections;

    public static UserSurveyRequest initSurveyRequest() {
        UserSurveyRequest request = new UserSurveyRequest();
        request.questions = new HashMap<>();
        request.photoSelections = new HashMap<>();

        request.initQuestions();
        request.initPhotoSelections();

        return request;
    }
    private void initQuestions() {
        IntStream.rangeClosed(1, 4)
                .forEach(i -> questions.put(i, (i % 2 == 0) ? "B" : "A"));
    }

    private void initPhotoSelections() {
        IntStream.rangeClosed(1, 4)
                .forEach(i -> photoSelections.put(i, List.of(BASE_PHOTO_ID + i)));
    }
}
