export const sanitizeQuery = str =>
  str.replace(/\s+/g, "+").replace(/[^a-zA-Z0-9+]/g, "")

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1)
