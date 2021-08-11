import { UrlSegment, UrlMatchResult } from '@angular/router'

export const HomePageMatcher = (segments: UrlSegment[]): UrlMatchResult => {
  if (segments.length === 0) {
    return {
      consumed: segments,
      posParams: {}
    }
  } else if (segments.length === 1) {
    return {
      consumed: segments,
      posParams: { id: segments[0] }
    }
  }
  return <UrlMatchResult>(null as any)
}
