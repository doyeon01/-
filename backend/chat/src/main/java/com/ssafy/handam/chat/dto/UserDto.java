package com.ssafy.handam.chat.dto;

import java.time.MonthDay;

public record UserDto(Long id,
                      String nickname,
                      MonthDay birthday,
                      Gender gender,
                      String profileImage
                      ) {
}
