package com.ssafy.handam.user.domain.model.entity;

import com.ssafy.handam.user.domain.model.valueobject.FollowStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Follow extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id")
    private User follower;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id")
    private User following;

    @Enumerated(EnumType.STRING)
    private FollowStatus status;

    public Follow(User follower, User following, FollowStatus status) {
        this.follower = follower;
        this.following = following;
        this.status = status;
    }
    public void unfollow() {
        this.status = FollowStatus.UNFOLLOWED;
    }

}
