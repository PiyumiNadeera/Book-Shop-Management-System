package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Customer;
import com.onlinebookstore.book_store.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id){
        return customerRepository.findById(id).orElseThrow(null);
    }

    @Override
    public void addCustomer(Customer customer){
        customerRepository.save(customer);
    }

    @Override
    public void updateCustomer(Long id,Customer customer){
        Customer existingCustomer = customerRepository.findById(id).orElseThrow(null);
        if(existingCustomer != null){
            existingCustomer.setCustomerName(customer.getCustomerName());
            existingCustomer.setCustomerEmail(customer.getCustomerEmail());
            existingCustomer.setCustomerContact(customer.getCustomerContact());
            existingCustomer.setCustomerUsername(customer.getCustomerUsername());
            existingCustomer.setCustomerPassword(customer.getCustomerPassword());

            customerRepository.save(existingCustomer);
        }

    }

    @Override
    public void deleteCustomer(Long id) {
        Customer existingCustomer = customerRepository.findById(id).orElseThrow(null);
        if (existingCustomer !=null){
            customerRepository.deleteById(id);
        }
    }
}
