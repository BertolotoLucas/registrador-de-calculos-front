import { Injectable } from '@angular/core';
import { Calculo } from '../model/calculo';
import { Observable,of } from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { PageCalculo } from '../model/page-calculo';
@Injectable({
  providedIn: 'root'
})
export class CalculoService {
  private calculosURL = "https://safe-brook-70758.herokuapp.com/calculos";
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'}),
  };

  constructor(private httpClient:HttpClient) {}

  getCalculos() : Observable<Calculo[]> {
    return this.httpClient.get<Calculo[]>(this.calculosURL).pipe(
      //tap(_ => console.log('fetched calculos')),
      catchError(this.handleError<Calculo[]>("getCalculos",[]))
    ); 
  }

  addCalculo(calculo:Calculo) : Observable<Calculo> {
    return this.httpClient.post<Calculo>(this.calculosURL,calculo,this.httpOptions).pipe(
      //tap((newCalculo: Calculo) => console.log(`added calculo w/ id=${newCalculo.id}`)),
      catchError(this.handleError<Calculo>("addCalculo"))
    );
  }
  
  
  getCalculosPage(page=0, size=8) : Observable<PageCalculo>{
    return this.httpClient.get<PageCalculo>(`${this.calculosURL}?page=${page}&size=${size}`).pipe(
      //tap(_ => console.log('fetched PageCalculo')),
      catchError(this.handleError<PageCalculo>("getCalculosPage"))
    )
  }

  searchCalculoByNome(nome:string,page=0, size=8): Observable<PageCalculo>{
    if(!nome.trim()){
      return this.getCalculosPage();
    }
    return this.httpClient.get<PageCalculo>(`${this.calculosURL}?page=${page}&size=${size}&nomePessoa=${nome}`).pipe(
      //tap(x => x.calculos?.length ?
      //  console.log(`Calculos encontrados com o nome "${nome}"`) :
      //  console.log(`Calculos encontrados não encontrados "${nome}"`)),
      catchError(this.handleError<PageCalculo>('searchCalculoByName'))
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

