import { createStyles, LoadingOverlay, ScrollArea, Table } from '@mantine/core';
import { SettingsContext } from 'contexts/Settings';
import { appEvents } from 'events/appEvents';
import { sqlParserEvents } from 'events/sqlParserEvents';
import useInsertQuery from 'hooks/useInsertQuery';
import useSelectQuery, { UseSelectQueryProps } from 'hooks/useSelectQuery';
import useUpdateQuery from 'hooks/useUpdateQuery';
import { AST, From } from 'node-sql-parser';
import { useContext, useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

const findWhere = (obj: any) => {
  const where: UseSelectQueryProps['where'] = {};
  const findWhere = (obj: any): void => {
    if (obj?.left?.left) {
      findWhere(obj.left);
      findWhere(obj.right);
    } else {
      if (obj?.operator === '=') {
        where[obj.left.column as string] = obj.right.value as string;
      }
    }
  };
  findWhere(obj);
  return where;
};

export default function DataTable() {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);
  const { settings } = useContext(SettingsContext);
  const [queryProps, setQueryProps] = useState<UseSelectQueryProps>({
    table: '',
  });

  const { data, isLoading } = useSelectQuery({
    ...queryProps,
    limit: settings.limitFiftyRows ? 50 : 1000,
  });

  const { mutate: insertMutate } = useInsertQuery();
  const { mutate: updateMutate } = useUpdateQuery();

  useEffect(() => {
    const listeners = sqlParserEvents.listeners('parsed');
    if (!listeners.length) {
      sqlParserEvents.addListener('parsed', (asts: AST | AST[]) => {
        if (Array.isArray(asts)) {
          const ast = asts[0];

          if (ast.type === 'select') {
            const columns =
              ast.columns === '*'
                ? []
                : ast.columns.map((col) => col.expr.column as string);
            const table = ast.from?.[0]?.table as string;

            setColumns(columns);

            const where: UseSelectQueryProps['where'] = findWhere(ast.where);

            setQueryProps((obj) => ({
              ...obj,
              table,
              where,
              extraKey: new Date().getTime().toString(),
            }));
          } else if (ast.type === 'insert') {
            const table = ast.table?.[0].table as string;
            const properties: { [key: string]: string } = {};

            ast.values?.[0]?.value.forEach((value, index) => {
              properties[ast.columns?.[index] || ''] = value.value as string;
            });

            insertMutate(
              { table, properties },
              {
                onSuccess: () => {
                  setColumns([]);
                  setQueryProps({
                    table,
                    extraKey: new Date().getTime().toString(),
                    where: properties,
                  });
                },
              }
            );
          } else if (ast.type === 'update') {
            const table = (ast.table as From[])[0]?.table;
            const properties: { [key: string]: string } = {};
            ast.set.forEach((set) => {
              properties[set.column] = set.value.value as string;
            });

            const where = findWhere(ast.where);

            updateMutate(
              { table, properties, where },
              {
                onSuccess: (data) => {
                  setColumns([]);
                  setQueryProps({
                    table,
                    extraKey: new Date().getTime().toString(),
                    where: data?.data?.id ? { id: data?.data?.id } : where,
                  });
                },
              }
            );
          }
        }
      });
    }
  }, [insertMutate, queryProps]);

  useEffect(() => {
    appEvents.emit('queryRunning', isLoading);
  }, [isLoading]);
  const rows = Array.isArray(data?.data)
    ? data?.data?.map((row, index) => (
        <tr key={index}>
          {Object.keys(row)
            .sort()
            .map((key, index) =>
              columns.length ? (
                columns.includes(key) && <td key={index}>{row[key]}</td>
              ) : (
                <td key={index}>{row[key]}</td>
              )
            )}
        </tr>
      ))
    : null;

  return (
    <ScrollArea
      type="always"
      sx={{ height: '50vh', width: 'calc(100vw - 350px)' }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <LoadingOverlay visible={isLoading} />
      <Table>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            {Array.isArray(data?.data) &&
              data?.data?.length &&
              Object.keys(data?.data?.[0])
                .sort()
                ?.map((title, index) =>
                  columns.length ? (
                    columns.includes(title) && <th key={index}>{title}</th>
                  ) : (
                    <th key={index}>{title}</th>
                  )
                )}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
