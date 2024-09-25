package com.ssafy.handam.feed.infrastructure.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedElasticsearchRepository extends ElasticsearchRepository<FeedDocument, Long> {
}
