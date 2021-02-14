import { MockRange } from "./Range.mock";

export class MockTextEdit implements TextEdit {
  constructor (
    public range: Range = new MockRange(),
    public newText: string = 'a'
  ) { }
}