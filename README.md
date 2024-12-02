# MOCK IDE

A simplified mock IDE that mimics some features of Visual Studio Code (VS Code)

## Demo

https://mock-ide.vercel.app

## Screenshots

![App Screenshot](https://i.ibb.co/q72pJS6/Screenshot-2024-12-02-at-2-17-00-PM.png)

## Features

- Light/dark mode toggle
- Save files locally
- Switch between branches

## Tech Stack

**Client:** React, Redux, Node v18

## Run Locally

Clone the project

```bash
  git clone git@github.com:Ciddarth-raaj/mock-ide.git
```

Go to the project directory

```bash
  cd mock-ide
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Known Issues

- Not able to select filled lines in Safari

## Folder Structure

| Directory   | Description                                           |
| ----------- | ----------------------------------------------------- |
| /api        | Contains the JSON files                               |
| /assets     | Contains all the assets required                      |
| /components | Contains all the necessary components                 |
| /context    | Contains the context configuration for handling theme |
| /hooks      | Contains custom hooks                                 |
| /pages      | Contains all the main pages                           |
| /redux      | Contains all the necessary redux configuration files  |
| /styles     | Contains styles for all main pages                    |
| /types      | Contains all types for typescript                     |
| /utils      | Contains all utility functions                        |

## Components

### CodeEditor

This component displays the code editor and handles all the required functionality like editing and saving

    <CodeEditor  />

### FileBrowser

This component displays the file tree and branch list

    <FileBrowser  />

### FileItem

This is the component used in the file tree to display the files
| **Prop Name** | **Type** | **Description** |
|--------------------|---------------------|---------------------------------------------------------------------------------|
| `fileName` | `string` | Name of the file. |
| `isSelected` | `boolean` (optional) | Indicates if the file is selected. Default is `false`. |
| `childrenFiles` | `Array<any>` (optional) | List of child files, if applicable. |
| `type` | `string` | Type of the file (e.g., "folder", "file"). |
| `relativePath` | `string` | File's path relative to the root. |
| `gitIgnored` | `boolean` | Indicates if the file is ignored by Git. |

    <FileItem
        key={item.relativePath}
        fileName={item.name}
        relativePath={item.relativePath}
        type={item.pathType}
        childrenFiles={item.children}
        isSelected={item.relativePath === selectedFile}
        gitIgnored={item.gitIgnored}
    />

### BranchModal

This component is used to display the branch selection modal

    <BranchModal />

### Tabs

This component is used to display all the tabs above the code editor

    <Tabs />

### ThemeToggle

This component is used to control the theme, it is used to switch between dark mode and light mode

    <ThemeToggle />
