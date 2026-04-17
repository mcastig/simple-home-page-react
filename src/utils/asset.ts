const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const asset = (filename: string): string =>
  `${base}/${filename.replace(/^\//, '')}`;
