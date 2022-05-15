import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import { RunQueryButton } from './Buttons';
import DataTable from './DataTable';
import Editor from './Editor';
import Layout from './Layout';

import EditorRef from 'contexts/EditorRef';
import GlobalSettings from 'contexts/Settings';

const THEME_KEY = 'theme-scheme';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: THEME_KEY,
    defaultValue: 'dark',
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    const themeColor = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(themeColor);
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <EditorRef>
          <GlobalSettings>
            <Layout>
              <Editor />
              <RunQueryButton />
              <DataTable />
            </Layout>
          </GlobalSettings>
        </EditorRef>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
