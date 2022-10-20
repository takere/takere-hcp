import { EditorState } from 'draft-js';


interface RichTextImputer {
  label: string, 
  value: EditorState, 
  onChange: (newValue: EditorState) => void
}

export default RichTextImputer;
