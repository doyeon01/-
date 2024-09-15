package com.ssafy.handam.user.domain.model.entity;

import com.ssafy.handam.user.domain.model.valueobject.Gender;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
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


    @Builder
    private User(Long id, String nickname, LocalDate birth, Gender gender, String residence,
                 String introduction, double accompanyTemperature) {
        this.nickname = nickname;
        this.birth = birth;
        this.gender = gender;
        this.residence = residence;
        this.introduction = introduction;
        this.accompanyTemperature = accompanyTemperature;
    }





}