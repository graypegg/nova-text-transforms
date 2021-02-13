import { MockDisposable } from './Disposable.mock'
import { MockRange } from './Range.mock'
import { MockTextDocument } from './TextDocument.mock'

export class MockTextEditor implements TextEditor {
  constructor (
    public document: TextDocument = new MockTextDocument(),
    public selectedRange: Range = new MockRange(),
    public selectedRanges: Range[] = [new MockRange()],
    public selectedText: string = 'a',
    public softTabs: boolean = true,
    public tabLength: number = 2,
    public tabText: string = ' '
  ) { }

  edit = jest.fn(() => new Promise<void>(res => res()))
  insert = jest.fn(() => new Promise<void>(res => res()))
  save = jest.fn(() => new Promise<void>(res => res()))
  getTextInRange = jest.fn(this.document.getTextInRange)
  getLineRangeForRange = jest.fn((range) => range)
  onDidChange = jest.fn(() => new MockDisposable())
  onDidStopChanging = jest.fn(() => new MockDisposable())
  onWillSave = jest.fn(() => new MockDisposable())
  onDidSave = jest.fn(() => new MockDisposable())
  onDidChangeSelection = jest.fn(() => new MockDisposable())
  onDidDestroy = jest.fn(() => new MockDisposable())
  addSelectionForRange = jest.fn(() => undefined)
  selectToPosition = jest.fn(() => undefined)
  selectUp = jest.fn(() => undefined)
  selectDown = jest.fn(() => undefined)
  selectLeft = jest.fn(() => undefined)
  selectRight = jest.fn(() => undefined)
  selectToTop = jest.fn(() => undefined)
  selectToBottom = jest.fn(() => undefined)
  selectAll = jest.fn(() => undefined)
  selectLinesContainingCursors = jest.fn(() => undefined)
  selectToBeginningOfLine = jest.fn(() => undefined)
  selectToEndOfLine = jest.fn(() => undefined)
  selectWordsContainingCursors = jest.fn(() => undefined)
  selectToBeginningOfWord = jest.fn(() => undefined)
  selectToEndOfWord = jest.fn(() => undefined)
  scrollToCursorPosition = jest.fn(() => undefined)
  scrollToPosition = jest.fn(() => undefined)
  symbolAtPosition = jest.fn(() => null)
  symbolsForSelectedRanges = jest.fn(() => [null])
}
