import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Appointment {
  _id: string;
  service: string;
  stylist: string;
  appointmentDate: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  user?: { name: string; email: string };
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly api = 'http://localhost:5000/api/appointments';

  constructor(private readonly http: HttpClient) {}

  create(payload: { service: string; stylist: string; appointmentDate: string; notes?: string }) {
    return this.http.post<{ message: string; appointment: Appointment }>(this.api, payload);
  }

  mine() {
    return this.http.get<Appointment[]>(`${this.api}/mine`);
  }

  all() {
    return this.http.get<Appointment[]>(this.api);
  }

  updateStatus(id: string, status: Appointment['status']) {
    return this.http.patch<Appointment>(`${this.api}/${id}/status`, { status });
  }
}
