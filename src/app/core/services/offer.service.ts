import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Offer {
  _id: string;
  title: string;
  description: string;
  validUntil: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class OfferService {
  private readonly api = 'http://localhost:5000/api/offers';

  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<Offer[]>(this.api);
  }

  create(payload: { title: string; description: string; validUntil: string }) {
    return this.http.post<Offer>(this.api, payload);
  }

  update(id: string, payload: { title: string; description: string; validUntil: string }) {
    return this.http.put<Offer>(`${this.api}/${id}`, payload);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
