package com.ssafy.handam.feed.infrastructure.DataMigration;

import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedDocument;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedElasticsearchRepository;
import com.ssafy.handam.feed.infrastructure.jpa.FeedJpaRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DataMigrationService {

    private final FeedJpaRepository feedRepository;
    private final FeedElasticsearchRepository feedElasticsearchRepository;

    public void migrateData() {
        List<Feed> feeds = feedRepository.findAll();

        feeds.forEach(feed -> {
            FeedDocument document = FeedDocument.from(feed);
            feedElasticsearchRepository.save(document);
        });
    }
}
