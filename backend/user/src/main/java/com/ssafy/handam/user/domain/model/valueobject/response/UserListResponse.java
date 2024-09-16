package com.ssafy.handam.user.domain.model.valueobject.response;

import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.Gender;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@RequiredArgsConstructor
public class UserListResponse {
    public static List<UserInfoResponse> of(List<User> users) {
        // User 엔티티 리스트를 UserInfoResponse 리스트로 변환
        return users.stream()
                .map(user -> UserInfoResponse.builder()
                        .username(user.getUsername())
                        .birth(user.getBirth())
                        .gender(user.getGender())
                        .residence(user.getResidence())
                        .introduction(user.getIntroduction())
                        .accompanyTemperature(user.getAccompanyTemperature())
                        .build())
                .collect(Collectors.toList());
    }
}
