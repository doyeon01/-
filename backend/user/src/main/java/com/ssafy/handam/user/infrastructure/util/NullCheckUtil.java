package com.ssafy.handam.user.infrastructure.util;

import java.util.HashMap;
import java.util.Map;
public class NullCheckUtil {

    public static Map<String, Object> handleAttributes(Map<String, Object> attribute) {
        Map<String, Object> result = new HashMap<>();

        result.put("id", attribute.get("id"));
        result.put("email", attribute.get("email"));
        result.put("name", attribute.get("name"));
        result.put("nickname", attribute.getOrDefault("nickname", attribute.get("name")));
        result.put("birthday", attribute.getOrDefault("birthday", "01-01"));
        result.put("gender", attribute.getOrDefault("gender", "F"));
        result.put("age", attribute.getOrDefault("age", "unknown"));
        result.put("profileImage", attribute.getOrDefault("profileImage", "default_profile.png"));

        return result;
    }
}
