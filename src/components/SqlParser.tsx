import React, { useContext, useEffect } from 'react';

import { EditorRefContext } from 'contexts/EditorRef';
import { sqlParserEvents } from 'events/sqlParserEvents';
import { editor } from 'monaco-editor';
import { Parser } from 'node-sql-parser';
const parser = new Parser();

let ref: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;

const listeners = sqlParserEvents.listeners('parse');
if (!listeners.length) {
  sqlParserEvents.addListener('parse', () => {

    try {
      const editorValue = ref?.current?.getValue();

      if (editorValue) {
        const parsedAST = parser.astify(editorValue);
        if (parsedAST) {
          sqlParserEvents.emit('parsed', parsedAST);
        }
      }
    } catch (err) {
      console.error(err);
    }
  });
}

function SqlParser({
  setHasParserMounted,
}: {
  setHasParserMounted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const editorRef = useContext(EditorRefContext);
  ref = editorRef;
  useEffect(() => {
    setTimeout(() => {
      setHasParserMounted(true);
    }, 1000);
    sqlParserEvents.emit('mounted');
    return () => {
      // sqlParserEvents.removeAllListeners('parse');
    };
  }, [setHasParserMounted]);

  return <></>;
}

export default React.memo(SqlParser);
