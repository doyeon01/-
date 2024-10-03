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


}
