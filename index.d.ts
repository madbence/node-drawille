class Canvas {
  constructor(width: number, height: number);

  width: number;
  height: number;

  // Clear the state within this monad
  clear(): void;

  // Gather the current frame represented as braille chars
  frame(delimiter?: string): string;

  // Frame manipulation
  set(x: number, y: number): void;
  unset(x: number, y: number): void;
  toggle(x: number, y: number): void;
}

export default Canvas