package com.example.blogapp.domain.dtos;

import lombok.*;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryDto {
    private UUID id;
    private String name;
    private long postCount;
}
