package com.onlinebookstore.book_store.payloads.responses;

import lombok.Data;

@Data
public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

}

