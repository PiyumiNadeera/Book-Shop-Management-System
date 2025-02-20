package com.onlinebookstore.book_store.payloads.requests;

import com.onlinebookstore.book_store.entity.Author;
import com.onlinebookstore.book_store.entity.Category;
import com.onlinebookstore.book_store.entity.Discount;
import com.onlinebookstore.book_store.entity.Publisher;
import lombok.Data;

@Data
public class BookRequests {

    private String bookName;
    private String bookImage;
    private int stockCount;
    private float price;
    private Long discount;
    private Long author;
    private Long publisher;
    private Long category;
    private Author newAuthor;
    private Publisher newPublisher;
    private Category newCategory;
    private Discount newDiscount;
}
