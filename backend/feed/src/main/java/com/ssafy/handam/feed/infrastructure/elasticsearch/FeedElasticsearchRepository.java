package com.ssafy.handam.feed.infrastructure.elasticsearch;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedElasticsearchRepository extends ElasticsearchRepository<FeedDocument, Long> {
    
    Page<FeedDocument> findByTitleContainingOrContentContainingOrAddress1ContainingOrAddress2Containing(
            String title, String content, String address1, String address2, Pageable pageable);
}
