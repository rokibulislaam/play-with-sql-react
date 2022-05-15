import { editor } from 'monaco-editor';
import React, { useRef } from 'react';

export const EditorRefContext = React.createContext(
  null as unknown as React.MutableRefObject<editor.IStandaloneCodeEditor | null>
);

const EditorRef = (props: React.PropsWithChildren<{}>) => {
  const ref = useRef<editor.IStandaloneCodeEditor | null>(null);

  return (
    <EditorRefContext.Provider value={ref}>
      {props.children}
    </EditorRefContext.Provider>
  );
};

export default EditorRef;
