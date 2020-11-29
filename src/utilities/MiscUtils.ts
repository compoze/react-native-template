export function stringToBoolean(str: string) {
  switch (str.toLowerCase().trim()) {
    case 'true' || 'yes' || '1' || 'on':
      return true;
    case 'false' || 'no' || '0' || 'off' || null || undefined:
      return false;
    default:
      return Boolean(str);
  }
}

export function isEmpty(str: string) {
  const s = str.trim();
  try {
    return !(s) || s === '' || s.length === 0;
  } catch (e) {
    return true;
  }
}