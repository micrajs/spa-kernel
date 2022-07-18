import type {Location} from 'history';

export const normalizePathname = (pathname: string): string =>
  pathname.replace(/\/+$/, '').replace(/^\/*/, '/');

export function createRequestFromLocation(location?: Location) {
  const url = new URL(
    normalizePathname(location?.pathname ?? window.location.pathname),
    window.location.origin,
  );
  url.hash = location?.hash ?? window.location.hash;
  url.search = location?.search ?? window.location.search;

  return new Request(url.toString());
}
