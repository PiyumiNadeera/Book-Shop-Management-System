package com.onlinebookstore.book_store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "customers")
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerEmail;

    @Column(nullable = false)
    private String customerContact;

    @Column(nullable = false)
    private String customerUsername;

    @Column(nullable = false)
    private String customerPassword;

    @OneToMany(mappedBy = "orderId",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Order> orders;

}
