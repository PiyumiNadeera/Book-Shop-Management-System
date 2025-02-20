package com.onlinebookstore.book_store.payloads.responses;

import lombok.Data;

@Data
public class OrderDTO {
    private Long id;
    private String status;
}
