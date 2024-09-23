package com.ssafy.handam.feed.application;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.application.dto.request.feed.FeedsByFiltersServiceRequest;
import com.ssafy.handam.feed.application.dto.request.feed.RecommendedFeedsForUserServiceRequest;
import com.ssafy.handam.feed.common.error.place.PlaceNotFoundException;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.entity.Place;
import com.ssafy.handam.feed.domain.repository.jpa.FeedJpaRepository;
import com.ssafy.handam.feed.domain.repository.jpa.PlaceJpaRepository;
import com.ssafy.handam.feed.domain.valueobject.Address;
import com.ssafy.handam.feed.infrastructure.client.UserApiClient;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import com.ssafy.handam.feed.presentation.response.feed.FeedResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedsByFiltersResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import com.ssafy.handam.feed.presentation.response.place.PlaceDetailResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedService {

    private final FeedJpaRepository feedJpaRepository;
    private final PlaceJpaRepository placeJpaRepository;
    private final UserApiClient userApiClient;

    public PlaceDetailResponse getPlaceDetail(Long id) {
        return PlaceDetailResponse.of(findPlaceById(id));
    }

    private Place findPlaceById(Long id) {
        return placeJpaRepository.findById(id).orElseThrow(() -> new PlaceNotFoundException(id));
    }

    public RecommendedFeedsForUserResponse getBestFeedsForUser(RecommendedFeedsForUserServiceRequest request) {
        //TODO: Implement this method
        List<FeedPreviewDto> previewDtos = feedJpaRepository.findAll().stream()
                .map(feed -> {
                    UserDto userDto = userApiClient.getUserById(feed.getUserId().toString());

                    Address address = feed.getPlace().getAddress();

                    return FeedPreviewDto.from(feed, address, userDto.name(), userDto.profileImageUrl());
                })
                .collect(Collectors.toList());

        return RecommendedFeedsForUserResponse.of(previewDtos);
    }


    public FeedsByFiltersResponse getFeedsByFilters(FeedsByFiltersServiceRequest request) {
        //TODO: Implement this method
        List<FeedPreviewDto> previewDtos = feedJpaRepository.findAll().stream()
                .map(feed -> {
                    UserDto userDto = userApiClient.getUserById(feed.getUserId().toString());

                    Address address = feed.getPlace().getAddress();

                    return FeedPreviewDto.from(feed, address, userDto.name(), userDto.profileImageUrl());
                })
                .collect(Collectors.toList());

        return FeedsByFiltersResponse.of(previewDtos);
    }


    public FeedResponse getFeedDetails(Long feedId) {
        return null;
    }

    public FeedResponse createFeed(FeedCreationServiceRequest request) {

        Place place = getOrCreatePlace(request);
        Feed newFeed = Feed.createFeed(request, place);

        feedJpaRepository.save(newFeed);

        return new FeedResponse(
                newFeed.getId(),
                newFeed.getTitle(),
                newFeed.getContent(),
                newFeed.getImageUrl(),
                place.getAddress().getAddress(),
                place.getAddress().getLongitude(),
                place.getAddress().getLatitude(),
                place.getPlaceType().name(),
                newFeed.getUserId()
                );
    }

    private Place getOrCreatePlace(FeedCreationServiceRequest request) {
        return placeJpaRepository.findByAddress(request.address().getAddress())
                .orElseGet(() -> Place.createPlace(request));
    }
}
