package pl.hada.ecommerce.shop.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.exeption.ResourceNotFoundException;
import pl.hada.ecommerce.shop.model.Order;
import pl.hada.ecommerce.shop.model.OrderRating;
import pl.hada.ecommerce.shop.repository.OrderRatingRepository;
import pl.hada.ecommerce.shop.repository.OrderRepository;

import java.util.List;

@Service
public class OrderRatingService {

    private final OrderRatingRepository orderRatingRepository;
    private final OrderRepository orderRepository;

    @Autowired
    public OrderRatingService(OrderRatingRepository orderRatingRepository, OrderRepository orderRepository) {
        this.orderRatingRepository = orderRatingRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderRating> getAllOrderRatings() {
        return orderRatingRepository.findAll();
    }

    public OrderRating getOrderRatingById(Long id) {
        return orderRatingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order","id",id));
    }

    public OrderRating createOrderRating(OrderRating orderRating, Long userId) {
        Order currentOrder = orderRepository.findMaxIdOrderForUser(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        orderRating.setOrder(currentOrder);
        return orderRatingRepository.save(orderRating);
    }

    public OrderRating updateOrderRating(Long id, OrderRating orderRating) {
        OrderRating existingOrderRating = getOrderRatingById(id);
        existingOrderRating.setComment(orderRating.getComment());
        existingOrderRating.setRating(orderRating.getRating());
        return orderRatingRepository.save(existingOrderRating);
    }

    public void deleteOrderRating(Long id) {
        OrderRating orderRating = getOrderRatingById(id);
        orderRatingRepository.delete(orderRating);
    }
}
