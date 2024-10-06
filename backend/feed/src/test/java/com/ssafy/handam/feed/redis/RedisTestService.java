package com.ssafy.handam.feed.redis;

import com.ssafy.handam.feed.IntegrationTestSupport;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;


public class RedisTestService extends IntegrationTestSupport {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Test
    public void testRedisConnection() {
        // 데이터 저장
        String key = "testKey";
        String value = "Hello, Redis!";
        redisTemplate.opsForValue().set(key, value);

        // 데이터 조회
        Object retrievedValue = redisTemplate.opsForValue().get(key);
        System.out.println("Value: " + retrievedValue);

        // 데이터 삭제
        redisTemplate.delete(key);

        // 삭제 확인
        Object deletedValue = redisTemplate.opsForValue().get(key);
        System.out.println("Deleted Value: " + deletedValue);
    }
}
