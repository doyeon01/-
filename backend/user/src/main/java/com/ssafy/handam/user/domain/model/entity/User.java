package com.ssafy.handam.user.domain.model.entity;

import com.ssafy.handam.user.domain.model.valueobject.Gender;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String birth;
    private Gender gender;
    private String residence;

    public User() {}

    public User(String username, String email, Gender gender, String residence) {
        this.username = username;
        this.birth = birth;
        this.gender = gender;
        this.residence = residence;
    }
}