import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

import { Url, Response } from '../models/Shortener'

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ShortenerService {
  cuttlinkAPI: string = environment.API_URL

  constructor(private http: HttpClient) {}

  getLongUrl(urlCode: string): Observable<Response> {
    return this.http.get<Response>(`${this.cuttlinkAPI}/${urlCode}`)
  }

  shortenUrl(longUrl: Url): Observable<Response> {
    return this.http.post<Response>(
      `${this.cuttlinkAPI}/shortn`,
      longUrl,
      HttpOptions
    )
  }
}
