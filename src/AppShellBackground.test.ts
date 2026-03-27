import { describe, expect, it } from 'vitest';
import { getOutletBackgroundClass } from './App';

describe('App outlet background', () => {
  it('uses transparent background for non-home routes by default', () => {
    expect(getOutletBackgroundClass(false)).toBe('bg-transparent');
  });

  it('keeps homepage outlet transparent', () => {
    expect(getOutletBackgroundClass(true)).toBe('bg-transparent');
  });
});
