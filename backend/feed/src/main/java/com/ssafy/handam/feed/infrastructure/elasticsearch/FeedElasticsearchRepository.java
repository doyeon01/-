package com.ssafy.handam.feed.infrastructure.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.stereotype.Repository;

public interface FeedElasticsearchRepository extends ElasticsearchRepository<FeedDocument, Long> {
}
