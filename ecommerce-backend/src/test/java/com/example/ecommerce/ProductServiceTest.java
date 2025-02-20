package com.example.ecommerce;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ProductServiceTest {
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllProducts() {
        List<Product> products = Arrays.asList(
            new Product(1L, "Test Product", 10.0, 5, "url", "desc"),
            new Product(2L, "Test Product2", 20.0, 3, "url2", "desc2")
        );
        when(productRepository.findAll()).thenReturn(products);

        List<Product> result = productService.getAllProducts();
        
        assertEquals(2, result.size());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void testGetProductById() {
        Product product = new Product(1L, "Test Product", 10.0, 5, "url", "desc");
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        Product result = productService.getProductById(1L);
        
        assertEquals("Test Product", result.getName());
        verify(productRepository, times(1)).findById(1L);
    }
}