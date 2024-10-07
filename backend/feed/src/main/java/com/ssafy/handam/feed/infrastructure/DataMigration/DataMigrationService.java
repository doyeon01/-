package com.ssafy.handam.feed.infrastructure.DataMigration;

import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.infrastructure.client.UserApiClient;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
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
    private final UserApiClient userApiClient;

    public void migrateData() {
        List<Feed> feeds = feedRepository.findAll();

        feeds.forEach(feed -> {
            // User 정보를 UserApiClient를 통해 가져옴
            UserDto userDto = userApiClient.getUserById(feed.getUserId(),"token");

            // FeedDocument에 User 정보 추가하여 저장
            FeedDocument document = FeedDocument.from(feed, userDto);
            feedElasticsearchRepository.save(document);
        });
    }
}
