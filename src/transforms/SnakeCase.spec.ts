import { MockTextDocument } from "../../mocks/TextDocument.mock"
import { MockTextEdit } from "../../mocks/TextEdit.mock"
import { MockTextEditor } from "../../mocks/TextEditor.mock"
import { SnakeCaseTransform } from "./SnakeCase"

describe('SnakeCase', () => {
  let transform: SnakeCaseTransform

  beforeEach(() => {
    (global as any).TextEdit = MockTextEdit
    transform = new SnakeCaseTransform()
  })

  test('convert from lowercase to uppercase', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('ailurus')
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit[0].newText).toEqual('AILURUS')
  })
  
  describe('from camel case', () => {
    test('convert from camel case', () => {
      const editor = new MockTextEditor(
        new MockTextDocument('ailurusFulgens')
      )
      
      const edit = transform.makeEdit(editor)
      expect(edit[0].newText).toEqual('AILURUS_FULGENS')
    })
  })

  describe('spaces', () => {
    test('replace spaces with an underscore', () => {
      const editor = new MockTextEditor(
        new MockTextDocument('AILURUS FULGENS')
      )
      
      const edit = transform.makeEdit(editor)
      expect(edit[0].newText).toEqual('AILURUS_FULGENS')
    })
  
    test('collapse all spaces to one underscore', () => {
      const editor = new MockTextEditor(
        new MockTextDocument('AI  LURUS      FULG ENS')
      )
      
      const edit = transform.makeEdit(editor)
      expect(edit[0].newText).toEqual('AI_LURUS_FULG_ENS')
    })
  })

  test('remove special characters', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('VALID I!NV^A/LI!D')
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit[0].newText).toEqual('VALID_INVALID')
  })
})