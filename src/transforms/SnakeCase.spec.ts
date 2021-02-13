import { MockRange } from "../../mocks/Range.mock"
import { MockTextDocument } from "../../mocks/TextDocument.mock"
import { MockTextEditor } from "../../mocks/TextEditor.mock"
import { SnakeCaseTransform } from "./SnakeCase"

describe('SnakeCase', () => {
  let transform: SnakeCaseTransform
  beforeEach(() => {
    transform = new SnakeCaseTransform()
  })

  test('convert from lowercase to uppercase', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('ailurus'),
      new MockRange(0, 17)
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit.newText).toEqual('AILURUS')
  })

  test('convert from camel case to uppercase', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('ailurusFulgens'),
      new MockRange(0, 17)
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit.newText).toEqual('AILURUS_FULGENS')
  })

  describe('spaces', () => {
    test('replace spaces with an underscore', () => {
      const editor = new MockTextEditor(
        new MockTextDocument('AILURUS FULGENS'),
        new MockRange(0, 17)
      )
      
      const edit = transform.makeEdit(editor)
      expect(edit.newText).toEqual('AILURUS_FULGENS')
    })
  
    test('collapse all spaces to one underscore', () => {
      const editor = new MockTextEditor(
        new MockTextDocument('AI  LURUS      FULG ENS'),
        new MockRange(0, 17)
      )
      
      const edit = transform.makeEdit(editor)
      expect(edit.newText).toEqual('AI_LURUS_FULG_ENS')
    })
  })

  test('remove special characters', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('VALID I!NV^A/LI!D'),
      new MockRange(0, 17)
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit.newText).toEqual('VALID_INVALID')
  })
})