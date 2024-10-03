package com.ssafy.handam.feed.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.handam.feed.domain.service.FeedDomainService;
import com.ssafy.handam.feed.infrastructure.client.UserServiceClient;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final FeedDomainService feedDomainService;
    private final UserServiceClient userServiceClient;

    public void sendLikeEvent(Long feedId, Long userId, String eventType) {
        Map<String, Object> message = new HashMap<>();
        message.put("feed_id", feedId);
        message.put("user_id", userId);
        message.put("travel_type", eventType);
        message.put("timestamp", Instant.now().toString());

        try {
            String messageAsString = objectMapper.writeValueAsString(message);
            kafkaTemplate.send("like-events", messageAsString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}