const mapping: Record<string, string> = {
  organizations: 'organization',
  stickers: 'sticker',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
