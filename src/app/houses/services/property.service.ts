import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { environment } from '@environments/environment';
import Property, {
  Ngr,
  getStatusByIndex, getTopologyFromIndex, getNgrByString,
} from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  path = `${environment.api}/property`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Property[]> {
    const observable = this.http.get<Property[]>(this.path);
    const propMap = map((props: Property[]) => props.map(p => this.adapt(p)));

    return observable.pipe(propMap, retry(3));
  }

  private adapt(p): Property {
    return new Property(
      p._id,
      p.title,
      p.url,
      getNgrByString(p.energeticCertificate),
      p.price,
      new Date(p.createAt),
      getTopologyFromIndex(p.topology),
      getStatusByIndex(p.status),
      p.notificated
    );
  }
}
