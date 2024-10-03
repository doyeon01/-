package com.ssafy.handam.accompanyboard.infrastructure.client;

import com.ssafy.handam.accompanyboard.infrastructure.client.dto.UserDto;
import com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.ApiResult;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class UserApiClient {

    private final RestTemplate restTemplate;

    @Value("${user.service.url}")
    private String userServiceUrl;

    public UserDto getUserById(Long userId) {

        Map<String, Object> userMap = restTemplate.getForObject(userServiceUrl + "/user/" + userId, Map.class);
        System.out.println(userMap);
        return convertMapToUserDto(userMap);
    }

    public UserDto convertMapToUserDto(Map map) {
        Map<String, Object> userResponse = (Map<String, Object>)map.get("response");
        System.out.println("사용자 이름");
        System.out.println((String)userResponse.get("nickname"));
        return UserDto.of(((Integer) userResponse.get("id")).longValue(), (String)userResponse.get("nickname"), (String)userResponse.get("email"), (String)userResponse.get("profileImageUrl"));
    }
}
