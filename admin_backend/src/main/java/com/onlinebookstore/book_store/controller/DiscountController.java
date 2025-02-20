package com.onlinebookstore.book_store.controller;

import com.onlinebookstore.book_store.entity.Discount;
import com.onlinebookstore.book_store.service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/discounts")
@CrossOrigin("*")
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    public DiscountController(DiscountService discountService){
        this.discountService = discountService;
    }

    @GetMapping
    public ResponseEntity<List<Discount>> findAllDiscounts(){
        try{
            return new ResponseEntity<>(discountService.getAllDiscounts(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Discount> findDiscountsById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(discountService.getDiscountById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Void> addNewDiscounts(@RequestBody Discount discount){
        try {
            discountService.addDiscounts(discount);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateExistingDiscounts(@PathVariable Long id,@RequestBody Discount discount){
        try{
            discountService.updateDiscounts(id,discount);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeDiscounts(@PathVariable Long id){
        try{
            discountService.removeDiscounts(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
