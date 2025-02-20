package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Admin;
import com.onlinebookstore.book_store.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public void addAdmin(Admin admin) {
        adminRepository.save(admin);
    }

    @Override
    public void removeAdmin(Long id){
        Admin admin = adminRepository.findById(id).orElseThrow(null);

        if(admin != null){
            adminRepository.deleteById(id);
        }
    }
}
