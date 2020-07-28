import { UrlMatchResult, UrlSegment } from "@angular/router";

export function langMatcher(segment: UrlSegment[]): UrlMatchResult {
  // If we don't have any segments
  if (!segment[0]) {
    return null;
  }

  let isLang = segment[0].path.match(/^(en|pl|ua|ru)$/gm);

  // if /pl or /en
  if (segment.length === 1 && isLang) {
    let result: UrlMatchResult = {
      consumed: segment,
      posParams: {
        lang: new UrlSegment(segment[0].path, {})
      }
    };

    return result;
  }
  // if /pl/smth or /en/smth
  else if (segment.length >= 1 && isLang) {
    let result: UrlMatchResult = {
      consumed: segment.slice(0, 1),
      posParams: {
        lang: new UrlSegment(segment[0].path, {})
      }
    };

    return result;
  }
  return null;
}
