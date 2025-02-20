package com.onlinebookstore.book_store.repository;

import com.onlinebookstore.book_store.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Optional<Customer> findByCustomerUsername(String username);
    Boolean existsByCustomerUsername(String username);
}
