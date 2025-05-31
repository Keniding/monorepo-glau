import { signal, computed } from '@angular/core';

export function useSkeleton<T>(delay = 800) {
  const loading = signal(true);
  const data = signal<T | null>(null);

  setTimeout(() => {
    loading.set(false);
  }, delay);

  return {
    loading: computed(() => loading()),
    data: computed(() => data()),
    setData: (val: T) => data.set(val),
  };
}
