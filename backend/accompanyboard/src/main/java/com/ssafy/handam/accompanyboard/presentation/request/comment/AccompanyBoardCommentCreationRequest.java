package com.ssafy.handam.accompanyboard.presentation.request.comment;


public record AccompanyBoardCommentCreationRequest(
        Long userId,
        Long accompanyBoardArticleId,
        String content
) {
    public static AccompanyBoardCommentCreationRequest toServiceRequest(AccompanyBoardCommentCreationRequest request) {
        return new AccompanyBoardCommentCreationRequest(request.userId(), request.accompanyBoardArticleId(), request.content());
    }
}
