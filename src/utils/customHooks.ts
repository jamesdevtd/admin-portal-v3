import { useRef, useState } from 'react';

export function usePrevious(value: number) {
  const currentRef = useRef<number>(value);
  const previousRef = useRef<number>();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}

export function useArray(defaultValue: unknown[]) {
  const [array, setArray] = useState(defaultValue);

  function push(element: unknown) {
    setArray((a) => [...a, element]);
  }

  function filter(callback: any) {
    setArray((a) => a.filter(callback));
  }

  function update(index: number, newElement: unknown) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }

  function remove(index: number) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, push, filter, update, remove, clear };
}
