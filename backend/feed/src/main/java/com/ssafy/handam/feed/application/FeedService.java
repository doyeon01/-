package com.ssafy.handam.feed.application;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.application.dto.request.feed.FeedsByFiltersServiceRequest;
import com.ssafy.handam.feed.application.dto.request.feed.RecommendedFeedsForUserServiceRequest;
import com.ssafy.handam.feed.domain.repository.FeedRepository;
import com.ssafy.handam.feed.presentation.response.feed.FeedsByFiltersResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;

    public RecommendedFeedsForUserResponse getBestFeedsForUser(RecommendedFeedsForUserServiceRequest request) {
        //TODO: Implement business logic
        List<FeedPreviewDto> previewDtos = feedRepository.findAll().stream()
                .map(FeedPreviewDto::from)
                .collect(Collectors.toList());

        return RecommendedFeedsForUserResponse.of(previewDtos);
    }

    public FeedsByFiltersResponse getFeedsByFilters(FeedsByFiltersServiceRequest request) {
        //TODO: Implement business logic
        List<FeedPreviewDto> previewDtos = feedRepository.findAll().stream()
                .map(FeedPreviewDto::from)
                .collect(Collectors.toList());

        return FeedsByFiltersResponse.of(previewDtos);
    }
}
