package com.example.blogapp.mappers;

import com.example.blogapp.domain.CreatePostRequest;
import com.example.blogapp.domain.UpdatePostRequest;
import com.example.blogapp.domain.dtos.CreatePostRequestDto;
import com.example.blogapp.domain.dtos.PostDto;
import com.example.blogapp.domain.dtos.UpdatePostRequestDto;
import com.example.blogapp.domain.entities.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {

    @Mapping(target = "author", source = "author")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "tags", source = "tags")
    @Mapping(target = "status", source = "status")
    PostDto toDto(Post post);

    CreatePostRequest toCreatePostRequest(CreatePostRequestDto dto);

    UpdatePostRequest toUpdatePostRequest(UpdatePostRequestDto dto);

}
