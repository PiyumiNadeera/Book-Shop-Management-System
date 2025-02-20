package com.onlinebookstore.book_store.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.File;

@Entity
@Table(name = "books")
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column(nullable = false)
    private String bookName;

    private String bookImage;

    @Column(nullable = false)
    private int stockCount;

    @Column(nullable = false)
    private float price;

    @ManyToOne
    @JoinColumn(name = "discountId",nullable = true)
    private Discount discount;

    @ManyToOne
    @JoinColumn(name = "authorId", nullable = false)
    private Author author;

    @ManyToOne
    @JoinColumn(name = "publisherId",nullable = false)
    private Publisher publisher;

    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private Category category;


}
