import { EditorState, Modifier } from 'draft-js';

import getSelectedText from './getSelectedText';

export default function insertToken(editorState: EditorState, element: any) {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const text = getSelectedText(editorState);
  
  contentState.createEntity('TOKEN', 'MUTABLE', element);
  const replacedContent = Modifier.replaceText(
    contentState,
    selection,
    text,
    null,
    contentState.getLastCreatedEntityKey()
  );

  return EditorState.push(editorState, replacedContent, 'apply-entity');
}