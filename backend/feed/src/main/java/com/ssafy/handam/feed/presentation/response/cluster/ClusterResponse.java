package com.ssafy.handam.feed.presentation.response.cluster;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClusterResponse {
    private String clusterId;
    private double latitude;
    private double longitude;
    private List<FeedPreviewDto> feeds;
}
