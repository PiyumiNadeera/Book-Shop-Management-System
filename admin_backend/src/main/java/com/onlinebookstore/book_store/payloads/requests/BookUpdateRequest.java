package com.onlinebookstore.book_store.payloads.requests;

import com.onlinebookstore.book_store.entity.Author;
import com.onlinebookstore.book_store.entity.Category;
import com.onlinebookstore.book_store.entity.Discount;
import com.onlinebookstore.book_store.entity.Publisher;
import lombok.Data;

@Data
public class BookUpdateRequest {

    private Long bookId;
    private String bookName;
    private String bookImage;
    private int stockCount;
    private float price;
    private Discount discount;
    private Author author;
    private Publisher publisher;
    private Category category;

}
