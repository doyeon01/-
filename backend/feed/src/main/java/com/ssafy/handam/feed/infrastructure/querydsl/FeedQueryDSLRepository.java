package com.ssafy.handam.feed.infrastructure.querydsl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.handam.feed.application.dto.request.feed.FeedsByFiltersServiceRequest;
import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.entity.QFeed;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class FeedQueryDSLRepository {

    private final JPAQueryFactory queryFactory;
    private final QFeed feed = QFeed.feed;

    // 검색 기능 구현
    public List<Feed> searchFeedsByFilters(FeedsByFiltersServiceRequest request) {
        return queryFactory.selectFrom(feed)
                .where(
                        placeTypeEq(request.type()),
//                        ageRangeEq(request.ageRange()),
//                        genderEq(request.gender()),
                        keywordContains(request.keyword()),
                        locationWithinDistance(request.latitude(), request.longitude(), request.sortBy())
                )
                .orderBy(getSortBy(request.sortBy(), request.latitude(), request.longitude()))
                .fetch();
    }

    // 필터 조건들
    private BooleanExpression placeTypeEq(String placeType) {
        return placeType != null ? feed.placeType.eq(PlaceType.valueOf(placeType)) : null;
    }

//    private BooleanExpression ageRangeEq(int ageRange) {
//        return ageRange > 0 ? feed.ageRange.eq(ageRange) : null;
//    }

//    private BooleanExpression genderEq(String gender) {
//        return gender != null ? feed.gender.eq(gender) : null;
//    }

    private BooleanExpression keywordContains(String keyword) {
        if (keyword == null) {
            return null;
        }

        return feed.title.containsIgnoreCase(keyword)
                .or(feed.content.containsIgnoreCase(keyword));
    }

    private BooleanExpression locationWithinDistance(Double latitude, Double longitude, List<String> sortBy) {
        if (latitude != null && longitude != null && sortBy.contains("distance")) {
            double R = 6371;
            double distanceLimit = 30.0;

            NumberExpression<Double> latDiff = Expressions.numberTemplate(Double.class, "({0} - {1})", feed.latitude,
                    latitude);
            NumberExpression<Double> lonDiff = Expressions.numberTemplate(Double.class, "({0} - {1})", feed.longitude,
                    longitude);

            return latDiff.multiply(latDiff)
                    .add(lonDiff.multiply(lonDiff))
                    .loe((distanceLimit / R) * (distanceLimit / R));
        }
        return null;
    }


    private OrderSpecifier<?> getSortBy(List<String> sortBy, Double latitude, Double longitude) {
        if (sortBy == null || sortBy.isEmpty()) {
            return feed.createdDate.desc();
        }

        for (String sort : sortBy) {
            if (sort.equals("distance") && latitude != null && longitude != null) {
                return feed.latitude.subtract(latitude).multiply(feed.latitude.subtract(latitude))
                        .add(feed.longitude.subtract(longitude).multiply(feed.longitude.subtract(longitude)))
                        .asc();
            }
        }

        return feed.likeCount.desc();
    }
}
