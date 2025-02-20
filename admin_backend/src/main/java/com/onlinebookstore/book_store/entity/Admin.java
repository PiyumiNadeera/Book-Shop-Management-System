package com.onlinebookstore.book_store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "administrators")
@Data
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;
    private String adminName;
    private String adminEmail;
    private String adminUsername;
    private String adminPassword;

    @OneToMany(mappedBy = "admin")
    @JsonIgnore
    private List<Order> orders;

}
