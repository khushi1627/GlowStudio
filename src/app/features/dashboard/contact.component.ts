import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, CommonModule],
  template: `
    <section class="contact-page">
      <div class="contact-hero">
        <div class="hero-background">
          <div class="gradient-orb orb-1"></div>
          <div class="gradient-orb orb-2"></div>
        </div>
        <div class="container">
          <div class="hero-content">
            <h1 class="page-title">Get in Touch</h1>
            <p class="hero-subtitle">
              We're here to help you look and feel your absolute best
            </p>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="contact-main">
          <div class="contact-info-section">
            <h2>Visit Our Studio</h2>
            <div class="contact-cards">
              <div class="contact-card primary">
                <div class="card-icon">📍</div>
                <h3>Location</h3>
                <p>
                  120 Rose Avenue<br>
                  Los Angeles, CA 90048<br>
                  <a
                    href="https://maps.google.com/?q=120+Rose+Avenue,+Los+Angeles,+CA"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="map-link"
                  >
                    Get Directions →
                  </a>
                </p>
              </div>
              
              <div class="contact-card">
                <div class="card-icon">📞</div>
                <h3>Phone</h3>
                <p>
                  <a href="tel:+15550123456" class="contact-link">
                    +1 (555) 012-3456
                  </a>
                </p>
                <p class="contact-note">
                  Mon-Fri: 9AM-8PM<br>
                  Sat: 9AM-6PM<br>
                  Sun: 10AM-5PM
                </p>
              </div>
              
              <div class="contact-card">
                <div class="card-icon">✉️</div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:hello@glowstudio.com" class="contact-link">
                    hello@glowstudio.com
                  </a>
                </p>
                <p class="contact-note">
                  We respond within 24 hours
                </p>
              </div>
            </div>
          </div>

          <div class="contact-form-section">
            <div class="form-card">
              <h2>Send Us a Message</h2>
              <p class="form-subtitle">
                Have questions about our services? Want to book an appointment? 
                Fill out the form below and we'll get back to you soon.
              </p>
              
              <form class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Full Name *</label>
                    <input type="text" id="name" name="name" required>
                  </div>
                  <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone">
                </div>
                
                <div class="form-group">
                  <label for="service">Service Interest</label>
                  <select id="service" name="service">
                    <option value="">Select a service</option>
                    <option value="hair">Hair Styling & Color</option>
                    <option value="skincare">Skincare Treatment</option>
                    <option value="makeup">Makeup Services</option>
                    <option value="bridal">Bridal Services</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="message">Message *</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                
                <button type="submit" class="btn primary large form-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="booking-section">
          <div class="booking-card">
            <h2>Ready to Book Your Appointment?</h2>
            <p>
              Skip the wait and book your transformation directly online. 
              Choose your preferred service, date, and time in just a few clicks.
            </p>
            <div class="booking-actions">
              <a routerLink="/register" class="btn primary large">
                Book Online Now
              </a>
              <a href="tel:+15550123456" class="btn ghost large">
                Call to Book
              </a>
            </div>
          </div>
        </div>

        <div class="faq-section">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <div class="faq-grid">
            <div class="faq-item">
              <h3>How far in advance should I book?</h3>
              <p>
                We recommend booking 1-2 weeks in advance for regular services. 
                For bridal packages and special events, please book at least 2-3 months ahead.
              </p>
            </div>
            <div class="faq-item">
              <h3>Do you offer consultations?</h3>
              <p>
                Yes! We offer complimentary 15-minute consultations for all new clients 
                to discuss your beauty goals and recommend the best treatments.
              </p>
            </div>
            <div class="faq-item">
              <h3>What's your cancellation policy?</h3>
              <p>
                We require 24 hours notice for cancellations. Late cancellations may 
                incur a fee of 50% of the service price.
              </p>
            </div>
            <div class="faq-item">
              <h3>Do you use organic products?</h3>
              <p>
                We prioritize clean, high-quality products and offer organic options 
                for most services. Please let us know if you have specific preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {}
