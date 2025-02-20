package com.onlinebookstore.book_store.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private float price;
    private String status;
    private Date orderDate;

    @ManyToOne
    @JoinColumn(name = "customerId",nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "adminId",nullable = false)
    private Admin admin;

}
