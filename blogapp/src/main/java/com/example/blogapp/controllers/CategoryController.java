package com.example.blogapp.controllers;

import com.example.blogapp.domain.PostStatus;
import com.example.blogapp.domain.dtos.CategoryDto;
import com.example.blogapp.domain.dtos.CreateCategoryRequest;
import com.example.blogapp.domain.entities.Category;
import com.example.blogapp.mappers.CategoryMapper;
import com.example.blogapp.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    private final CategoryMapper categoryMapper;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> listCategories(){
        List<Category> categories=categoryService.listCategories();
        List<CategoryDto> categoryDto=categories.stream()
                .map(categoryMapper::toDto).toList();
        return new ResponseEntity<>(categoryDto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(
            @Valid @RequestBody CreateCategoryRequest createCategoryRequest){
        Category categoryToCreate = categoryMapper.toEntity(createCategoryRequest);
        Category savedCategory=categoryService.createCategory(categoryToCreate);
        return new ResponseEntity<>(
                categoryMapper.toDto(savedCategory),
                HttpStatus.CREATED
        );
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable UUID id){
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
