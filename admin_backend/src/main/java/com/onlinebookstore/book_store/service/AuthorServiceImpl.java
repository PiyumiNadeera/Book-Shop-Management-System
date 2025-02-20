package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Author;
import com.onlinebookstore.book_store.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService{

    @Autowired
    private AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository ) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Author getAuthorById(Long id) {
        return authorRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Author addAuthor(Author author) {
        return authorRepository.save(author);
    }

    @Override
    public void updateAuthor(Long id, Author author) {
        Author existingAuthor = authorRepository.findById(id).orElseThrow(null);
        if (existingAuthor != null) {
            existingAuthor.setAuthorName(author.getAuthorName());
            existingAuthor.setBio(author.getBio());
            authorRepository.save(existingAuthor);
        }

    }

    @Override
    public void deleteAuthor(Long id) {
        Author existingAuthor = authorRepository.findById(id).orElseThrow(null);
        if (existingAuthor != null) {
            authorRepository.delete(existingAuthor);
        }
    }
}
