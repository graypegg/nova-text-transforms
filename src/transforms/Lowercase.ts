import { Transform } from "../Transform";

export class LowercaseTransform extends Transform {
  command = 'texttransforms.lowercase'
  makeEdit (editor: TextEditor) {
    return editor.selectedRanges.map(range => {
      const text = editor.getTextInRange(range)
      return new TextEdit(
        range,
        LowercaseTransform.lowercase(text)
      )
    })
  }

  static lowercase (string: string) {
    return string.toLocaleLowerCase()
  }
}