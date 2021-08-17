import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map } from 'rxjs/operators'
import { ShortenerService } from '../../services/shortener.service'

@Component({
  selector: 'app-redirect',
  template: 'redirecting...'
})
export class RedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private shortenService: ShortenerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map((params: ParamMap) => params.get('urlCode')))
      .subscribe(urlcode => {
        if (urlcode) {
          this.shortenService.getLongUrl(urlcode).subscribe(response => {
            if (response.status === 200) {
              window.location.href = response.message.long_url
            }
          })
        }
      })
  }
}
