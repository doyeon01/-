package com.ssafy.handam.feed.domain.entity;

import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.valueobject.Address;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.core.index.AliasAction.Add;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Place extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String imageUrl;

    @Embedded
    private Address address;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Feed> feeds = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private PlaceType placeType;

    @Builder
    private Place(
            String name,
            String imageUrl,
            Address address,
            List<Feed> feeds,
            PlaceType placeType
    ) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.address = address;
        this.feeds = feeds;
        this.placeType = placeType;
    }

    public void addFeed(Feed feed) {
        feeds.add(feed);
        feed.assignToPlace(this);
    }

    public static Place createPlace(FeedCreationServiceRequest request) {
        return Place.builder()
                .name(request.title())
                .imageUrl(request.feedImageUrl())
                .address(request.address())
                .placeType(request.placeType())
                .build();
    }
}