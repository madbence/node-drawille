export default class Canvas {
	/**
	Create a new canvas with the given dimensions.

	@param width - must be multiple of 2, defaults to stdout columns.
	@param height - must be multiple of 4, defaults to stdout rows.
	*/
	constructor(width?: number, height?: number);

	/**
	Width of the canvas.
	*/
	width: number;

	/**
	Height of the canvas.
	*/
	height: number;

	/**
	Remove all points on the canvas.
	*/
	clear(): void;

	/**
	It uses braille characters to represent points, so every line has length of w/2, and the string contains h/4 lines.

	@param delimiter - defaults to \n.
	@returns the current content of the canvas, as a delimiter-delimited string.
	*/
	frame(delimiter?: string): string;

	/**
	Draw point on canvas at the given position.

	@param x - Horizontal position.
	@param y - Vertical position.
	*/
	set(x: number, y: number): void;

	/**
	Delete point on canvas at the given position.

	@param x - Horizontal position.
	@param y - Vertical position.
	*/
	unset(x: number, y: number): void;

	/**
	Toggle point on canvas at the given position.

	@param x - Horizontal position.
	@param y - Vertical position.
	*/
	toggle(x: number, y: number): void;
}
