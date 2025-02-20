package com.onlinebookstore.book_store.payloads.requests;

import lombok.Data;

@Data
public class LoginRequests {
    private String username;
    private String password;
}
