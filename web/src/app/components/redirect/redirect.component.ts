import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map } from 'rxjs/operators'
import { ShortenerService } from '../../services/shortener.service'

@Component({
  selector: 'app-redirect',
  template: 'redirecting...'
})
export class RedirectComponent implements OnInit {
  urlcode$!: string | undefined

  constructor(
    private route: ActivatedRoute,
    private shortenService: ShortenerService
  ) {
    this.route.paramMap
      .pipe(map((params: ParamMap) => params.get('urlCode')))
      .subscribe(urlcode => {
        if (urlcode) {
          this.urlcode$ = urlcode
        }
      })
  }

  ngOnInit(): void {
    if (this.urlcode$) {
      this.shortenService.getLongUrl(this.urlcode$).subscribe(response => {
        if (response.status === 200) {
          window.location.href = response.message.long_url
        }
      })
    }
  }
}
