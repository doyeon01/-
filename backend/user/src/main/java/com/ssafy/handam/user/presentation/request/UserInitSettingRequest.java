package com.ssafy.handam.user.presentation.request;

import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
public class UserInitSettingRequest {
    private Long id;

    public static UserInitSettingRequest defaultRequest() {
        UserInitSettingRequest request = new UserInitSettingRequest();
        request.id = 1L;  // 하드코딩된 값
        return request;
    }

}
