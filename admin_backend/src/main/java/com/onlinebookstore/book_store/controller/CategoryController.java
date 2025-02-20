package com.onlinebookstore.book_store.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlinebookstore.book_store.entity.Category;
import com.onlinebookstore.book_store.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> findAllCategories(){
        try{
            List<Category> categories = categoryService.getAllCategories();
            return new ResponseEntity<>(categories, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> findCategoryById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(categoryService.getCategoryById(id),HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/images/categories/{imageName}")
    public ResponseEntity<UrlResource> getImage(@PathVariable String imageName){
        try{
            Path filepath = Paths.get("images/categories").resolve(imageName).normalize();
            UrlResource resource = new UrlResource(filepath.toUri());

            if(resource.exists()){
                return new ResponseEntity<>(resource, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {

            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/categories")
    public ResponseEntity<Void> addCategory(@RequestParam("categoryName") String categoryName, @RequestParam("categoryImage")MultipartFile categoryImage){
        try{
            Category categoryDetails = new Category();
            categoryDetails.setCategoryName(categoryName);

            if(categoryImage != null){
                String uploadDir ="images/categories";
                String fileName = categoryImage.getOriginalFilename();
                Path path = Paths.get(uploadDir,fileName);
                Files.createDirectories(path.getParent());
                Files.write(path,categoryImage.getBytes());
                String imageUrl = "http://localhost:8080/"+uploadDir+"/"+fileName;
                categoryDetails.setCategoryImage(imageUrl);
            }

           categoryService.addCategory(categoryDetails);
           return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Void> updateCategory(@PathVariable Long id,@RequestParam(value = "categoryName") String categoryName, @RequestParam(value = "categoryImage",required = false)MultipartFile categoryImage){
        try{
            Category existingCategory = categoryService.getCategoryById(id);
            existingCategory.setCategoryName(categoryName);

            if(categoryImage != null  && !categoryImage.isEmpty()){
                String uploadDir ="images/categories";
                String fileName = categoryImage.getOriginalFilename();
                Path path = Paths.get(uploadDir,fileName);
                Files.createDirectories(path.getParent());
                Files.write(path,categoryImage.getBytes());
                String imageUrl = "http://localhost:8080/"+uploadDir+"/"+fileName;
                existingCategory.setCategoryImage(imageUrl);
            }

            categoryService.updateCategory(id,existingCategory);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id){
        try{
            categoryService.deleteCategory(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
