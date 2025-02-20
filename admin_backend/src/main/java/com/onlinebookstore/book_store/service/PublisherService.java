package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Publisher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PublisherService {
    List<Publisher> getAllPublishers();
    Publisher getPublisherById(Long id);
    Publisher addPublisher(Publisher publisher);
    void updatePublisher(Long id, Publisher publisher);
    void deletePublisher(Long id);
}
