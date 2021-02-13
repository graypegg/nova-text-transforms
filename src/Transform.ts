export abstract class Transform {
  abstract makeEdit(editor: TextEditor): TextEdit[]
}
