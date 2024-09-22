package com.ssafy.handam.feed.domain.valueobject;

import jakarta.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
public class Address {

    private String address;
    private Double longitude;
    private Double latitude;

    protected Address() {}

    public Address(String address, Double longitude, Double latitude) {
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}
