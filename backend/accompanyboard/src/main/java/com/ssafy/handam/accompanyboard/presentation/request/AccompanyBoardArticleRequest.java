package com.ssafy.handam.accompanyboard.presentation.request;

public record AccompanyBoardArticleRequest (
        Long user_id,
        Long schedule_id,
        String title,
        String description) {
    public static AccompanyBoardArticleRequest of(
            Long user_id,
            Long scheule_id,
            String title,
            String description) {
        return new AccompanyBoardArticleRequest(
                user_id,
                scheule_id,
                title,
                description);
    }
}
