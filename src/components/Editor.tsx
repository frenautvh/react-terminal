import * as React from "react";

import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { TerminalContext } from "../contexts/TerminalContext";
import {
  useCurrentLine,
  useScrollToBottom,
} from "../hooks/editor";

export interface EditorHandle {
  sendCommand: (command: string) => void;
}

const Editor = React.forwardRef<EditorHandle, any>((props, ref) => {
  const wrapperRef = React.useRef(null);
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);
  const { bufferedContent } = React.useContext(TerminalContext);

  useScrollToBottom(bufferedContent, wrapperRef);

  const {
    enableInput,
    caret,
    consoleFocused,
    prompt,
    commands,
    welcomeMessage,
    errorMessage,
    showControlBar,
    defaultHandler
  } = props;

  const { currentLine, setEditorInput, setProcessCurrentLine } = useCurrentLine(
    caret,
    consoleFocused,
    prompt,
    commands,
    errorMessage,
    enableInput,
    defaultHandler,
    wrapperRef
  );

  React.useImperativeHandle(ref, () => ({
    sendCommand: (cmd: string) => {
      setEditorInput(cmd);
      setProcessCurrentLine(true);
    }
  }));

  return (
    <div id={"terminalEditor"} ref={wrapperRef} className={`${style.editor} ${!showControlBar ? style.curvedTop : null} ${showControlBar ? style.editorWithTopBar : null}`} style={{ background: themeStyles.themeBGColor }}>
      {welcomeMessage}
      {bufferedContent}
      {currentLine}
    </div>
  );
});

export default Editor;
