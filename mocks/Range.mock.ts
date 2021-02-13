export class MockRange implements Range {
  public length: number
  constructor (
    public start: number = 0,
    public end: number = 1,
    public empty: boolean = false
  ) {
    this.length = Math.abs(end - start)
  }
  isEqual = jest.fn((other: Range) => this.start === other.start && this.end === other.end)
  compare = jest.fn((other: Range) => this.start - other.start)
  containsRange = jest.fn((other: Range) => this.start <= other.start && this.end >= other.end)
  containsIndex = jest.fn((index: number) => this.start <= index && this.end >= index)
  union = jest.fn((other: Range) => new MockRange(
    Math.min(this.start, other.start),
    Math.max(this.end, other.end)
  ))
  intersection = jest.fn((other: Range) => new MockRange(
    Math.max(this.start, other.start),
    Math.min(this.end, other.end)
  ))
  intersectsRange = jest.fn((other: Range) => true)
}