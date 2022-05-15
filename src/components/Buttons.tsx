import React, { useContext, useEffect } from 'react';
import { DatabaseIcon } from '@heroicons/react/outline';
import { Button, Checkbox, Group } from '@mantine/core';
import { Suspense, useState } from 'react';
import { sqlParserEvents } from 'events/sqlParserEvents';
import { appEvents } from 'events/appEvents';
import { SettingsContext } from 'contexts/Settings';

const SqlParser = React.lazy(() => import('./SqlParser'));

export function RunQueryButton() {
  const [shouldMountSqlParser, setShouldMountSqlParser] = useState(false);
  const [hasParserMounted, setHasParserMounted] = useState(false);
  const [isMountingParser, setIsMountingParser] = useState(false);
  const [hasPendingQueryToParse, setHasPendingQueryToParse] = useState(false);
  const [queryRunning, setQueryRunning] = useState(false);

  const handleButtonClick = () => {
    if (!hasParserMounted) {
      setShouldMountSqlParser(true);
      setIsMountingParser(true);
      setHasPendingQueryToParse(true);
    } else {
      sqlParserEvents.emit('parse');
    }
  };

  useEffect(() => {
    const listeners = appEvents.listeners('queryRunning');
    !listeners.length &&
      appEvents.addListener('queryRunning', (isRunning: boolean) => {
        setQueryRunning(isRunning);
      });

    if (hasPendingQueryToParse) {
      sqlParserEvents.emit('parse');
    }
    return () => {
      appEvents.removeAllListeners('queryRunning');
    };
  }, [hasPendingQueryToParse, hasParserMounted]);

  const { setSettings, settings } = useContext(SettingsContext);

  return (
    <>
      <Group>
        <Button
          onClick={() => handleButtonClick()}
          m={'sm'}
          leftIcon={<DatabaseIcon height={'1.5rem'} />}
          rightIcon
          loading={(isMountingParser && !hasParserMounted) || queryRunning}
        >
          {isMountingParser && !hasParserMounted
            ? 'Mounting SQL Parser'
            : queryRunning
            ? 'Running Query'
            : 'Run Query'}
        </Button>

        <Checkbox
          checked={settings.limitFiftyRows}
          onChange={() =>
            setSettings((prev) => ({
              ...prev,
              limitFiftyRows: !prev.limitFiftyRows,
            }))
          }
          label="Limit to 50 Rows"
        />
      </Group>
      {shouldMountSqlParser && (
        <Suspense>
          <SqlParser setHasParserMounted={setHasParserMounted} />
        </Suspense>
      )}
    </>
  );
}
