import { SnakeCaseTransform } from "./transforms/SnakeCase";

const transformers = {
  snakecase: new SnakeCaseTransform()
}

nova.commands.register("texttransforms.snakecase", (workspace: Workspace) => {
  console.log(workspace.activeTextEditor.selectedRanges)
  transformers.snakecase.makeEdit(workspace.activeTextEditor).forEach(edit => {
    console.log(edit.newText, edit.range)
    workspace.activeTextEditor.edit((editor) => editor.replace(edit.range, edit.newText))
  })
})

exports.activate = () => console.log('activated')