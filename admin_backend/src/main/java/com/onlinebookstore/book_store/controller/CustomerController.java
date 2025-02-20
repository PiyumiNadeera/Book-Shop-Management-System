package com.onlinebookstore.book_store.controller;

import com.onlinebookstore.book_store.entity.Customer;
import com.onlinebookstore.book_store.payloads.responses.CustomerDTO;
import com.onlinebookstore.book_store.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    public CustomerController(CustomerService customerService){
        this.customerService = customerService;
    }

//    @GetMapping
//    public ResponseEntity<List<Customer>> findAllCustomers(){
//        try{
//            return new ResponseEntity<>(customerService.getAllCustomers(),HttpStatus.OK);
//        }catch (Exception e){
//            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping
    public ResponseEntity<List<CustomerDTO>> findAllCustomers(){
        try{
            List<CustomerDTO> customers = customerService.getAllCustomers()
                    .stream()
                    .map(customer -> new CustomerDTO(
                            customer.getCustomerId(),
                            customer.getCustomerName(),
                            customer.getCustomerEmail(),
                            customer.getCustomerContact(),
                            customer.getCustomerUsername()
                    )).collect(Collectors.toList());

            return new ResponseEntity<>(customers,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> findCustomerById(@PathVariable Long id){
        try {
            Customer customer = customerService.getCustomerById(id);
            CustomerDTO customerDTO = new CustomerDTO(customer.getCustomerId(),customer.getCustomerName(),customer.getCustomerEmail(),customer.getCustomerContact(),customer.getCustomerUsername());
            return new ResponseEntity<>(customerDTO,HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Void> addCustomer(@RequestBody Customer customer){
        try {
            customerService.addCustomer(customer);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCustomer(@PathVariable Long id,@RequestBody Customer customer){
        try {
            customerService.updateCustomer(id,customer);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id){
        try {
            customerService.deleteCustomer(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
