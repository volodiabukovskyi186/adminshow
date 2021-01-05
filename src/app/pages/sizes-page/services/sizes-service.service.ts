import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SizesServiceService {
    selected: any;

    constructor(private http: HttpClient) {
    }

    bSubject = new BehaviorSubject({selectedOrder: this.selected});

    initEmptySizeForm() {
        this.selected = {
            group_id: null,
            sort_order: null,
            descriptions: [
                {
                    name: null,
                    lang_id: 1,
                },
                {
                    name: null,
                    lang_id: 2,
                },
                {
                    name: null,
                    lang_id: 3,
                },
                {
                    name: null,
                    lang_id: 4,
                }
            ]
        };
        this.bSubject.next(this.selected);
    }

    getSizes(): Observable<any> {
        return this.http.get(environment.sizes.sizes);
    }
    createSize(newSize: any): Observable<any> {
        return  this.http.post(environment.sizes.size, newSize);
    }
    updateSize(newSize: any, id: number): Observable<any> {
        return  this.http.put(`${environment.sizes.size}/${id}`, newSize);
    }
    deleteSize(id: number): Observable <number> {
        return this.http.delete<number>(`${environment.sizes.size}/${id}`);
    }
}
