import { Transform } from "./Transform";
import { LowercaseTransform } from "./transforms/Lowercase";
import { SnakeCaseTransform } from "./transforms/SnakeCase";
import { UppercaseTransform } from "./transforms/Uppercase";

const transformers: Transform[] = [
  new SnakeCaseTransform(),
  new UppercaseTransform(),
  new LowercaseTransform()
]

transformers.forEach(transformer => {
  nova.commands.register(transformer.command, (workspace: Workspace) => {
    transformer.makeEdit(workspace.activeTextEditor).forEach(edit => {
      workspace.activeTextEditor.edit((editor) => editor.replace(edit.range, edit.newText))
    })
  })
})
