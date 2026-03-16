package com.example.rentnest.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoomCreateRequest {
    private Long hostelId;
    private String roomName;
    private BigDecimal basePrice;
    private Double area;
    private Integer floor;
    private Integer bathCount;
    private String bedType;
    private String status;
}
