package com.ssafy.handam.feed.infrastructure.elasticsearch;

import com.ssafy.handam.feed.domain.entity.Feed;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@Builder
@AllArgsConstructor
@Document(indexName = "feed")
public class FeedDocument {

    @Id
    private Long id;

    @Field(type = FieldType.Long)
    private Long userId;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Text)
    private String imageUrl;

    @Field(type = FieldType.Integer)
    private int likeCount;

    @Field(type = FieldType.Text)
    private String address1;

    @Field(type = FieldType.Text)
    private String address2;

    @Field(type = FieldType.Double)
    private Double longitude;

    @Field(type = FieldType.Double)
    private Double latitude;

    @Field(type = FieldType.Keyword)
    private String placeType;

    public static FeedDocument from(Feed feed) {
        return FeedDocument.builder()
                .id(feed.getId())
                .userId(feed.getUserId())
                .title(feed.getTitle())
                .content(feed.getContent())
                .imageUrl(feed.getImageUrl())
                .likeCount(feed.getLikeCount())
                .address1(feed.getAddress1())
                .address2(feed.getAddress2())
                .longitude(feed.getLongitude())
                .latitude(feed.getLatitude())
                .placeType(feed.getPlaceType().name())
                .build();
    }
}
