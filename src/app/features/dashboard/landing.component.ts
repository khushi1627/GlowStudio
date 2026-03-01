import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Offer, OfferService } from '../../core/services/offer.service';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, DatePipe],
  template: `
    <section class="hero">
      <div class="hero-content container">
        <p class="eyebrow">GlowStudio</p>
        <h1>Beauty appointments made elegant.</h1>
        <p class="lead">
          Premium salon experience for skincare, bridal makeup, hair styling, and spa sessions.
          Book in seconds and receive a shareable receipt instantly.
        </p>
        <div class="cta-row">
          <a routerLink="/register" class="btn primary">Create Account</a>
          <a routerLink="/login" class="btn ghost">Login</a>
        </div>
      </div>
    </section>

    <section class="container section">
      <h2>Latest Offers</h2>
      <div class="cards">
        @for (offer of offers(); track offer._id) {
          <article class="card">
            <h3>{{ offer.title }}</h3>
            <p>{{ offer.description }}</p>
            <span>Valid until {{ offer.validUntil | date: 'mediumDate' }}</span>
          </article>
        } @empty {
          <article class="card">
            <h3>No active offers</h3>
            <p>Admin can publish offers from the dashboard.</p>
          </article>
        }
      </div>
    </section>
  `
})
export class LandingComponent implements OnInit {
  readonly offers = signal<Offer[]>([]);

  constructor(private readonly offerService: OfferService) {}

  ngOnInit() {
    this.offerService.getAll().subscribe({
      next: (offers) => this.offers.set(offers),
      error: () => this.offers.set([])
    });
  }
}
