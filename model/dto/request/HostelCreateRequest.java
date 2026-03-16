package com.example.rentnest.model.dto.request;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HostelCreateRequest {
    private String name;
    private String addressDetail;
    private String wardCode;
    private String ward; //ten phuong
    private String districtCode; //ma quan huyen
    private String district;
    private String cityCode; //ma thanh pho, tinh
    private String city;
    private String description;
}
