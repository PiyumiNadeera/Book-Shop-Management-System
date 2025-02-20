package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Author;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AuthorService {

    List<Author> getAllAuthors();
    Author getAuthorById(Long id);
    Author addAuthor(Author author);
    void updateAuthor(Long id, Author author);
    void deleteAuthor(Long id);

}
