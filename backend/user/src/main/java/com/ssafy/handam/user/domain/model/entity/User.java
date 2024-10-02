package com.ssafy.handam.user.domain.model.entity;

import com.ssafy.handam.user.domain.model.valueobject.Gender;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.MonthDay;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "`user`")
public class User extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 255)
    private String email;

    private String name;
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String age;
    private String profileImage;
    private String travelStyl1;
    private String travelStyl2;
    private String travelStyl3;
    private String travelStyl4;
    private String residence;
    private String introduction;
    private double accompanyTemperature;


    @OneToMany(mappedBy = "follower")
    private Set<Follow> following;

    @OneToMany(mappedBy = "following")
    private Set<Follow> followers;


    @Builder
    private User(String email,
                 String name,
                 Gender gender,
                 String age,
                 String profileImage) {
        this.email = email;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.profileImage = profileImage;
        this.accompanyTemperature = 36.5;
    }

    public void updateUser(String nickname,
                           String residence,
                           String introduction,
                           String travelStyl1,
                           String travelStyl2,
                           String travelStyl3,
                           String travelStyl4) {
        this.nickname = nickname;
        this.residence = residence;
        this.introduction = introduction;
        this.travelStyl1 = travelStyl1;
        this.travelStyl2 = travelStyl2;
        this.travelStyl3 = travelStyl3;
        this.travelStyl4 = travelStyl4;
    }


}