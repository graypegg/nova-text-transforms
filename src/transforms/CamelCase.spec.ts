import { MockTextDocument } from "../../mocks/TextDocument.mock"
import { MockTextEdit } from "../../mocks/TextEdit.mock"
import { MockTextEditor } from "../../mocks/TextEditor.mock"
import { CamelCaseTransform } from "./CamelCase"

describe('CamelCase', () => {
  let transform: CamelCaseTransform

  beforeEach(() => {
    (global as any).TextEdit = MockTextEdit
    transform = new CamelCaseTransform()
  })

  test('single word is lowercase', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('Ailurus')
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit[0].newText).toEqual('ailurus')
  })

  test('two words are camel case', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('Ailurus Fulgens')
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit[0].newText).toEqual('ailurusFulgens')
  })

  test('removes symbols you could not use in a symbol name from the start of string', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('1Ailurus Fulgens')
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit[0].newText).toEqual('ailurusFulgens')
  })

  test('can handle an empty space input', () => {
    const editor = new MockTextEditor(
      new MockTextDocument('theres a double space -->  <-- there')
    )
    
    const edit = transform.makeEdit(editor)
    expect(edit[0].newText).toEqual('theresADoubleSpace--><--There')
  })

  describe('from snake case', () => {
    test('single word is lowercase', () => {
      const editor = new MockTextEditor(
        new MockTextDocument('AILURUS')
      )
      
      const edit = transform.makeEdit(editor)
      expect(edit[0].newText).toEqual('ailurus')
    })
  
    test('two words are camel case', () => {
      const editor = new MockTextEditor(
        new MockTextDocument('AILURUS_FULGENS')
      )
      
      const edit = transform.makeEdit(editor)
      expect(edit[0].newText).toEqual('ailurusFulgens')
    })

    test('convert from snake case in multiline selection', () => {
      const editor = new MockTextEditor(
        new MockTextDocument(
`this is a normal line

THIS_IS_SNAKE_CASE


this is the End`
        )
      )
      
      const edit = transform.makeEdit(editor)
      expect(edit[0].newText).toEqual(
`thisIsANormalLine

thisIsSnakeCase


thisIsTheEnd`
      )
    })
  })
})