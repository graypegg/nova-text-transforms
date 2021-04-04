import { MockTextDocument } from "../../mocks/TextDocument.mock"
import { MockTextEdit } from "../../mocks/TextEdit.mock"
import { MockTextEditor } from "../../mocks/TextEditor.mock"
import { LowercaseTransform } from "./Lowercase"

describe('Lowercase', () => {
  let transform: LowercaseTransform

  beforeEach(() => {
    (global as any).TextEdit = MockTextEdit
    transform = new LowercaseTransform()
  })

  test('convert from lowercase to uppercase', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('AILURUS')
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit[0].newText).toEqual('ailurus')
  })
})