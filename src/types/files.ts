export interface EditorState {
  editorContent: string;
  selectedFile: string | undefined;
  editorLanguage: string;
  selectedBranch: string;
  tabs: string[];
  branchModalVisibility: boolean;
}

export interface File {
  relativePath: string;
  name: string;
  pathType: 'file' | 'directory';
  depth: number;
  index: number;
  gitStatus: string | null;
  gitIgnored: boolean;
  children?: File[];
}

export interface FileData {
  files: File[];
}

export interface ListFilesResponse {
  status: 'SUCCESS' | 'ERROR';
  message: string;
  data: FileData;
}

export interface Worksheet {
  relativePath: string;
  name: string;
  pathType: 'file' | 'directory';
  depth: number;
  index: number;
  gitStatus: string | null; // Can be 'modified', 'untracked', or null
  editorContent: string;
  modifiedContent: string;
  gitIgnored: boolean;
  worksheetType: string; // Could be further typed if the values are known
  repositoryId: string;
  branch: string;
  role: string;
  warehouse: string;
  content: string;
}
