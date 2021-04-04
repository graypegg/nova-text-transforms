import { MockTextDocument } from "../../mocks/TextDocument.mock"
import { MockTextEdit } from "../../mocks/TextEdit.mock"
import { MockTextEditor } from "../../mocks/TextEditor.mock"
import { UppercaseTransform } from "./Uppercase"

describe('Uppercase', () => {
  let transform: UppercaseTransform

  beforeEach(() => {
    (global as any).TextEdit = MockTextEdit
    transform = new UppercaseTransform()
  })

  test('convert from lowercase to uppercase', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('ailurus')
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit[0].newText).toEqual('AILURUS')
  })
})