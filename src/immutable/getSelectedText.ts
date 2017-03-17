import { EditorState } from 'draft-js';
import getContentStateFragment from 'draft-js/lib/getContentStateFragment';

export default function getSelectedText(editorState: EditorState) {
  console.log('>> getSelectedText', editorState);
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const fragment = getContentStateFragment(contentState, selectionState);
  return fragment.map((block) => block.getText()).join('\n');
}
