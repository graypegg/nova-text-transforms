import { MockDisposable } from "./Disposable.mock"

export class MockTextDocument implements TextDocument {
  public length: number

  constructor (
    public content: string = 'abcdefghijklmnopqrstuvwxyz ailurus',
    public uri: string = 'http://graypegg.com/ailurus/fulgens.ts',
    public path: string | null = '/ailurus/fulgens.ts',
    public isRemote: boolean = false,
    public isDirty: boolean = false,
    public isEmpty: boolean = false,
    public isUntitled: boolean = false,
    public isClosed: boolean = false,
    public eol: string = '',
    public syntax: string | null = 'typescript'
  ) {
    this.length = content.length
  }
  getTextInRange = jest.fn((range: Range) => {
    return this.content.substring(range.start, range.end)
  })
  getLineRangeForRange = jest.fn((range) => range)
  onDidChangePath = jest.fn(() => new MockDisposable())
  onDidChangeSyntax = jest.fn(() => new MockDisposable())
}
