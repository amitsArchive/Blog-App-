package com.example.blogapp.mappers;

import com.example.blogapp.domain.PostStatus;
import com.example.blogapp.domain.dtos.CategoryDto;
import com.example.blogapp.domain.dtos.CreateCategoryRequest;
import com.example.blogapp.domain.entities.Category;
import com.example.blogapp.domain.entities.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {

    @Mapping(target = "postCount", source = "posts", qualifiedByName = "calculatePostcount")
    CategoryDto toDto(Category category);
    Category toEntity(CreateCategoryRequest createCategoryRequest);
    @Named("calculatePostcount")
    default long calculatePostcount(List<Post> posts){
        if(posts==null){
            return 0;
        }
        return posts.stream()
                .filter(post -> PostStatus.PUBLISHED.equals(post.getStatus()))
                .count();
    }
}
