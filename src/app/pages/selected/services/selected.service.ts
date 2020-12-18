import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SelectedService {
    data = {
        count: 0,
        data: [],
        skip: 0,
        take: 10,
    };
    page = 1;
    constructor(private http: HttpClient) {

    }
    getSelectedProducts(filter?: any ): Observable<any> {
        let params = `?take=${this.data.take}&skip=${this.data.skip}`;
        if (filter) {
            if (filter.date_end) {
                params = params + `&date_end=${filter.date_end}`;
            }
            if (filter.date_start) {
                params = params + `&date_start=${filter.date_start}`;
            }
            if (filter.stuff) {
                params = params + `&products=[${filter.stuff}]`;
            }
        }
        return this.http.get<any>(environment.selected.selected + params);
    }

    getCustomerTable(): Observable<any> {
        return this.http.get(`${environment.host}wishlist/getXLSXFile`);
    }

}
