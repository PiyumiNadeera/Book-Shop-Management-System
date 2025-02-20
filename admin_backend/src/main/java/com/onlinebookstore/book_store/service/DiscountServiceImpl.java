package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Discount;
import com.onlinebookstore.book_store.repository.DiscountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscountServiceImpl implements DiscountService{

    @Autowired
    private DiscountRepository discountRepository;

    public DiscountServiceImpl(DiscountRepository discountRepository){
        this.discountRepository = discountRepository;
    }

    @Override
    public List<Discount> getAllDiscounts(){
        return discountRepository.findAll();
    }

    @Override
    public Discount getDiscountById(Long id){
        return discountRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Discount addDiscounts(Discount discount){
        return discountRepository.save(discount);
    }

    @Override
    public void updateDiscounts(Long id,Discount discount){
        Discount existingDiscount = discountRepository.findById(id).orElseThrow(null);

        if (existingDiscount != null){
            existingDiscount.setDiscountType(discount.getDiscountType());
            existingDiscount.setDiscountValue(discount.getDiscountValue());
            existingDiscount.setDiscountStartDate(discount.getDiscountStartDate());
            existingDiscount.setDiscountEndDate(discount.getDiscountEndDate());

            discountRepository.save(existingDiscount);
        }
    }

    @Override
    public void removeDiscounts(Long id){
        Discount existingDiscount = discountRepository.findById(id).orElseThrow(null);

        if (existingDiscount != null){
            discountRepository.deleteById(id);
        }
    }
}
