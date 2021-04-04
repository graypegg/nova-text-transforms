import { SnakeCaseTransform } from "./transforms/SnakeCase";

const transformers = {
  snakecase: new SnakeCaseTransform()
}

nova.commands.register("texttransforms.snakecase", (workspace: Workspace) => {
  transformers.snakecase.makeEdit(workspace.activeTextEditor).forEach(edit => {
    workspace.activeTextEditor.edit((editor) => editor.replace(edit.range, edit.newText))
  })
})
