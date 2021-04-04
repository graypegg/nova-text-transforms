import { Transform } from "../Transform";
import { LowercaseTransform } from "./Lowercase";

export class CamelCaseTransform extends Transform {
  command = 'texttransforms.camelcase'
  makeEdit (editor: TextEditor) {
    return editor.selectedRanges.map(range => {
      const text = editor.getTextInRange(range)
      return new TextEdit(
        range,
        CamelCaseTransform.removeSpaces(
          CamelCaseTransform.capitalizeAfterWhitespace(
            CamelCaseTransform.firstCharacterAlphaOnly(
              CamelCaseTransform.trim(
                CamelCaseTransform.underscoresToSpaces(
                  LowercaseTransform.lowercase(
                    text
                  )
                )
              )
            )
          )
        )
      )
    })
  }

  static underscoresToSpaces (string: string) {
    return string.replace(/(_)/g, ' ')
  }

  static trim (string: string) {
    return string.trim()
  }

  static firstCharacterAlphaOnly (string: string) {
    return string.replace(/^[^a-zA-Z$]/, '')
  }

  static capitalizeAfterWhitespace (string: string) {
    return string.split(' ').reduce((acc, word, index) => {
      switch (index) {
        case 0:
          acc += word
          break;
        default:
          acc += (word?.[0]?.toLocaleUpperCase() ?? '') + (word?.slice(1) ?? '')
      }
      return acc
    }, '')
  }

  static removeSpaces (string: string) {
    return string.replace(/\ /, '')
  }
}