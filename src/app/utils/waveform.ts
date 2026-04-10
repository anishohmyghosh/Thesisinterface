// Standardized waveform data generation
// This ensures waveforms don't change on re-renders or interactions

export function generateWaveformData(length: number, seed: number = 0): number[] {
  // Simple seeded pseudo-random number generator
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  return Array.from({ length }, (_, i) => {
    const value = seededRandom(seed + i * 0.1);
    // Return values between 20 and 100 for height percentage
    return value * 80 + 20;
  });
}

// Pre-generated standard waveforms for common use cases
export const STANDARD_WAVEFORMS = {
  short: generateWaveformData(60, 42),
  medium: generateWaveformData(80, 42),
  long: generateWaveformData(120, 42),
};
