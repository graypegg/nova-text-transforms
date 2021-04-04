import { Transform } from "../Transform";

export class UppercaseTransform extends Transform {
  command = 'texttransforms.uppercase'
  makeEdit (editor: TextEditor) {
    return editor.selectedRanges.map(range => {
      const text = editor.getTextInRange(range)
      return new TextEdit(
        range,
        UppercaseTransform.uppercase(text)
      )
    })
  }

  static uppercase (string: string) {
    return string.toLocaleUpperCase()
  }
}