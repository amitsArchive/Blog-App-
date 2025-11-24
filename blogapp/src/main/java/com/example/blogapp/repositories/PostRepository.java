package com.example.blogapp.repositories;

import com.example.blogapp.domain.PostStatus;
import com.example.blogapp.domain.entities.Category;
import com.example.blogapp.domain.entities.Post;
import com.example.blogapp.domain.entities.Tag;
import com.example.blogapp.domain.entities.User;
import com.example.blogapp.services.PostService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findAllByStatusAndCategoryAndTagsContaining(PostStatus status, Category category, Tag tag);
    List<Post> findAllByStatusAndCategory(PostStatus status, Category category);
    List<Post> findAllByStatusAndTagsContaining(PostStatus status, Tag tag);
    List<Post> findAllByStatus(PostStatus status);
    List<Post> findAllByAuthorAndStatus(User author, PostStatus status);
}
