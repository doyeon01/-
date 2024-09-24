package com.ssafy.handam.feed.infrastructure.elasticsearch;

import jakarta.persistence.GeneratedValue;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "feeds")  // 인덱스 이름 지정
public class FeedDocument {

    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String content;
    private String imageUrl;
    private String address;
    private Double longitude;
    private Double latitude;
    private Long userId;
    private int likeCount;
}