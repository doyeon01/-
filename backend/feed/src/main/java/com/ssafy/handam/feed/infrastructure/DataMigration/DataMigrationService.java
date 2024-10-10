package com.ssafy.handam.feed.infrastructure.DataMigration;

import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.infrastructure.client.UserApiClient;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedDocument;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedElasticsearchRepository;
import com.ssafy.handam.feed.infrastructure.jpa.FeedJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DataMigrationService {

    private final FeedJpaRepository feedRepository;
    private final FeedElasticsearchRepository feedElasticsearchRepository;
    private final UserApiClient userApiClient;

    public void migrateData() {
        int page = 0;
        int pageSize = 1000;  // 한 번에 100개씩 처리

        Page<Feed> feedPage;

        do {
            Pageable pageable = PageRequest.of(page, pageSize);
            feedPage = feedRepository.findAll(pageable);

            feedPage.forEach(feed -> {
                UserDto userDto = userApiClient.getUserById(feed.getUserId(), "token");
                FeedDocument document = FeedDocument.from(feed, userDto);
                feedElasticsearchRepository.save(document);
            });

            page++;
        } while (feedPage.hasNext());
    }
}
