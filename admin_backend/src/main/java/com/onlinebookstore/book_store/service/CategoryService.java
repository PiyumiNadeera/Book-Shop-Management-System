package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {

    List<Category> getAllCategories();
    Category getCategoryById(Long id);
    void addCategory(Category category);
    void updateCategory(Long id, Category category);
    void deleteCategory(Long id);

}
