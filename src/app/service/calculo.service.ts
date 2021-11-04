import { Injectable } from '@angular/core';
import { Calculo } from '../model/calculo';
import { Observable,of } from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {
  private calculosURL = "http://localhost:8080/calculos";

  constructor(private httpClient:HttpClient) {}

  getCalculos() : Observable<Calculo[]> {
    return this.httpClient.get<Calculo[]>(this.calculosURL).pipe(
      tap(_ => console.log('fetched calculos')),
      catchError(this.handleError<Calculo[]>("getCalculos",[]))
    ); 
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

