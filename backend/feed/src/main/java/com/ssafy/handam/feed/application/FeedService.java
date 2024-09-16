package com.ssafy.handam.feed.application;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.application.dto.request.feed.BestFeedsForUserServiceRequest;
import com.ssafy.handam.feed.domain.repository.FeedRepository;
import com.ssafy.handam.feed.presentation.response.feed.BestFeedsForUserResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;

    public BestFeedsForUserResponse getBestFeedsForUser(BestFeedsForUserServiceRequest request) {
        //TODO: Implement business logic
        List<FeedPreviewDto> previewDtos = feedRepository.findAll().stream()
                .map(FeedPreviewDto::from)
                .collect(Collectors.toList());

        return BestFeedsForUserResponse.of(previewDtos);
    }
}
