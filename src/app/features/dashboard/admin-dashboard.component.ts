import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { 
  faStar, 
  faCalendar, 
  faGift, 
  faChartBar, 
  faCog, 
  faDoorOpen, 
  faRotate, 
  faDownload, 
  faClock, 
  faCheck, 
  faTimes, 
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { Appointment, AppointmentService } from '../../core/services/appointment.service';
import { AuthService } from '../../core/services/auth.service';
import { OfferService } from '../../core/services/offer.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [ReactiveFormsModule, DatePipe, RouterLink, FaIconComponent],
  template: `<div class="admin-dashboard-wrapper">
      <!-- Enhanced Sidebar -->
      <aside class="admin-sidebar">
        <div class="sidebar-header">
          <div class="admin-logo">
            <div class="logo-icon"><fa-icon [icon]="faStar"></fa-icon></div>
            <div class="logo-text">
              <h3>Glow Studio</h3>
              <span>Admin Panel</span>
            </div>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <div class="nav-section">
            <h4 class="nav-title">Management</h4>
            <a routerLink="/admin" fragment="appointments" class="nav-link" [class.active]="activeTab() === 'appointments'" (click)="setActiveTab('appointments')">
              <fa-icon [icon]="faCalendar" class="nav-icon"></fa-icon>
              <span>Appointments</span>
              <span class="nav-badge">{{ appointments().length }}</span>
            </a>
            <a routerLink="/admin" fragment="offers" class="nav-link" [class.active]="activeTab() === 'offers'" (click)="setActiveTab('offers')">
              <fa-icon [icon]="faGift" class="nav-icon"></fa-icon>
              <span>Offers</span>
            </a>
            <a routerLink="/admin" fragment="analytics" class="nav-link" [class.active]="activeTab() === 'analytics'" (click)="setActiveTab('analytics')">
              <fa-icon [icon]="faChartBar" class="nav-icon"></fa-icon>
              <span>Analytics</span>
            </a>
            <a routerLink="/admin" fragment="settings" class="nav-link" [class.active]="activeTab() === 'settings'" (click)="setActiveTab('settings')">
              <fa-icon [icon]="faCog" class="nav-icon"></fa-icon>
              <span>Settings</span>
            </a>
          </div>
        </nav>
        
        <div class="sidebar-footer">
          <div class="admin-profile">
            <div class="profile-avatar">{{ auth.user()?.name?.charAt(0)?.toUpperCase() || 'A' }}</div>
            <div class="profile-info">
              <span class="profile-name">{{ auth.user()?.name }}</span>
              <span class="profile-role">Administrator</span>
            </div>
          </div>
          <button class="logout-btn" (click)="auth.logout()">
            <fa-icon [icon]="faDoorOpen" class="logout-icon"></fa-icon>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="admin-main">
        <!-- Enhanced Topbar -->
        <header class="admin-header">
          <div class="header-content">
            <div class="header-left">
              <h1 class="page-title">Admin Dashboard</h1>
              <p class="page-subtitle">Manage appointments and create offers</p>
            </div>
            <div class="header-right">
              <div class="stats-summary">
                <div class="stat-item">
                  <span class="stat-value">{{ appointments().length }}</span>
                  <span class="stat-label">Total Bookings</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ appointments().filter(a => a.status === 'pending').length }}</span>
                  <span class="stat-label">Pending</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ appointments().filter(a => a.status === 'confirmed').length }}</span>
                  <span class="stat-label">Confirmed</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ appointments().filter(a => a.status === 'completed').length }}</span>
                  <span class="stat-label">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Appointments Section -->
        @if (activeTab() === 'appointments') {
        <section class="content-section" id="appointments">
          <div class="section-header">
            <div class="section-title">
              <h2>Manage Appointments</h2>
              <p>Update booking statuses and manage customer appointments</p>
            </div>
            <div class="section-actions">
              <button class="btn-secondary" (click)="loadAll()">
                <fa-icon [icon]="faRotate" class="btn-icon"></fa-icon>
                Refresh
              </button>
              <button class="btn-primary" (click)="exportAppointments()">
                <fa-icon [icon]="faDownload" class="btn-icon"></fa-icon>
                Export
              </button>
            </div>
          </div>
          
          <!-- Filter and Search -->
          <div class="filter-bar">
            <div class="filter-group">
              <select class="form-select" (change)="filterByStatus($any($event.target).value)">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div class="filter-group">
              <input type="text" class="form-input" placeholder="Search appointments..." #searchInput (input)="searchAppointments(searchInput.value)">
            </div>
          </div>
          
          <div class="appointments-grid">
            @for (item of filteredAppointments(); track item._id) {
              <div class="appointment-card" [class]="'status-' + item.status">
                <div class="card-header">
                  <div class="customer-info">
                    <div class="customer-avatar">{{ item.user?.name?.charAt(0)?.toUpperCase() || 'U' }}</div>
                    <div class="customer-details">
                      <h4>{{ item.user?.name }}</h4>
                      <p>{{ item.user?.email }}</p>
                    </div>
                  </div>
                  <div class="status-badge" [class]="'status-' + item.status">
                    {{ item.status }}
                  </div>
                </div>
                
                <div class="card-body">
                  <div class="appointment-details">
                    <div class="detail-item">
                      <span class="detail-label">Service</span>
                      <span class="detail-value">{{ item.service }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Stylist</span>
                      <span class="detail-value">{{ item.stylist }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Date</span>
                      <span class="detail-value">{{ item.appointmentDate | date: 'medium' }}</span>
                    </div>
                    @if (item.notes) {
                    <div class="detail-item">
                      <span class="detail-label">Notes</span>
                      <span class="detail-value">{{ item.notes }}</span>
                    </div>
                    }
                  </div>
                </div>
                
                <div class="card-footer">
                  <select class="status-select" [value]="item.status" (change)="setStatus(item._id, $any($event.target).value)">
                    <option value="pending"><fa-icon [icon]="faClock"></fa-icon> Pending</option>
                    <option value="confirmed"><fa-icon [icon]="faCheck"></fa-icon> Confirmed</option>
                    <option value="completed"><fa-icon [icon]="faStar"></fa-icon> Completed</option>
                    <option value="cancelled"><fa-icon [icon]="faTimes"></fa-icon> Cancelled</option>
                  </select>
                  <button class="btn-outline" (click)="viewAppointmentDetails(item)">
                    View Details
                  </button>
                </div>
              </div>
            } @empty {
              <div class="empty-state">
                <div class="empty-icon"><fa-icon [icon]="faCalendar"></fa-icon></div>
                <h3>No appointments found</h3>
                <p>Appointments will appear here when customers book services.</p>
              </div>
            }
          </div>
        </section>
        }

        <!-- Offers Section -->
        @if (activeTab() === 'offers') {
        <section class="content-section" id="offers">
          <div class="section-header">
            <div class="section-title">
              <h2>Create New Offer</h2>
              <p>Design attractive offers to engage customers</p>
            </div>
          </div>
          
          <form class="offer-form" [formGroup]="offerForm" (ngSubmit)="postOffer()">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Offer Title</label>
                <input type="text" class="form-input" formControlName="title" placeholder="e.g., Summer Glow Package" />
              </div>
              
              <div class="form-group">
                <label class="form-label">Valid Until</label>
                <input type="date" class="form-input" formControlName="validUntil" />
              </div>
              
              <div class="form-group">
                <label class="form-label">Discount Type</label>
                <select class="form-select" formControlName="discountType">
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label">Discount Value</label>
                <input type="number" class="form-input" formControlName="discountValue" placeholder="10" />
              </div>
              
              <div class="form-group full-width">
                <label class="form-label">Description</label>
                <textarea class="form-textarea" formControlName="description" rows="4" placeholder="Describe your offer in detail..."></textarea>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-primary" [disabled]="offerForm.invalid">
                <fa-icon [icon]="faGift" class="btn-icon"></fa-icon>
                Publish Offer
              </button>
              <button type="button" class="btn-secondary" (click)="offerForm.reset()">
                Clear Form
              </button>
            </div>
          </form>
          
          <!-- Recent Offers -->
          <div class="recent-offers">
            <h3>Recent Offers</h3>
            <div class="offers-list">
              @for (offer of recentOffers(); track offer._id) {
                <div class="offer-item">
                  <div class="offer-info">
                    <h4>{{ offer.title }}</h4>
                    <p>{{ offer.description }}</p>
                    <span class="offer-date">Valid until: {{ offer.validUntil | date: 'medium' }}</span>
                  </div>
                  <div class="offer-actions">
                    <button class="btn-outline" (click)="editOffer(offer)">Edit</button>
                    <button class="btn-outline" (click)="deleteOffer(offer._id)">Delete</button>
                  </div>
                </div>
              } @empty {
                <p>No offers created yet.</p>
              }
            </div>
          </div>
        </section>
        }
        
        <!-- Analytics Section -->
        @if (activeTab() === 'analytics') {
        <section class="content-section" id="analytics">
          <div class="section-header">
            <div class="section-title">
              <h2>Analytics Dashboard</h2>
              <p>Track your business performance and customer insights</p>
            </div>
          </div>
          
          <div class="analytics-grid">
            <div class="analytics-card">
              <h3>Booking Trends</h3>
              <div class="chart-placeholder">
                <div class="chart-icon"><fa-icon [icon]="faChartLine"></fa-icon></div>
                <p>Booking trends over time</p>
              </div>
            </div>
            
            <div class="analytics-card">
              <h3>Service Popularity</h3>
              <div class="service-stats">
                @for (service of serviceStats(); track service.name) {
                  <div class="service-stat-item">
                    <span class="service-name">{{ service.name }}</span>
                    <div class="service-bar">
                      <div class="service-progress" [style.width.%]="service.percentage"></div>
                    </div>
                    <span class="service-count">{{ service.count }}</span>
                  </div>
                }
              </div>
            </div>
            
            <div class="analytics-card">
              <h3>Revenue Overview</h3>
              <div class="revenue-stats">
                <div class="revenue-item">
                  <span class="revenue-label">This Month</span>
                  <span class="revenue-value">₹{{ monthlyRevenue() }}</span>
                </div>
                <div class="revenue-item">
                  <span class="revenue-label">This Year</span>
                  <span class="revenue-value">₹{{ yearlyRevenue() }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        }
        
        <!-- Settings Section -->
        @if (activeTab() === 'settings') {
        <section class="content-section" id="settings">
          <div class="section-header">
            <div class="section-title">
              <h2>Settings</h2>
              <p>Manage your salon settings and preferences</p>
            </div>
          </div>
          
          <div class="settings-grid">
            <div class="setting-card">
              <h3>Business Information</h3>
              <form class="settings-form" [formGroup]="businessSettings">
                <div class="form-group">
                  <label class="form-label">Salon Name</label>
                  <input type="text" class="form-input" formControlName="salonName" />
                </div>
                <div class="form-group">
                  <label class="form-label">Contact Email</label>
                  <input type="email" class="form-input" formControlName="contactEmail" />
                </div>
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" class="form-input" formControlName="phoneNumber" />
                </div>
                <button type="button" class="btn-primary" (click)="saveBusinessSettings()">Save Changes</button>
              </form>
            </div>
            
            <div class="setting-card">
              <h3>Working Hours</h3>
              <div class="hours-list">
                @for (day of workingDays(); track day.name) {
                  <div class="hours-item">
                    <span class="day-name">{{ day.name }}</span>
                    <div class="hours-time">
                      <input type="time" class="time-input" [value]="day.open" disabled />
                      <span>to</span>
                      <input type="time" class="time-input" [value]="day.close" disabled />
                    </div>
                  </div>
                }
              </div>
              <button type="button" class="btn-primary" (click)="updateHours()">Update Hours</button>
            </div>
          </div>
        </section>
        }

        @if (selectedAppointment(); as selected) {
          <div class="modal-overlay" (click)="closeDetailsModal()">
            <div class="modal-card appointment-modal" (click)="$event.stopPropagation()">
              <div class="modal-header">
                <h3>Appointment Details</h3>
                <button type="button" class="modal-close" (click)="closeDetailsModal()">×</button>
              </div>
              <div class="modal-content">
                <div class="detail-item">
                  <span class="detail-label">Booking ID</span>
                  <span class="detail-value">{{ selected._id }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Customer</span>
                  <span class="detail-value">{{ selected.user?.name }} ({{ selected.user?.email }})</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Service</span>
                  <span class="detail-value">{{ selected.service }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Stylist</span>
                  <span class="detail-value">{{ selected.stylist }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Date & Time</span>
                  <span class="detail-value">{{ selected.appointmentDate | date: 'full' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Status</span>
                  <span class="status-badge status-{{ selected.status }}">{{ selected.status }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Notes</span>
                  <span class="detail-value">{{ selected.notes || 'No notes provided' }}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </main>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  // FontAwesome icons
  readonly faStar = faStar;
  readonly faCalendar = faCalendar;
  readonly faGift = faGift;
  readonly faChartBar = faChartBar;
  readonly faCog = faCog;
  readonly faDoorOpen = faDoorOpen;
  readonly faRotate = faRotate;
  readonly faDownload = faDownload;
  readonly faClock = faClock;
  readonly faCheck = faCheck;
  readonly faTimes = faTimes;
  readonly faChartLine = faChartLine;

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly appointmentService = inject(AppointmentService);
  private readonly offerService = inject(OfferService);
  readonly auth = inject(AuthService);
  readonly activeTab = signal<'appointments' | 'offers' | 'analytics' | 'settings'>('appointments');
  readonly filteredAppointments = signal<Appointment[]>([]);
  readonly recentOffers = signal<any[]>([]);
  readonly searchTerm = signal('');
  readonly statusFilter = signal('');
  readonly editingOfferId = signal<string | null>(null);
  readonly selectedAppointment = signal<Appointment | null>(null);

  readonly appointments = signal<Appointment[]>([]);
  readonly offerForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    validUntil: ['', [Validators.required]],
    discountType: ['percentage', [Validators.required]],
    discountValue: [10, [Validators.required, Validators.min(1)]]
  });
  readonly businessSettings = this.fb.group({
    salonName: ['Glow Studio'],
    contactEmail: ['info@glowstudio.com'],
    phoneNumber: ['+1 234 567 8900']
  });

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (
        fragment === 'appointments' ||
        fragment === 'offers' ||
        fragment === 'analytics' ||
        fragment === 'settings'
      ) {
        this.activeTab.set(fragment);
        return;
      }
      this.activeTab.set('appointments');
    });
    this.loadSettings();
    this.loadAll();
    this.loadOffers();
  }

  setActiveTab(tab: 'appointments' | 'offers' | 'analytics' | 'settings') {
    this.activeTab.set(tab);
  }

  setStatus(id: string, status: Appointment['status']) {
    this.appointmentService.updateStatus(id, status).subscribe(() => this.loadAll());
  }

  postOffer() {
    if (this.offerForm.invalid) return;
    const payload = this.offerForm.getRawValue() as { title: string; description: string; validUntil: string };
    const offerId = this.editingOfferId();
    const request$ = offerId
      ? this.offerService.update(offerId, payload)
      : this.offerService.create(payload);

    request$.subscribe(() => {
      this.offerForm.reset({ discountType: 'percentage', discountValue: 10 });
      this.editingOfferId.set(null);
      this.loadOffers();
    });
  }

  loadAll() {
    this.appointmentService.all().subscribe((data) => {
      this.appointments.set(data);
      this.filteredAppointments.set(data);
    });
  }

  loadOffers() {
    this.offerService.getAll().subscribe((offers) => this.recentOffers.set(offers));
  }
  
  filterByStatus(status: string) {
    this.statusFilter.set(status);
    this.applyFilters();
  }
  
  searchAppointments(term: string) {
    this.searchTerm.set(term.toLowerCase());
    this.applyFilters();
  }
  
  private applyFilters() {
    let filtered = this.appointments();
    
    if (this.statusFilter()) {
      filtered = filtered.filter(a => a.status === this.statusFilter());
    }
    
    if (this.searchTerm()) {
      filtered = filtered.filter(a => 
        a.user?.name?.toLowerCase().includes(this.searchTerm()) ||
        a.user?.email?.toLowerCase().includes(this.searchTerm()) ||
        a.service?.toLowerCase().includes(this.searchTerm()) ||
        a.stylist?.toLowerCase().includes(this.searchTerm())
      );
    }
    
    this.filteredAppointments.set(filtered);
  }
  
  exportAppointments() {
    const data = this.filteredAppointments();
    const csv = [
      ['Customer Name', 'Email', 'Service', 'Stylist', 'Date', 'Status', 'Notes'],
      ...data.map(a => [
        a.user?.name || '',
        a.user?.email || '',
        a.service || '',
        a.stylist || '',
        new Date(a.appointmentDate).toLocaleString(),
        a.status || '',
        a.notes || ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  viewAppointmentDetails(appointment: Appointment) {
    this.selectedAppointment.set(appointment);
  }

  closeDetailsModal() {
    this.selectedAppointment.set(null);
  }
  
  serviceStats() {
    const stats = this.appointments().reduce((acc, appointment) => {
      acc[appointment.service] = (acc[appointment.service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const total = this.appointments().length;
    return Object.entries(stats).map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0
    }));
  }
  
  monthlyRevenue() {
    return Math.floor(Math.random() * 10000) + 5000;
  }
  
  yearlyRevenue() {
    return Math.floor(Math.random() * 120000) + 60000;
  }
  
  workingDays() {
    return [
      { name: 'Monday', open: '09:00', close: '18:00' },
      { name: 'Tuesday', open: '09:00', close: '18:00' },
      { name: 'Wednesday', open: '09:00', close: '18:00' },
      { name: 'Thursday', open: '09:00', close: '18:00' },
      { name: 'Friday', open: '09:00', close: '18:00' },
      { name: 'Saturday', open: '10:00', close: '16:00' },
      { name: 'Sunday', open: 'Closed', close: 'Closed' }
    ];
  }
  
  editOffer(offer: any) {
    this.editingOfferId.set(offer._id);
    this.offerForm.patchValue({
      title: offer.title,
      description: offer.description,
      validUntil: String(offer.validUntil).slice(0, 10)
    });
    this.activeTab.set('offers');
  }
  
  deleteOffer(offerId: string) {
    if (!confirm('Delete this offer?')) return;
    this.offerService.remove(offerId).subscribe(() => {
      if (this.editingOfferId() === offerId) {
        this.editingOfferId.set(null);
        this.offerForm.reset({ discountType: 'percentage', discountValue: 10 });
      }
      this.loadOffers();
    });
  }

  saveBusinessSettings() {
    localStorage.setItem('adminBusinessSettings', JSON.stringify(this.businessSettings.getRawValue()));
    alert('Business information saved.');
  }

  updateHours() {
    const current = this.workingDays();
    localStorage.setItem('adminWorkingHours', JSON.stringify(current));
    alert('Working hours updated.');
  }

  private loadSettings() {
    const raw = localStorage.getItem('adminBusinessSettings');
    if (!raw) return;
    this.businessSettings.patchValue(JSON.parse(raw));
  }
}
