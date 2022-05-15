import { useEffect, useState } from 'react';
import {
  Navbar,
  Group,
  ScrollArea,
  createStyles,
  ActionIcon,
  ThemeIcon,
  UnstyledButton,
  Box,
  ChevronIcon,
  Text,
  Collapse,
  LoadingOverlay,
} from '@mantine/core';

import {
  CollectionIcon,
  RefreshIcon,
  TableIcon,
} from '@heroicons/react/outline';
import useListOfTables from 'hooks/useListOfTables';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  links: {
    marginTop: theme.spacing.md,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  tableLink: {
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 20,
    marginLeft: 30,

    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    },
  },
  columnLink: {
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 20,
    marginLeft: 20,
    fontSize: theme.fontSizes.sm,
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  linkText: {
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    textDecoration: 'none',
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

export default function Sidebar() {
  const { classes } = useStyles();

  const [opened, setOpened] = useState(false);
  const { data, isLoading, refetch, status } = useListOfTables();
  useEffect(() => {
    if (status === 'success') {
      setOpened(true);
    }
  }, [status]);

  return (
    <Navbar
      height={'100vh'}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Group position="right">
        <ActionIcon onClick={() => refetch()}>
          <ThemeIcon variant="light" size={30}>
            <RefreshIcon height={'1.2em'} />
          </ThemeIcon>
        </ActionIcon>
      </Group>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.control}
        >
          <Group position="apart" spacing={0}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <CollectionIcon style={{ height: '1.2rem', width: '1.2rem' }} />
              </ThemeIcon>
              <Box ml="md">Tables</Box>
            </Box>
            <ChevronIcon
              className={classes.chevron}
              style={{
                transform: opened ? `rotate(-90deg)` : 'none',
              }}
            />
          </Group>
        </UnstyledButton>{' '}
        <LoadingOverlay visible={isLoading} />
        <Collapse in={opened}>
          {Array.isArray(data?.data) &&
            data?.data?.length &&
            data?.data?.map((table, index) => (
              <Table key={index} table={table} />
            ))}
        </Collapse>
      </Navbar.Section>
    </Navbar>
  );
}

const Table = ({ table }: { table: { name: string; columns: string[] } }) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <Box component="div">
      <UnstyledButton
        sx={{ width: '100%' }}
        onClick={() => {
          setOpened((o) => !o);
        }}
      >
        <Group position="apart" className={classes.tableLink}>
          <Box sx={{ display: 'flex' }}>
            <ThemeIcon variant="light" size={25}>
              <TableIcon style={{ height: '1rem', width: '1rem' }} />
            </ThemeIcon>
            <Box ml={'md'}>
              <Text className={classes.linkText}>{table?.name}</Text>
            </Box>
          </Box>
          <ChevronIcon
            className={classes.chevron}
            style={{
              transform: opened ? `rotate(-90deg)` : 'none',
            }}
          />
        </Group>
      </UnstyledButton>

      <Collapse in={opened}>
        <Group
          spacing={0}
          sx={{ ':hover': { backgroundColor: 'transparent' } }}
          direction="column"
          className={classes.tableLink}
        >
          {Array.isArray(table?.columns) &&
            table.columns.map((column: string, index: number) => (
              <Text key={index} className={classes.columnLink}>
                {column}
              </Text>
            ))}
        </Group>
      </Collapse>
    </Box>
  );
};
