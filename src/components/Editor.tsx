import React from 'react';

import MonacoEditor from '@monaco-editor/react';
import { useMantineTheme } from '@mantine/core';

export default function Editor() {
  const theme = useMantineTheme();

  return (
    <MonacoEditor
      height="50vh"
      defaultLanguage="sql"
      defaultValue="SELECT * FROM"
      theme={theme.colorScheme === 'dark' ? 'vs-dark' : 'light'}
    />
  );
}
