import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ShortenerService } from '../../services/shortener.service'

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  longURL!: string
  shortURL!: string | undefined
  isClick!: boolean
  urlCopied!: boolean
  @ViewChild('copyBtn') copyBtn!: ElementRef // accessing the reference copyBtn element

  constructor(private shortenService: ShortenerService) {}

  ngOnInit(): void {
    this.isClick = false
    this.urlCopied = false
  }

  // Show Privacy Policy
  setClass() {
    return {
      'read-privacy-policy-info': this.isClick
    }
  }

  // Toggle Privacy Policy
  onTogglePrivacyPolicy(): void {
    this.isClick = !this.isClick
  }

  // Send Long Url To Server
  shortenLongUrl(): void {
    const data = { url: this.longURL }
    this.shortenService.shortenUrl(data).subscribe(response => {
      this.shortURL = response.message.short_url
    })
  }

  // Clear Long URL Input Field
  handleLongURLClear(): void {
    this.longURL = ''
  }

  // Copy To Clipboard
  copyToClipboard(e: { isSuccess: boolean }): void {
    setTimeout(() => {
      this.urlCopied = e.isSuccess
    }, 70)

    setTimeout(() => {
      this.urlCopied = false
    }, 1500)
  }

  // Copy To Clipboard Effect
  handleCopyToClipboardEffect(): void {
    this.copyBtn.nativeElement.classList.add('link-copy-effect')
  }
  handleCopyToClipboardEffectRemove(): void {
    this.copyBtn.nativeElement.classList.remove('link-copy-effect')
  }

  // Show Copy Success On Copy Btn
  copiedMsgSuccess() {
    return {
      'link-copy-success': this.urlCopied
    }
  }

  // Confirm Copy
  confirmCopy() {
    return {
      'shortener-bar': true,
      'confirm-copy': this.urlCopied
    }
  }

  // Refresh Shortening Bar Fields
  refreshBar(): void {
    this.longURL = ''
    this.shortURL = ''
  }
}
