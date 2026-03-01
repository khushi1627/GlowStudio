import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStar, faLeaf, faHeart, faLightbulb } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  imports: [FaIconComponent],
  template: `
    <section class="about-page">
      <div class="about-hero">
        <div class="hero-background">
          <div class="gradient-orb orb-1"></div>
          <div class="gradient-orb orb-2"></div>
          <div class="gradient-orb orb-3"></div>
        </div>
        <div class="container">
          <div class="hero-content">
            <h1 class="page-title">About GlowStudio</h1>
            <p class="hero-subtitle">
              Where beauty meets wellness in perfect harmony
            </p>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="story-section">
          <div class="story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, GlowStudio emerged from a simple vision: to create a sanctuary 
              where beauty, wellness, and personalized care converge. Our journey began with 
              a team of passionate professionals who believed that everyone deserves to 
              feel confident and radiant in their own skin.
            </p>
            <p>
              Today, we're proud to be Los Angeles' premier destination for transformative 
              beauty experiences, combining cutting-edge techniques with time-honored traditions 
              to deliver exceptional results.
            </p>
          </div>
          <div class="story-visual">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-number">5000+</div>
                <div class="stat-label">Happy Clients</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">50+</div>
                <div class="stat-label">Expert Stylists</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">4.9</div>
                <div class="stat-label">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div class="values-section">
          <h2 class="section-title">Our Values</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon"><fa-icon [icon]="faStar"></fa-icon></div>
              <h3>Excellence</h3>
              <p>
                We pursue perfection in every treatment, using premium products and 
                advanced techniques to deliver outstanding results.
              </p>
            </div>
            <div class="value-card">
              <div class="value-icon"><fa-icon [icon]="faLeaf"></fa-icon></div>
              <h3>Wellness</h3>
              <p>
                Our holistic approach beauty nurtures both body and soul, promoting 
                overall well-being through mindful practices.
              </p>
            </div>
            <div class="value-card">
              <div class="value-icon"><fa-icon [icon]="faHeart"></fa-icon></div>
              <h3>Personalization</h3>
              <p>
                Every client is unique, and we tailor our services to match your 
                individual needs, preferences, and beauty goals.
              </p>
            </div>
            <div class="value-card">
              <div class="value-icon"><fa-icon [icon]="faLightbulb"></fa-icon></div>
              <h3>Innovation</h3>
              <p>
                We stay ahead of industry trends, continuously learning and adopting 
                the latest advancements in beauty and skincare.
              </p>
            </div>
          </div>
        </div>

        <div class="team-section">
          <h2 class="section-title">Meet Our Experts</h2>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-avatar">
                <div class="avatar-placeholder">JD</div>
              </div>
              <h3>Jessica Davis</h3>
              <p class="member-role">Founder & Lead Stylist</p>
              <p class="member-bio">
                With 15+ years of experience, Jessica brings artistic vision and 
                technical expertise to every transformation.
              </p>
            </div>
            <div class="team-member">
              <div class="member-avatar">
                <div class="avatar-placeholder">SC</div>
              </div>
              <h3>Sarah Chen</h3>
              <p class="member-role">Skincare Specialist</p>
              <p class="member-bio">
                Certified in advanced esthetics, Sarah creates personalized 
                skincare regimens for radiant, healthy skin.
              </p>
            </div>
            <div class="team-member">
              <div class="member-avatar">
                <div class="avatar-placeholder">MR</div>
              </div>
              <h3>Michael Rodriguez</h3>
              <p class="member-role">Master Colorist</p>
              <p class="member-bio">
                Michael's expertise in color theory and technique makes him one of 
                LA's most sought-after color specialists.
              </p>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <div class="cta-content">
            <h2>Ready to Experience the GlowStudio Difference?</h2>
            <p>
              Join our family of satisfied clients and discover your perfect beauty routine. 
              Book a consultation today and let us help you shine.
            </p>
            <div class="cta-actions">
              <a routerLink="/contact" class="btn primary large">Contact Us</a>
              <a routerLink="/register" class="btn ghost large">Book Appointment</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  // FontAwesome icons
  readonly faStar = faStar;
  readonly faLeaf = faLeaf;
  readonly faHeart = faHeart;
  readonly faLightbulb = faLightbulb;
}
