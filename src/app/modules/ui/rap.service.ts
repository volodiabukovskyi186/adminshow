import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapService {
  SBurder=new Subject<boolean>();
  constructor() { }
}
