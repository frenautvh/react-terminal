import * as React from "react";
import * as Terminal from "./components/Terminal";
import * as ContextProvider from "./contexts";
import {
  TerminalContextProvider as _TerminalContextProvider,
  TerminalContext as _TerminalContext
} from "./contexts/TerminalContext";

export type ReactTerminalHandle = Terminal.TerminalHandle;

export const ReactTerminal = React.forwardRef<ReactTerminalHandle, Partial<Terminal.TerminalProps>>(
  (props: Terminal.TerminalProps, ref) => {
  const terminalRef = React.useRef(undefined);

  React.useImperativeHandle(ref, () => ({
    sendCommand: terminalRef.current?.sendCommand
  }));

  return (
    <ContextProvider.default>
      <Terminal.default {...props} ref={terminalRef} />
    </ContextProvider.default>
  );
}
);

export const TerminalContextProvider = _TerminalContextProvider;
export const TerminalContext = _TerminalContext;

export default {
  ReactTerminal,
  TerminalContextProvider,
  TerminalContext
};
