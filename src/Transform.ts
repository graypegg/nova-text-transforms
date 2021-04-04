export abstract class Transform {
  abstract command: string
  abstract makeEdit(editor: TextEditor): TextEdit[]
}
