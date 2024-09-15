package com.ssafy.handam.user.presentation.request;

import lombok.Getter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private Long id;

    public static UserRequest initUserInfoRequest() {
        UserRequest request = new UserRequest();
        return request;
    }
}
