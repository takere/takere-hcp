const width = {
  small: '50px',
  big: '100%'
}

export function buildWidth(type) {
  if (width[type] === undefined) {
    return null;
  }

  return { width: width[type] };
}
