package com.onlinebookstore.book_store.security;

import com.onlinebookstore.book_store.entity.Customer;
import com.onlinebookstore.book_store.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Customer customer = customerRepository.findByCustomerUsername(username).orElse(null);

        if(customer == null) {
            throw new UsernameNotFoundException("No users found with the given username"+username);
        }

        return User.builder()
                .username(customer.getCustomerUsername())
                .password(customer.getCustomerPassword())
                .build();

    }

}
