package com.onlinebookstore.book_store.repository;

import com.onlinebookstore.book_store.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByAdminUsername(String username);
    Boolean existsByAdminUsername(String username);
    Boolean existsByAdminEmail(String email);
}
