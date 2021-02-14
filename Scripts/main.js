/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/Transform.ts
var Transform = /** @class */ (function () {
    function Transform() {
    }
    return Transform;
}());


;// CONCATENATED MODULE: ./src/transforms/SnakeCase.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SnakeCaseTransform = /** @class */ (function (_super) {
    __extends(SnakeCaseTransform, _super);
    function SnakeCaseTransform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SnakeCaseTransform.prototype.makeEdit = function (editor) {
        return editor.selectedRanges.map(function (range) {
            var text = editor.getTextInRange(range);
            return new TextEdit(range, SnakeCaseTransform.replaceSpacesWithUnderscores(SnakeCaseTransform.upperCase(SnakeCaseTransform.splitCamelCase(SnakeCaseTransform.not(/[^\w\s]/g, text)))));
        });
    };
    SnakeCaseTransform.splitCamelCase = function (string) {
        return string.replace(/([a-z0-9]+)(?=[A-Z])/g, '$1 ');
    };
    SnakeCaseTransform.upperCase = function (string) {
        return string.toLocaleUpperCase();
    };
    SnakeCaseTransform.replaceSpacesWithUnderscores = function (string) {
        return string.replace(/\s+/g, '_');
    };
    SnakeCaseTransform.not = function (regex, string) {
        return string.replace(regex, '');
    };
    return SnakeCaseTransform;
}(Transform));


;// CONCATENATED MODULE: ./src/main.ts

var transformers = {
    snakecase: new SnakeCaseTransform()
};
nova.commands.register("texttransforms.snakecase", function (workspace) {
    console.log(workspace.activeTextEditor.selectedRanges);
    transformers.snakecase.makeEdit(workspace.activeTextEditor).forEach(function (edit) {
        console.log(edit.newText, edit.range);
        workspace.activeTextEditor.edit(function (editor) { return editor.replace(edit.range, edit.newText); });
    });
});
exports.activate = function () { return console.log('activated'); };

/******/ })()
;