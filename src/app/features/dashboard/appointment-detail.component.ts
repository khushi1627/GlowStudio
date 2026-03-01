import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Appointment, AppointmentService } from '../../core/services/appointment.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-appointment-detail',
  imports: [DatePipe, RouterLink],
  template: `
    <section class="container section">
      <div class="section-header">
        <div class="section-title">
          <h2>Appointment Details</h2>
          <p>Complete information for your selected booking.</p>
        </div>
      </div>

      @if (loading()) {
        <div class="empty-state">
          <h3>Loading...</h3>
        </div>
      } @else if (error()) {
        <div class="empty-state">
          <h3>Unable to load details</h3>
          <p>{{ error() }}</p>
          <a class="btn-primary" [routerLink]="backLink()">Back</a>
        </div>
      } @else if (appointment()) {
        <article class="appointment-card status-{{ appointment()!.status }}">
          <div class="card-header">
            <h3 class="appointment-title">{{ appointment()!.service }}</h3>
            <div class="status-badge status-{{ appointment()!.status }}">{{ appointment()!.status }}</div>
          </div>
          <div class="card-body">
            <div class="appointment-details">
              <div class="detail-item">
                <span class="detail-label">Appointment ID</span>
                <span class="detail-value">{{ appointment()!._id }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Stylist</span>
                <span class="detail-value">{{ appointment()!.stylist }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Date & Time</span>
                <span class="detail-value">{{ appointment()!.appointmentDate | date: 'full' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Booked On</span>
                <span class="detail-value">{{ appointment()!.createdAt | date: 'medium' }}</span>
              </div>
              @if (appointment()!.user) {
                <div class="detail-item">
                  <span class="detail-label">Customer</span>
                  <span class="detail-value">{{ appointment()!.user!.name }} ({{ appointment()!.user!.email }})</span>
                </div>
              }
              <div class="detail-item">
                <span class="detail-label">Notes</span>
                <span class="detail-value">{{ appointment()!.notes || 'No notes provided' }}</span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <a class="btn-primary" [routerLink]="backLink()">Back to Dashboard</a>
          </div>
        </article>
      }
    </section>
  `
})
export class AppointmentDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly appointmentService = inject(AppointmentService);
  private readonly auth = inject(AuthService);

  readonly appointment = signal<Appointment | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Missing appointment id.');
      this.loading.set(false);
      return;
    }

    this.appointmentService.getById(id).subscribe({
      next: (data) => {
        this.appointment.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Something went wrong.');
        this.loading.set(false);
      }
    });
  }

  backLink() {
    return this.auth.isAdmin() ? '/admin' : '/dashboard';
  }
}
