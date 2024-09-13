package com.ssafy.handam.user.domain.model.entity;

import com.ssafy.handam.user.domain.model.valueobject.Gender;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String birth;
    private Gender gender;
    private String residence;
    private String introduction;
    private double accompanyTemperature;


    @Builder
    public User(Long id, String username, String birth, Gender gender, String residence,
                 String introduction, double accompanyTemperature) {
        this.id = id;
        this.username = username;
        this.birth = birth;
        this.gender = gender;
        this.residence = residence;
        this.introduction = introduction;
        this.accompanyTemperature = accompanyTemperature;
    }





}