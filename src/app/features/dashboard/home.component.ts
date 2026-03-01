import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="hero-background">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>
      <div class="hero-content container">
        <div class="hero-badge">
          <span class="badge-icon">✨</span>
          <span>Welcome to GlowStudio</span>
        </div>
        <h1 class="hero-title">
          <span class="title-line">Beauty appointments</span>
          <span class="title-line accent">made elegant.</span>
        </h1>
        <p class="hero-description">
          Experience premium salon services for skincare, bridal makeup, hair styling, and spa sessions. 
          Book instantly and receive shareable digital receipts.
        </p>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="stat-number">5000+</span>
            <span class="stat-label">Happy Clients</span>
          </div>
          <div class="hero-stat">
            <span class="stat-number">4.9★</span>
            <span class="stat-label">Rating</span>
          </div>
          <div class="hero-stat">
            <span class="stat-number">50+</span>
            <span class="stat-label">Experts</span>
          </div>
        </div>
        <div class="cta-row">
          <button class="btn primary hero-btn" (click)="navigateToBooking()">
            <span class="btn-icon">📅</span>
            Book Your Appointment
          </button>
          <button class="btn ghost hero-btn" (click)="navigateToOffers()">
            <span class="btn-icon">🎁</span>
            View Special Offers
          </button>
        </div>
        <div class="trust-badges">
          <div class="trust-item">
            <span class="trust-icon">⚡</span>
            <span>Instant Booking</span>
          </div>
          <div class="trust-item">
            <span class="trust-icon">📄</span>
            <span>Digital Receipts</span>
          </div>
          <div class="trust-item">
            <span class="trust-icon">💎</span>
            <span>Premium Service</span>
          </div>
        </div>
      </div>
    </section>

    <section class="services-section section">
      <div class="container">
        <div class="section-header">
          <h2>Our Premium Services</h2>
          <p>Discover our range of beauty and wellness treatments</p>
        </div>
        <div class="services-grid">
          <div class="service-card" *ngFor="let service of services">
            <div class="service-icon">
              <span [innerHTML]="service.icon"></span>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <div class="service-price">{{ service.price }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="booking-cta section">
      <div class="container">
        <div class="cta-content">
          <div class="cta-text">
            <h2>Ready to Glow?</h2>
            <p>Join thousands of satisfied clients who trust us with their beauty needs</p>
            <div class="cta-stats">
              <div class="stat">
                <span class="stat-number">5000+</span>
                <span class="stat-label">Happy Clients</span>
              </div>
              <div class="stat">
                <span class="stat-number">50+</span>
                <span class="stat-label">Expert Stylists</span>
              </div>
              <div class="stat">
                <span class="stat-number">4.9★</span>
                <span class="stat-label">Average Rating</span>
              </div>
            </div>
          </div>
          <div class="cta-actions">
            <button class="btn primary large" (click)="navigateToBooking()">Book Your Appointment</button>
            <p class="cta-note">Instant booking • No hidden fees • Shareable receipts</p>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials section">
      <div class="container">
        <div class="section-header">
          <h2>What Our Clients Say</h2>
          <p>Real experiences from our valued customers</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card" *ngFor="let testimonial of testimonials">
            <div class="testimonial-rating">
              <span class="stars">{{ '★'.repeat(testimonial.rating) }}</span>
            </div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
            <div class="testimonial-author">
              <div class="author-avatar">{{ testimonial.name.charAt(0) }}</div>
              <div class="author-info">
                <div class="author-name">{{ testimonial.name }}</div>
                <div class="author-service">{{ testimonial.service }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-info section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <h3>Visit Us</h3>
            <p>120 Rose Avenue, Los Angeles, CA</p>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📞</div>
            <h3>Call Us</h3>
            <p>(555) 123-4567</p>
          </div>
          <div class="contact-item">
            <div class="contact-icon">🕐</div>
            <h3>Hours</h3>
            <p>Mon-Sat: 9AM-8PM<br>Sun: 10AM-6PM</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {
  services = [
    {
      title: 'Skincare Treatments',
      description: 'Rejuvenating facials and advanced skincare solutions',
      price: 'From ₹9,500',
      icon: '✨'
    },
    {
      title: 'Bridal Makeup',
      description: 'Professional makeup for your special day',
      price: 'From ₹20,000',
      icon: '👰'
    },
    {
      title: 'Hair Styling',
      description: 'Latest trends and timeless classics',
      price: 'From ₹6,500',
      icon: '💇'
    },
    {
      title: 'Spa Sessions',
      description: 'Relaxing body treatments and massages',
      price: 'From ₹12,000',
      icon: '🌸'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      service: 'Bridal Makeup',
      rating: 5,
      text: 'Absolutely amazing experience! The makeup artist understood exactly what I wanted for my wedding day. Highly recommend!'
    },
    {
      name: 'Emily Chen',
      service: 'Skincare Treatment',
      rating: 5,
      text: 'The facial treatment was incredibly relaxing and my skin has never looked better. The staff is so professional and caring.'
    },
    {
      name: 'Maria Rodriguez',
      service: 'Hair Styling',
      rating: 5,
      text: 'Best salon experience ever! They transformed my hair and gave me the perfect cut and color. Will definitely be back!'
    }
  ];

  navigateToBooking() {
    // Implementation for navigation to booking
    console.log('Navigate to booking');
  }

  navigateToOffers() {
    // Implementation for navigation to offers
    console.log('Navigate to offers');
  }
}
