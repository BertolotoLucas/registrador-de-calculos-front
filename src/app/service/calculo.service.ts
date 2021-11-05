import { Injectable } from '@angular/core';
import { Calculo } from '../model/calculo';
import { Observable,of } from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CalculoService {
  private calculosURL = "http://localhost:8080/calculos";
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'}),
  };

  constructor(private httpClient:HttpClient) {}

  getCalculos() : Observable<Calculo[]> {
    return this.httpClient.get<Calculo[]>(this.calculosURL).pipe(
      tap(_ => console.log('fetched calculos')),
      catchError(this.handleError<Calculo[]>("getCalculos",[]))
    ); 
  }

  addCalculo(calculo:Calculo) : Observable<Calculo> {
    return this.httpClient.post<Calculo>(this.calculosURL,calculo,this.httpOptions).pipe(
      //tap((newCalculo: Calculo) => console.log(`added calculo w/ id=${newCalculo.id}`)),
      catchError(this.handleError<Calculo>("addCalculo"))
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

