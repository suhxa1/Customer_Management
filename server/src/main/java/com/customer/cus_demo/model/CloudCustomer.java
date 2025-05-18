package com.customer.cus_demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Data
public class CloudCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    private String customerName;
    private String customerDOB;
    private String customerNIC;
    private String customerPhoneNumber;
    private String customerAddress;

}
