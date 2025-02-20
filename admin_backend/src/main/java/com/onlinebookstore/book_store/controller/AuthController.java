package com.onlinebookstore.book_store.controller;

import com.onlinebookstore.book_store.entity.Admin;
import com.onlinebookstore.book_store.entity.Customer;
import com.onlinebookstore.book_store.payloads.requests.LoginRequests;
import com.onlinebookstore.book_store.payloads.responses.JwtCustomerResponse;
import com.onlinebookstore.book_store.payloads.responses.JwtResponse;
import com.onlinebookstore.book_store.payloads.responses.MessageResponse;
import com.onlinebookstore.book_store.repository.AdminRepository;
import com.onlinebookstore.book_store.repository.CustomerRepository;
import com.onlinebookstore.book_store.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping
public class AuthController {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/admin/register")
    public ResponseEntity<?> registerUser(@RequestBody Admin admin) {
        if(adminRepository.existsByAdminUsername(admin.getAdminUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Username already exists"));
        }

        if(adminRepository.existsByAdminEmail(admin.getAdminEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Email already exists"));
        }

        Admin newAdmin = new Admin();
        newAdmin.setAdminName(admin.getAdminName());
        newAdmin.setAdminEmail(admin.getAdminEmail());
        newAdmin.setAdminPassword(passwordEncoder.encode(admin.getAdminPassword()));
        newAdmin.setAdminUsername(admin.getAdminUsername());

        adminRepository.save(newAdmin);

        return ResponseEntity.ok().body(new MessageResponse("User registered successfully"));

    }

    @PostMapping("/customer/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        if(customerRepository.existsByCustomerUsername(customer.getCustomerUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Customer already exists"));
        }

        Customer newCustomer = new Customer();
        newCustomer.setCustomerName(customer.getCustomerName());
        newCustomer.setCustomerEmail(customer.getCustomerEmail());
        newCustomer.setCustomerContact(customer.getCustomerContact());
        newCustomer.setCustomerUsername(customer.getCustomerUsername());
        newCustomer.setCustomerPassword(passwordEncoder.encode(customer.getCustomerPassword()));
        customerRepository.save(newCustomer);

        return ResponseEntity.ok().body(new MessageResponse("Customer registered successfully"));
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> login(@RequestBody LoginRequests loginRequest){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        Admin admin = adminRepository.findByAdminUsername(loginRequest.getUsername()).orElse(null);

        return ResponseEntity.ok(new JwtResponse(jwt,admin.getAdminId(),admin.getAdminEmail(),admin.getAdminUsername()));
    }



    @PostMapping("/customers/login")
    public ResponseEntity<?> loginCustomer(@RequestBody LoginRequests loginRequest){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        Customer customer = customerRepository.findByCustomerUsername(loginRequest.getUsername()).orElse(null);

        return ResponseEntity.ok(new JwtCustomerResponse(jwt,customer.getCustomerId(),customer.getCustomerName(),customer.getCustomerEmail(),customer.getCustomerContact(),customer.getCustomerUsername()));

    }



}
