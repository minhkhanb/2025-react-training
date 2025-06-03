type Priority = '' | 'low' | 'medium' | 'high';

export function isPriority(value: unknown): value is Priority {
  return typeof value === 'string' && ['low', 'medium', 'high', ''].includes(value);
}
