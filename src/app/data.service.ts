import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const DOMAIN = 'https://opentdb.com/';
export type difficulity = 'easy' | 'medium' | 'hard';

export interface ISelectedOptions {
  id: number, 
  difficulty: difficulity
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  categoryUrl: string = 'https://opentdb.com/api_category.php';

  constructor(private http: HttpClient) { }

  getCategory():Observable<any>{
    return this.http.get<any>(this.categoryUrl)
  }

  getQuestion( categoryId: number,  difficulty: difficulity):Observable<any>{
    return this.http.get<any>(`${DOMAIN}api.php?amount=10&category=${categoryId}&difficulty=${difficulty}`)
  }
}
