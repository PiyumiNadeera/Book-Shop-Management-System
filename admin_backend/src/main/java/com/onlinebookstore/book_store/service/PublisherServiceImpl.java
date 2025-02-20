package com.onlinebookstore.book_store.service;

import com.onlinebookstore.book_store.entity.Publisher;
import com.onlinebookstore.book_store.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublisherServiceImpl implements PublisherService{

    @Autowired
    private PublisherRepository publisherRepository;

    public PublisherServiceImpl(PublisherRepository publisherRepository) {
        this.publisherRepository = publisherRepository;
    }

    @Override
    public List<Publisher> getAllPublishers(){
        return publisherRepository.findAll();
    }

    @Override
    public Publisher getPublisherById(Long id){
        return publisherRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Publisher addPublisher(Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    @Override
    public void updatePublisher(Long id, Publisher publisher) {
        Publisher existingPublisher = publisherRepository.findById(id).orElseThrow(null);

        if (existingPublisher != null) {
            existingPublisher.setPublisherName(publisher.getPublisherName());
            existingPublisher.setPublisherAddress(publisher.getPublisherAddress());

            publisherRepository.save(existingPublisher);
        }
    }

    @Override
    public void deletePublisher(Long id){
        Publisher existingPublisher = publisherRepository.findById(id).orElseThrow(null);

        if (existingPublisher != null) {
            publisherRepository.deleteById(id);
        }
    }
}
