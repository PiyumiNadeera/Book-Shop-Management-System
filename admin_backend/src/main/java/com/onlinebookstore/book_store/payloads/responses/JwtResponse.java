package com.onlinebookstore.book_store.payloads.responses;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private Long id;
    private String email;
    private String username;

    public JwtResponse(String token, Long id, String email, String username) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.username = username;
    }
}
