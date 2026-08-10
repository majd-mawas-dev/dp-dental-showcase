export const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

export function appPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export function currentAppPath() {
  if (!basePath) {
    return window.location.pathname;
  }

  const path = window.location.pathname;
  if (path === basePath) {
    return "/";
  }

  return path.startsWith(`${basePath}/`) ? path.slice(basePath.length) : path;
}
