export const space = {
  px: '1px',
  0.5: '0.09375rem',
  1: '0.1875rem',
  1.5: '0.28125rem',
  2: '0.375rem',
  2.5: '0.46875rem',
  3: '0.5625rem',
  3.5: '0.65625rem',
  4: '0.75rem',
  5: '0.9375rem',
  6: '1.125rem',
  7: '1.3125rem',
  8: '1.5rem',
  9: '1.6875rem',
  10: '1.875rem',
  12: '2.25rem',
  14: '2.625rem',
  16: '3rem',
  20: '3.75rem',
  24: '4.5rem',
  28: '5.25rem',
  32: '6rem',
  36: '6.75rem',
  40: '7.5rem',
  44: '8.25rem',
  48: '9rem',
  52: '9.75rem',
  56: '10.5rem',
  60: '11.25rem',
  64: '12rem',
  72: '13.5rem',
  80: '15rem',
  96: '18rem',
};

const getSpaceValues = (fractionOfDefault = 0.75) => {
  const spaceKeys = [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28,
    32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
  ];

  const spaceObject = spaceKeys.reduce(
    (acc, val) => {
      acc[val] = `${val * (0.25 * fractionOfDefault)}rem`;
      return acc;
    },
    {} as Record<string, string>
  );

  return spaceObject;
};
