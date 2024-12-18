import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DownArrow from '../../../assets/DownArrow';
import CSS from '../../../assets/FileTypes/CSS';
import JS from '../../../assets/FileTypes/JS';
import JSON from '../../../assets/FileTypes/JSON';
import LOG from '../../../assets/FileTypes/LOG';
import PYTHON from '../../../assets/FileTypes/PYTHON';
import SQL from '../../../assets/FileTypes/SQL';
import UNKNOWN from '../../../assets/FileTypes/UNKNOWN';
import { selectFile } from '../../../redux/CodeEditor/editorActions';
import { EditorState } from '../../../types/files';
import { getFileType, getWorksheet } from '../../../utils/files';
import styles from './styles.module.css';
import { getGitStatusStyle, getGitStatusText } from '../../../utils/git';

interface FileItemProps {
  fileName: string;
  isSelected?: boolean;
  childrenFiles?: Array<any>;
  type: string;
  relativePath: string;
  gitIgnored: boolean;
}

const FileItem: React.FC<FileItemProps> = ({
  fileName,
  isSelected = false,
  childrenFiles = [],
  type,
  relativePath,
  gitIgnored
}) => {
  const selectedFile = useSelector((state: EditorState) => state.selectedFile);
  const dispatch = useDispatch();
  const [isMinimized, setIsMinimized] = useState(true);

  const { selectedBranch, storedWorksheets } = useSelector((state: EditorState) => state);
  const worksheet = getWorksheet(storedWorksheets, selectedBranch, relativePath);
  const gitStatus = worksheet?.gitStatus;

  const getWorksheetHOC = (filePath: string) =>
    getWorksheet(storedWorksheets, selectedBranch, filePath);

  const canExpand = (): boolean => type === 'directory';

  const getFileIcon = (): React.ReactNode => {
    if (canExpand()) {
      return (
        <span onClick={() => setIsMinimized(!isMinimized)}>
          <DownArrow />
        </span>
      );
    }

    const fileType = getFileType(fileName);

    switch (fileType) {
      case 'js':
        return <JS />;
      case 'json':
        return <JSON />;
      case 'css':
        return <CSS />;
      case 'sql':
        return <SQL />;
      case 'py':
        return <PYTHON />;
      case 'log':
        return <LOG />;
    }

    return <UNKNOWN />;
  };

  const handleOnFileClick = () => {
    if (canExpand()) {
      setIsMinimized(!isMinimized);
      return;
    }
    dispatch(selectFile('', relativePath));
  };

  return (
    <div className={styles.fileItemContainer}>
      <div
        className={`${styles.fileNameStyle} ${isSelected ? styles.selected : ''}`}
        onClick={handleOnFileClick}
      >
        {getFileIcon()}
        <p
          style={getGitStatusStyle(gitStatus, gitIgnored, {
            files: childrenFiles,
            getWorksheet: getWorksheetHOC
          })}
        >
          {fileName}
        </p>

        {type === 'file' && (
          <span
            className={styles.gitStatusText}
            style={getGitStatusStyle(gitStatus, gitIgnored, {
              files: childrenFiles,
              getWorksheet: getWorksheetHOC
            })}
          >
            {getGitStatusText(gitStatus)}
          </span>
        )}
      </div>

      {!isMinimized && (
        <div className={styles.nestedContainer}>
          {childrenFiles.map((item: any) => (
            <FileItem
              key={item.relativePath}
              fileName={item.name}
              relativePath={item.relativePath}
              type={item.pathType}
              childrenFiles={item.children}
              isSelected={item.relativePath === selectedFile}
              gitIgnored={type === 'directory' && gitIgnored ? gitIgnored : item.gitIgnored}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileItem;
