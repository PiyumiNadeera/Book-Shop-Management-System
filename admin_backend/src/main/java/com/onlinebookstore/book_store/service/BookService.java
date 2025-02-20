package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Book;
import com.onlinebookstore.book_store.payloads.requests.BookRequests;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {

    List<Book> getAllBooks();
    Book getBookById(Long id);
    Book addBook(BookRequests bookRequests);
    Book updateBook(Long id, BookRequests book);
    void deleteBook(Long id);
}
