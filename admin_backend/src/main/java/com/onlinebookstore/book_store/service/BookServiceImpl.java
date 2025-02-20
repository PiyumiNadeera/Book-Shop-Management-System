package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.*;
import com.onlinebookstore.book_store.payloads.requests.BookRequests;
import com.onlinebookstore.book_store.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private PublisherRepository publisherRepository;
    @Autowired
    private DiscountRepository discountRepository;

    @Override
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Long id){
        return bookRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Book addBook(BookRequests bookRequests){
        Author author;
        Category category;
        Publisher publisher;
        Discount discount;

        if(bookRequests.getNewAuthor()!=null){
            author = authorRepository.save(bookRequests.getNewAuthor());
        }else if(bookRequests.getAuthor()!=null){
            author = authorRepository.findById(bookRequests.getAuthor()).orElse(null);
        }else{
            return null;
        }

        if(bookRequests.getNewCategory()!=null){
            category = categoryRepository.save(bookRequests.getNewCategory());
        }else if(bookRequests.getCategory()!=null){
            category = categoryRepository.findById(bookRequests.getCategory()).orElse(null);
        }else{
            return null;
        }

        if(bookRequests.getNewPublisher()!=null){
            publisher = publisherRepository.save(bookRequests.getNewPublisher());
        }else if(bookRequests.getPublisher()!=null){
            publisher = publisherRepository.findById(bookRequests.getPublisher()).orElse(null);
        }else {
            return null;
        }

        if(bookRequests.getNewDiscount()!=null){
            discount = discountRepository.save(bookRequests.getNewDiscount());
        }else if(bookRequests.getDiscount()!=null){
            discount = discountRepository.findById(bookRequests.getDiscount()).orElse(null);
        }else{
            return null;
        }

        Book book = new Book();
        book.setBookName(bookRequests.getBookName());
        book.setBookImage(bookRequests.getBookImage());
        book.setStockCount(bookRequests.getStockCount());
        book.setPrice(bookRequests.getPrice());
        book.setAuthor(author);
        book.setCategory(category);
        book.setPublisher(publisher);
        book.setDiscount(discount);


        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(Long id, BookRequests bookRequests){
        try{
            Book existingBook = bookRepository.findById(id).orElseThrow(null);

            if(existingBook != null){
                existingBook.setBookName(bookRequests.getBookName());

                Author author = authorRepository.findById(bookRequests.getAuthor()).orElse(null);
                existingBook.setAuthor(author);

                Category category = categoryRepository.findById(bookRequests.getCategory()).orElse(null);
                existingBook.setCategory(category);

                existingBook.setStockCount(bookRequests.getStockCount());

                Discount discount = discountRepository.findById(bookRequests.getDiscount()).orElse(null);
                existingBook.setDiscount(discount);

                Publisher publisher = publisherRepository.findById(bookRequests.getPublisher()).orElse(null);
                existingBook.setPublisher(publisher);

                existingBook.setPrice(bookRequests.getPrice());
                existingBook.setBookImage(bookRequests.getBookImage());
                return bookRepository.save(existingBook);
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public void deleteBook(Long id) {
        Book existingBook = bookRepository.findById(id).orElseThrow(null);
        if (existingBook != null) {
            bookRepository.delete(existingBook);
        }
    }

}
