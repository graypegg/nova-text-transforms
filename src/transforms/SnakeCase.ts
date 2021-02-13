import { Transform } from "../Transform";

export class SnakeCaseTransform extends Transform {
  makeEdit (editor: TextEditor) {
    return editor.selectedRanges.map(range => {
      const text = editor.getTextInRange(range)
      return new TextEdit(
        range,
        SnakeCaseTransform.replaceSpacesWithUnderscores(
          SnakeCaseTransform.upperCase(
            SnakeCaseTransform.splitCamelCase(
              text
            )
          )
        )
      )
    })
  }
  
  static splitCamelCase (string: string) {
    return string.replace(/([a-z]+)(?=[A-Z])/g, '$1 ')
  }
  
  static upperCase (string: string) {
    return string.toLocaleUpperCase()
  }
  
  static replaceSpacesWithUnderscores (string: string) {
    return string.replace(/\s/g, '_')
  }
}