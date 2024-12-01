export interface EditorState {
  editorContent: string;
  selectedFile: string | null;
  editorLanguage: string;
  selectedBranch: string;
  tabs: string[];
  branchModalVisibility: boolean;
}
