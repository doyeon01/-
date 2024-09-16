package com.ssafy.handam.user.presentation.request;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
