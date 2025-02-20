package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Admin;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {
    List<Admin> getAllAdmins();
    void addAdmin(Admin admin);
    void removeAdmin(Long id);
}
