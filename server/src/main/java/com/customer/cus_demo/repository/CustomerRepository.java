package com.customer.cus_demo.repository;

import com.customer.cus_demo.model.CloudCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CustomerRepository extends JpaRepository<CloudCustomer, Long> {
}
