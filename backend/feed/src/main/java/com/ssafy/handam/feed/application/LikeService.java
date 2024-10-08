package com.ssafy.handam.feed.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.handam.feed.domain.service.FeedDomainService;
import com.ssafy.handam.feed.infrastructure.client.UserServiceClient;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedDocument;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();


    public void sendLikeEvent(Long feedId, Long userId, String eventType) {
        Map<String, Object> message = new HashMap<>();
        LocalDateTime currentTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        String formattedTimestamp = currentTime.format(formatter);
        message.put("feed_id", feedId);
        message.put("user_id", userId);
        message.put("travel_type", eventType);
        message.put("timestamp", formattedTimestamp);

        try {
            String messageAsString = objectMapper.writeValueAsString(message);
            kafkaTemplate.send("like-events", messageAsString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public List<FeedDocument> preformClustering(Long userId){
        // 클러스터링 로직 (예시로 빈 데이터 반환))
        return List.of();
    }
}