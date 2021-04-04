import { Transform } from "./Transform";
import { CamelCaseTransform } from "./transforms/CamelCase";
import { LowercaseTransform } from "./transforms/Lowercase";
import { SnakeCaseTransform } from "./transforms/SnakeCase";
import { UppercaseTransform } from "./transforms/Uppercase";

const transformers: Transform[] = [
  new SnakeCaseTransform(),
  new UppercaseTransform(),
  new LowercaseTransform(),
  new CamelCaseTransform()
]

transformers.forEach(transformer => {
  nova.commands.register(transformer.command, (workspace: Workspace) => {
    transformer.makeEdit(workspace.activeTextEditor).forEach(edit => {
      workspace.activeTextEditor.edit((editor) => editor.replace(edit.range, edit.newText))
    })
  })
})
