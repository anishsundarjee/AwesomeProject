export const clamp = (x, min, max) => {
    "worklet";
    if (x < min) return min;
    if (x > max) return max;
    return x;
};
  