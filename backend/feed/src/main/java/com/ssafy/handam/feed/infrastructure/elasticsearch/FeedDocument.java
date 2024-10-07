package com.ssafy.handam.feed.infrastructure.elasticsearch;

import com.ssafy.handam.feed.domain.entity.Feed;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

@Data
@Builder
@AllArgsConstructor
@Document(indexName = "feed")
public class FeedDocument {

    @Id
    private Long id;

    @Field(type = FieldType.Text)
    private String placeName;

    @Field(type = FieldType.Long)
    private Long totalPlanId;

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

    @Field(type = FieldType.Integer)
    private int commentCount;

    @Field(type = FieldType.Text)
    private String address1;

    @Field(type = FieldType.Text)
    private String address2;

    @Field(type = FieldType.Double)
    private double longitude;

    @Field(type = FieldType.Double)
    private double latitude;

    @Field(type = FieldType.Date)
    private LocalDate createdDate;

    @Field(type = FieldType.Keyword)
    private String placeType;

    @Field(type = FieldType.Object)
    private GeoPoint location;

    public static FeedDocument from(Feed feed) {
        return FeedDocument.builder()
                .id(feed.getId())
                .placeName(feed.getPlaceName())
                .totalPlanId(feed.getTotalPlanId())
                .userId(feed.getUserId())
                .title(feed.getTitle())
                .content(feed.getContent())
                .imageUrl(feed.getImageUrl())
                .likeCount(feed.getLikeCount())
                .commentCount(feed.getCommentCount())
                .address1(feed.getAddress1())
                .address2(feed.getAddress2())
                .latitude(feed.getLatitude())
                .longitude(feed.getLongitude())
                .location(new GeoPoint(feed.getLatitude(), feed.getLongitude()))
                .placeType(feed.getPlaceType().name())
                .createdDate(feed.getCreatedDate().toLocalDate())
                .build();
    }
}
