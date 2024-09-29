package com.ssafy.handam.user.domain.model.entity;

import com.ssafy.handam.user.domain.model.valueobject.Gender;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "`user`")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;
    private LocalDate birth;
    private Gender gender;
    private String residence;
    private String introduction;
    private double accompanyTemperature;

    @OneToMany(mappedBy = "follower")
    private Set<Follow> following;

    @OneToMany(mappedBy = "following")
    private Set<Follow> followers;


    @Builder
    private User(String nickname, LocalDate birth, Gender gender, String residence,
                 String introduction, double accompanyTemperature) {
        this.nickname = nickname;
        this.birth = birth;
        this.gender = gender;
        this.residence = residence;
        this.introduction = introduction;
        this.accompanyTemperature = accompanyTemperature;
    }

    public void setId(Long id) {
        this.id = id;
    }

}