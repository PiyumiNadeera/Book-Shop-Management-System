package com.onlinebookstore.book_store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name="discounts")
@Data
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long discountId;

    @Column(nullable = false)
    private String discountType;

    @Column(nullable = false)
    private float discountValue;

    @Column(nullable = false)
    private Date discountStartDate;

    @Column(nullable = false)
    private Date discountEndDate;

    @OneToMany(mappedBy = "discount")
    @JsonIgnore
    private List<Book> books;





}
