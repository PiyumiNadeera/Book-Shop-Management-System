package com.onlinebookstore.book_store.payloads.responses;

import lombok.Data;

@Data
public class JwtCustomerResponse {

    private String token;
    private Long customerId;
    private String customerName;
    private String customerEmail;
    private String customerContact;
    private String username;

    public JwtCustomerResponse(String token, Long customerId, String customerName, String customerEmail, String customerContact, String username) {
        this.token = token;
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerContact = customerContact;
        this.username = username;
    }
}
