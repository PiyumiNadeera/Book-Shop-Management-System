package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Discount;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DiscountService {
    List<Discount> getAllDiscounts();
    Discount getDiscountById(Long id);
    Discount addDiscounts(Discount discount);
    void updateDiscounts(Long id,Discount discount);
    void removeDiscounts(Long id);

}
