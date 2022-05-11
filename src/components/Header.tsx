import React from 'react';
import {
  createStyles,
  Group,
  Header as MantineHeader,
  Text,
} from '@mantine/core';
import ToggleTheme from './ToggleTheme';

const useStyles = createStyles((theme) => ({
  jumbotron: {
    fontSize: '35px',
    fontWeight: 900,
    padding: '10px auto 0 auto',
  },
}));

export default function Header() {
  const { classes } = useStyles();
  return (
    <MantineHeader height={70}>
      <Group position="apart" pr="lg" pl="lg">
        <Text
          className={classes.jumbotron}
          component="span"
          variant="gradient"
          styles={{}}
          gradient={{ from: 'blue', to: 'cyan' }}
          inherit
        >
          Play with SQL
        </Text>
        <ToggleTheme />
      </Group>
    </MantineHeader>
  );
}
