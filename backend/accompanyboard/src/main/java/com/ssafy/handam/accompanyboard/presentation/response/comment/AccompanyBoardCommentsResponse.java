package com.ssafy.handam.accompanyboard.presentation.response.comment;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardCommentDto;
import java.util.List;

public record AccompanyBoardCommentsResponse(List<AccompanyBoardCommentDto> comments) {
    public static AccompanyBoardCommentsResponse of(List<AccompanyBoardCommentDto> comments) {
        return new AccompanyBoardCommentsResponse(comments);
    }
}
