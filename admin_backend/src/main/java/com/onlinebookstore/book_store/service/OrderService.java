package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Order;
import com.onlinebookstore.book_store.payloads.responses.OrderDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {

    List<Order> getAllOrders();
    Order getOrderById(Long id);
    void addOrder(Order order);
    void updateOrder(Long id, OrderDTO orderdto);
    void deleteOrder(Long id);
}
