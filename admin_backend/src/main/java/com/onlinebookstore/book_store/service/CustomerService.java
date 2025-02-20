package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CustomerService {
    List<Customer> getAllCustomers();
    Customer getCustomerById(Long id);
    void addCustomer(Customer customer);
    void updateCustomer(Long id,Customer customer);
    void deleteCustomer(Long id);
}
