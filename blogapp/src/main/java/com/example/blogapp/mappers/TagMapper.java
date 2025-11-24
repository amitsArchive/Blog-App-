package com.example.blogapp.mappers;

import com.example.blogapp.domain.PostStatus;
import com.example.blogapp.domain.dtos.TagResponse;
import com.example.blogapp.domain.entities.Post;
import com.example.blogapp.domain.entities.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.Set;

@Mapper(componentModel = "spring",unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface TagMapper {
    @Mapping(target = "postCount", source = "posts", qualifiedByName = "calculatePostcount")
    TagResponse toTagResponse(Tag tag);

    @Named("calculatePostcount")
    default long calculatePostcount(Set<Post> posts){
         if(posts==null){
             return 0;
         }
         return posts.stream()
                 .filter(post-> PostStatus.PUBLISHED.equals(post.getStatus()))
                 .count();
    }
}
