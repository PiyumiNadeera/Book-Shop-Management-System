package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Category;
import com.onlinebookstore.book_store.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id){
        return categoryRepository.findById(id).orElseThrow(null);
    }

    @Override
    public void addCategory(Category category){
        categoryRepository.save(category);
    }

    @Override
    public void updateCategory(Long id,Category category){
        Category existingCategory = categoryRepository.findById(id).orElseThrow(null);
        if(existingCategory !=null){
            existingCategory.setCategoryName(category.getCategoryName());
            existingCategory.setCategoryImage(category.getCategoryImage());
            categoryRepository.save(existingCategory);
        }
    }

    @Override
    public void deleteCategory(Long id){
        Category existingCategory = categoryRepository.findById(id).orElseThrow(null);

        if(existingCategory !=null){
            categoryRepository.deleteById(id);
        }
    }
}
