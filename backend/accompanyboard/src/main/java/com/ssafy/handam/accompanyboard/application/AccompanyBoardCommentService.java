package com.ssafy.handam.accompanyboard.application;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardCommentDto;
import com.ssafy.handam.accompanyboard.application.dto.UserDetailDto;
import com.ssafy.handam.accompanyboard.domain.entity.Comment;
import com.ssafy.handam.accompanyboard.domain.service.AccompanyBoardCommentDomainService;
import com.ssafy.handam.accompanyboard.infrastructure.client.UserApiClient;
import com.ssafy.handam.accompanyboard.presentation.request.comment.AccompanyBoardCommentCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.comment.AccompanyBoardCommentResponse;
import com.ssafy.handam.accompanyboard.presentation.response.comment.AccompanyBoardCommentsResponse;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AccompanyBoardCommentService {

    private final AccompanyBoardCommentDomainService accompanyBoardCommentDomainService;
    private final UserApiClient userApiClient;

    public AccompanyBoardCommentResponse createComment(AccompanyBoardCommentCreationRequest request) {

        Comment comment = accompanyBoardCommentDomainService.createComment(request);
        UserDetailDto userDetailDto = getUserDetailDto(comment.getUserId());

        return AccompanyBoardCommentResponse.of(AccompanyBoardCommentDto.from(comment, userDetailDto));
    }

    public AccompanyBoardCommentsResponse getCommentsByAccompanyBoardArticleId(Long accompanyBoardArticleId) {
        List<AccompanyBoardCommentDto> comments = getAccompanyBoardCommentsDtoList(
                accompanyBoardCommentDomainService.getCommentsByAccompanyBoardArticleId(accompanyBoardArticleId));
        return AccompanyBoardCommentsResponse.of(comments);
    }

    public List<AccompanyBoardCommentDto> getAccompanyBoardCommentsDtoList(List<Comment> comments) {
        return comments.stream()
                .map(comment -> {
                    UserDetailDto userDetailDto = getUserDetailDto(comment.getUserId());
                    return AccompanyBoardCommentDto.from(comment, userDetailDto);
                })
                .toList();
    }

    private UserDetailDto getUserDetailDto(Long userId) {
        return UserDetailDto.from(userApiClient.getUserById(userId));
    }
}
