/** Người dùng bật "giảm chuyển động" trong hệ điều hành thì tắt hiệu ứng. */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
