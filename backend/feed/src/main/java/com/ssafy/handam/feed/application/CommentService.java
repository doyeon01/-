package com.ssafy.handam.feed.application;


import com.ssafy.handam.feed.application.dto.CommentDto;
import com.ssafy.handam.feed.application.dto.request.comment.CreateCommentServiceRequest;
import com.ssafy.handam.feed.application.dto.response.comment.CreateCommentServiceResponse;
import com.ssafy.handam.feed.domain.dto.request.comment.CreateCommentDomainRequest;
import com.ssafy.handam.feed.domain.service.CommentDomainService;
import com.ssafy.handam.feed.infrastructure.client.UserApiClient;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import com.ssafy.handam.feed.presentation.response.comment.CreateCommentResponse;
import com.ssafy.handam.feed.presentation.response.feed.CommentsResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentDomainService commentDomainService;
    private final UserApiClient userService;

    public CreateCommentResponse save(CreateCommentServiceRequest request) {
        CreateCommentServiceResponse response = commentDomainService.save(CreateCommentDomainRequest.from(request));
        return CreateCommentResponse.from(response);
    }

    public CommentsResponse findAllByFeedId(Long feedId , String accessToken) {
        List<CommentDto> commentDtos = commentDomainService.findAllByFeedId(feedId).stream()
                .map(comment -> {
                    UserDto userDetailDto = userService.getUserById(comment.getUserId() , accessToken);
                    return CommentDto.of(comment, userDetailDto);
                })
                .toList();

        return CommentsResponse.of(commentDtos);
    }
}
