import { debounce, throttle, memoize } from '../performance';

describe('performance', () => {
  describe('debounce', () => {
    jest.useFakeTimers();

    it('delays execution', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);

      debounced();
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('resets timer on repeated calls', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);

      debounced();
      jest.advanceTimersByTime(50);
      debounced();
      jest.advanceTimersByTime(50);
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('limits calls', () => {
      jest.useFakeTimers();
      const fn = jest.fn();
      const throttled = throttle(fn, 100);

      throttled();
      throttled();
      throttled();

      expect(fn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('memoize', () => {
    it('caches results', () => {
      const fn = jest.fn((x: number) => x * 2);
      const memoized = memoize(fn);

      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('handles different arguments', () => {
      const fn = jest.fn((x: number) => x * 2);
      const memoized = memoize(fn);

      memoized(5);
      memoized(10);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
