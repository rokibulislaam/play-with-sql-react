import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import DataTable from './DataTable';
import Editor from './Editor';
import Layout from './Layout';

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
    <div>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <Layout>
            <Editor />
            <DataTable
              data={[
                {
                  company: 'some_company',
                  email: 'some_email@gmail.com',
                  name: 'some_name',
                },
              ]}
            />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}
