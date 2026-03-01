import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Appointment, AppointmentService } from '../../core/services/appointment.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [ReactiveFormsModule, DatePipe, RouterLink],
  template: `
    <div class="user-dashboard-wrapper">
      <!-- Enhanced Sidebar -->
      <aside class="user-sidebar">
        <div class="sidebar-header">
          <div class="user-logo">
            <div class="logo-icon">✨</div>
            <div class="logo-text">
              <h3>Glow Studio</h3>
              <span>My Dashboard</span>
            </div>
          </div>
        </div>
        
        <div class="user-welcome">
          <div class="welcome-avatar">{{ auth.user()?.name?.charAt(0)?.toUpperCase() || 'U' }}</div>
          <div class="welcome-text">
            <h4>Welcome back,</h4>
            <p>{{ auth.user()?.name }}</p>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <div class="nav-section">
            <h4 class="nav-title">Quick Actions</h4>
            <a routerLink="/dashboard" fragment="booking" class="nav-link" [class.active]="activeTab() === 'booking'" (click)="setActiveTab('booking')">
              <span class="nav-icon">📅</span>
              <span>Book Appointment</span>
            </a>
            <a routerLink="/dashboard" fragment="appointments" class="nav-link" [class.active]="activeTab() === 'appointments'" (click)="setActiveTab('appointments')">
              <span class="nav-icon">📋</span>
              <span>My Appointments</span>
              <span class="nav-badge">{{ appointments().length }}</span>
            </a>
          </div>
        </nav>
        
        <div class="sidebar-footer">
          <button class="logout-btn" (click)="auth.logout()">
            <span class="logout-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="user-main">
        <!-- Enhanced Header -->
        <header class="user-header">
          <div class="header-content">
            <div class="header-left">
              <h1 class="page-title">My Beauty Journey</h1>
              <p class="page-subtitle">Book appointments and manage your beauty schedule</p>
            </div>
            <div class="header-right">
              <div class="stats-summary">
                <div class="stat-item">
                  <span class="stat-value">{{ appointments().length }}</span>
                  <span class="stat-label">Total Bookings</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ appointments().filter(a => a.status === 'pending').length }}</span>
                  <span class="stat-label">Upcoming</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Booking Section -->
        @if (activeTab() === 'booking') {
        <section class="content-section" id="booking">
          <div class="section-header">
            <div class="section-title">
              <h2>Book New Appointment</h2>
              <p>Schedule your next beauty treatment with our expert stylists</p>
            </div>
          </div>
          
          <div class="booking-grid">
            <div class="booking-form-card">
              <form class="booking-form" [formGroup]="form" (ngSubmit)="book()">
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">Service Type</label>
                    <select class="form-input" formControlName="service">
                      <option value="">Select a service</option>
                      <option value="Bridal Makeup">Bridal Makeup</option>
                      <option value="Hair Styling">Hair Styling</option>
                      <option value="Skincare & Spa">Skincare & Spa</option>
                      <option value="Nail Art">Nail Art</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Preferred Stylist</label>
                    <input type="text" class="form-input" formControlName="stylist" placeholder="Enter stylist name" />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Date & Time</label>
                    <input type="datetime-local" class="form-input" formControlName="appointmentDate" />
                  </div>
                  
                  <div class="form-group full-width">
                    <label class="form-label">Special Requests</label>
                    <textarea class="form-textarea" formControlName="notes" rows="3" placeholder="Any special requests or preferences..."></textarea>
                  </div>
                </div>
                
                <div class="form-actions">
                  <button type="submit" class="btn-primary" [disabled]="form.invalid">
                    <span class="btn-icon">📅</span>
                    Confirm Booking
                  </button>
                  <button type="button" class="btn-secondary" (click)="form.reset()">
                    Clear Form
                  </button>
                </div>
              </form>
            </div>
            
            <div class="receipt-card">
              <div class="receipt-header">
                <h3>Booking Receipt</h3>
                <div class="receipt-icon">🧾</div>
              </div>
              
              @if (lastBooked()) {
                <div class="receipt-content">
                  <div class="receipt-item">
                    <span class="receipt-label">Booking ID</span>
                    <span class="receipt-value">#{{ lastBooked()?._id?.slice(-8) }}</span>
                  </div>
                  <div class="receipt-item">
                    <span class="receipt-label">Service</span>
                    <span class="receipt-value">{{ lastBooked()?.service }}</span>
                  </div>
                  <div class="receipt-item">
                    <span class="receipt-label">Stylist</span>
                    <span class="receipt-value">{{ lastBooked()?.stylist }}</span>
                  </div>
                  <div class="receipt-item">
                    <span class="receipt-label">Date & Time</span>
                    <span class="receipt-value">{{ lastBooked()?.appointmentDate | date: 'medium' }}</span>
                  </div>
                  <div class="receipt-item">
                    <span class="receipt-label">Status</span>
                    <span class="receipt-status" [class]="'status-' + lastBooked()?.status">{{ lastBooked()?.status }}</span>
                  </div>
                  
                  <div class="receipt-actions">
                    <button class="btn-secondary" (click)="downloadReceipt()">
                      <span class="btn-icon">🖨️</span>
                      Download Receipt
                    </button>
                  </div>
                </div>
              } @else {
                <div class="empty-receipt">
                  <div class="empty-icon">📝</div>
                  <h4>No Recent Booking</h4>
                  <p>Complete a booking to see your receipt here</p>
                </div>
              }
            </div>
          </div>
        </section>
        }

        <!-- Appointments Section -->
        @if (activeTab() === 'appointments') {
        <section class="content-section" id="appointments">
          <div class="section-header">
            <div class="section-title">
              <h2>My Appointments</h2>
              <p>View and manage your upcoming and past appointments</p>
            </div>
            <div class="section-actions">
              <button class="btn-secondary" (click)="loadMine()">
                <span class="btn-icon">🔄</span>
                Refresh
              </button>
            </div>
          </div>
          
          <div class="appointments-grid">
            @for (item of appointments(); track item._id) {
              <div class="appointment-card" [class]="'status-' + item.status">
                <div class="card-header">
                  <div class="appointment-icon">
                    @switch (item.service) {
                      @case ('Bridal Makeup') { 💄 }
                      @case ('Hair Styling') { 💇‍♀️ }
                      @case ('Skincare & Spa') { 🧖‍♀️ }
                      @case ('Nail Art') { 💅 }
                      @default { ✨ }
                    }
                  </div>
                  <div class="status-badge" [class]="'status-' + item.status">
                    {{ item.status }}
                  </div>
                </div>
                
                <div class="card-body">
                  <h3 class="appointment-title">{{ item.service }}</h3>
                  <div class="appointment-details">
                    <div class="detail-item">
                      <span class="detail-icon">👤</span>
                      <span class="detail-text">{{ item.stylist }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-icon">📅</span>
                      <span class="detail-text">{{ item.appointmentDate | date: 'medium' }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="card-footer">
                  <button class="btn-outline" (click)="viewDetails(item)">
                    View Details
                  </button>
                </div>
              </div>
            } @empty {
              <div class="empty-state">
                <div class="empty-icon">📅</div>
                <h3>No appointments yet</h3>
                <p>Book your first appointment to get started on your beauty journey!</p>
                <a routerLink="/dashboard" fragment="booking" class="btn-primary" (click)="setActiveTab('booking')">
                  <span class="btn-icon">📅</span>
                  Book First Appointment
                </a>
              </div>
            }
          </div>
        </section>
        }
      </main>
    </div>
  `
})
export class UserDashboardComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly appointmentService = inject(AppointmentService);
  readonly auth = inject(AuthService);
  readonly activeTab = signal<'booking' | 'appointments' | 'profile' | 'offers'>('booking');
  readonly currentFilter = signal<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  readonly filteredAppointments = signal<Appointment[]>([]);
  readonly profileForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['']
  });

  readonly appointments = signal<Appointment[]>([]);
  readonly lastBooked = signal<Appointment | null>(null);

  readonly form = this.fb.group({
    service: ['', [Validators.required]],
    stylist: ['', [Validators.required]],
    appointmentDate: ['', [Validators.required]],
    notes: ['']
  });

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      this.activeTab.set(fragment === 'appointments' ? 'appointments' : 'booking');
    });
    this.loadMine();
  }

  setActiveTab(tab: 'booking' | 'appointments') {
    this.activeTab.set(tab);
  }

  book() {
    if (this.form.invalid) return;
    this.appointmentService
      .create(this.form.getRawValue() as { service: string; stylist: string; appointmentDate: string; notes?: string })
      .subscribe((res) => {
        this.lastBooked.set(res.appointment);
        this.form.reset();
        this.loadMine();
      });
  }

  downloadReceipt() {
    const appointment = this.lastBooked();
    if (!appointment) return;

    const customer = this.auth.user();
    const issuedAt = new Date().toLocaleString();
    const appointmentAt = new Date(appointment.appointmentDate).toLocaleString();
    const createdAt = new Date(appointment.createdAt).toLocaleString();
    const receiptNumber = appointment._id.slice(-8).toUpperCase();

    const lines = [
      'GLOW STUDIO - APPOINTMENT RECEIPT',
      '----------------------------------',
      `Receipt No: ${receiptNumber}`,
      `Issued At: ${issuedAt}`,
      '',
      'Customer',
      `Name: ${customer?.name ?? 'N/A'}`,
      `Email: ${customer?.email ?? 'N/A'}`,
      '',
      'Appointment',
      `Booking ID: ${appointment._id}`,
      `Service: ${appointment.service}`,
      `Stylist: ${appointment.stylist}`,
      `Appointment Date: ${appointmentAt}`,
      `Booked On: ${createdAt}`,
      `Status: ${appointment.status.toUpperCase()}`,
      `Notes: ${appointment.notes?.trim() || 'None'}`,
      '',
      'Thank you for choosing Glow Studio.'
    ];

    const pdfBlob = this.buildReceiptPdf(lines);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `glowstudio-receipt-${receiptNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private buildReceiptPdf(lines: string[]): Blob {
    const escapePdfText = (value: string) =>
      value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

    const fontSize = 12;
    const lineHeight = 16;
    const startX = 50;
    const startY = 760;
    const pageBottom = 40;

    const contentLines: string[] = ['BT', `/F1 ${fontSize} Tf`];
    let y = startY;
    for (const rawLine of lines) {
      if (y < pageBottom) break;
      const line = escapePdfText(rawLine);
      contentLines.push(`1 0 0 1 ${startX} ${y} Tm (${line}) Tj`);
      y -= lineHeight;
    }
    contentLines.push('ET');
    const contentStream = contentLines.join('\n');

    const objects: string[] = [];
    objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
    objects.push(
      '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n'
    );
    objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');
    objects.push(
      `5 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`
    );

    let pdf = '%PDF-1.4\n';
    const offsets: number[] = [0];
    for (const obj of objects) {
      offsets.push(pdf.length);
      pdf += obj;
    }

    const xrefStart = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += '0000000000 65535 f \n';
    for (let i = 1; i < offsets.length; i++) {
      pdf += `${offsets[i].toString().padStart(10, '0')} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

    return new Blob([pdf], { type: 'application/pdf' });
  }

  loadMine() {
    this.appointmentService.mine().subscribe((data) => {
      this.appointments.set(data);
      if (data.length === 0) {
        this.lastBooked.set(null);
        return;
      }

      const latest = [...data].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      this.lastBooked.set(latest);
    });
  }

  viewDetails(appointment: Appointment) {
    alert(
      `Appointment Details\n\nService: ${appointment.service}\nStylist: ${appointment.stylist}\nDate: ${new Date(appointment.appointmentDate).toLocaleString()}\nStatus: ${appointment.status}`
    );
  }
}
