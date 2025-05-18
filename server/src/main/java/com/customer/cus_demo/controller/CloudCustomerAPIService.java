package com.customer.cus_demo.controller;

import com.customer.cus_demo.model.CloudCustomer;
import com.customer.cus_demo.repository.CustomerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cloud customer")
public class CloudCustomerAPIService {


    private final CustomerRepository repository;

    public CloudCustomerAPIService(CustomerRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<CloudCustomer> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{customerId}")
    public CloudCustomer getByCustomerId(@PathVariable Long customerId) {
        return repository.findById(customerId).orElse(null);
    }

    @PostMapping
    public CloudCustomer create(@RequestBody CloudCustomer cloudCustomer) {
        return repository.save(cloudCustomer);
    }

    @PutMapping("/{customerId}")
    public CloudCustomer update(@PathVariable Long customerId, @RequestBody CloudCustomer updatedCustomer) {
        return repository.findById(customerId).map(cloudCustomer -> {
            cloudCustomer.setCustomerName(updatedCustomer.getCustomerName());
            cloudCustomer.setCustomerDOB(updatedCustomer.getCustomerDOB());
            cloudCustomer.setCustomerNIC(updatedCustomer.getCustomerNIC());
            return repository.save(cloudCustomer);
        }).orElse(null);
    }

    @DeleteMapping("/{customerId}")
    public void delete(@PathVariable Long customerId) {
        repository.deleteById(customerId);
    }
}
