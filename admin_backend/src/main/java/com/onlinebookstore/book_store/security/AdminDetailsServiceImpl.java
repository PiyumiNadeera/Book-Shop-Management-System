package com.onlinebookstore.book_store.security;

import com.onlinebookstore.book_store.entity.Admin;
import com.onlinebookstore.book_store.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//Create this as the second class

@Service
public class AdminDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{

        Admin admin = adminRepository.findByAdminUsername(username).orElse(null);

        if(admin == null){
            throw new UsernameNotFoundException("User not found with the given username: " + username);
        }

        return User.builder()
                .username(admin.getAdminUsername())
                .password(admin.getAdminPassword())
                .build();
    }
}
