import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Offer, OfferService } from '../../core/services/offer.service';

@Component({
  selector: 'app-offers',
  imports: [DatePipe],
  template: `
    <section class="offers-page">
      <div class="offers-header">
        <div class="header-content">
          <h1 class="page-title">Special Offers</h1>
          <p class="page-subtitle">Discover our exclusive salon promotions and limited-time beauty packages</p>
        </div>
      </div>

      <div class="offers-container">
        @for (offer of offers(); track offer._id) {
          <article class="offer-card" [class.expiring-soon]="isExpiringSoon(offer.validUntil)">
            <div class="card-header">
              <div class="offer-badge">
                <span class="badge-icon">🎁</span>
                <span class="badge-text">Special Deal</span>
              </div>
              @if (isExpiringSoon(offer.validUntil)) {
                <div class="urgency-badge">
                  <span class="urgency-text">⚡ Expires Soon</span>
                </div>
              }
            </div>
            
            <div class="card-content">
              <h3 class="offer-title">{{ offer.title }}</h3>
              <p class="offer-description">{{ offer.description }}</p>
              
              <div class="offer-footer">
                <div class="validity-info">
                  <span class="validity-icon">📅</span>
                  <span class="validity-text">Valid until {{ offer.validUntil | date: 'mediumDate' }}</span>
                </div>
                <button class="cta-button" (click)="bookNow(offer)">
                  Book Now →
                </button>
              </div>
            </div>
          </article>
        } @empty {
          <div class="empty-state">
            <div class="empty-icon">🌸</div>
            <h3 class="empty-title">No Active Offers</h3>
            <p class="empty-description">We're preparing amazing new deals for you! Check back soon for exclusive promotions and beauty packages.</p>
            <button class="notify-button" (click)="notifyMe()">
              🔔 Notify Me When Available
            </button>
          </div>
        }
      </div>
    </section>
  `
})
export class OffersComponent implements OnInit {
  readonly offers = signal<Offer[]>([]);

  constructor(private readonly offerService: OfferService) {}

  ngOnInit() {
    this.offerService.getAll().subscribe({
      next: (offers) => this.offers.set(offers),
      error: () => this.offers.set([])
    });
  }

  isExpiringSoon(validUntil: string): boolean {
    const expiryDate = new Date(validUntil);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  }

  bookNow(offer: Offer): void {
    console.log('Booking offer:', offer.title);
    // TODO: Implement booking logic or navigation
  }

  notifyMe(): void {
    console.log('Notify me when offers are available');
    // TODO: Implement notification subscription
  }
}
