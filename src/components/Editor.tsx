import React, { Suspense, useContext } from 'react';

import { LoadingOverlay, useMantineTheme } from '@mantine/core';
import { BeforeMount } from '@monaco-editor/react';
import { SqlKeywordReference } from 'config';
import { EditorRefContext } from 'contexts/EditorRef';
import { editor, Position } from 'monaco-editor';
import { queryClient } from 'reactQuery/queryClients';
import { ListOfTables } from 'types/listOfTables.GET';
const MonacoEditor = React.lazy(() => import('@monaco-editor/react'));

let registeredKeywords = false;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

export default function Editor() {
  const theme = useMantineTheme();

  const editorRef = useContext(EditorRefContext);

  const retrieveTableData = async (
    triesLeft = 10
  ): Promise<ListOfTables | null> => {
    if (triesLeft <= 0) {
      return null;
    }
    const listOfTables = queryClient.getQueryData('listOfTables') as
      | {
          data: ListOfTables;
        }
      | undefined;

    if (!listOfTables) {
      await sleep(1000);
      return retrieveTableData(triesLeft - 1);
    } else {
      return listOfTables.data;
    }
  };

  const registerKeywords: BeforeMount = async (monaco) => {
    if (registeredKeywords) {
      return;
    }
    const listOfTables = await retrieveTableData();
    if (!listOfTables) {
      return;
    }
    const columns = new Set<string>([]);

    const tables = listOfTables.map((tableData) => {
      tableData.columns.forEach((column) => {
        columns.add(column);
      });
      return tableData.name;
    });

    function createDependencyProposals(range: {
      startLineNumber: number;
      endLineNumber: number;
      startColumn: number;
      endColumn: number;
    }) {
      const tableSuggestions = tables.map((table) => ({
        label: table,
        kind: monaco.languages.CompletionItemKind.Value,
        insertText: table,
        range: range,
      }));
      const columnSuggestions = Array.from(columns).map((keyword) => ({
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Field,
        insertText: keyword,
        range: range,
      }));

      const keywordSuggestions = (
        Object.keys(SqlKeywordReference) as Array<
          keyof typeof SqlKeywordReference
        >
      ).map((key) => {
        const description = SqlKeywordReference[key];
        return {
          label: key,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: key,
          description,
          range: range,
        };
      });

      return [...tableSuggestions, ...columnSuggestions, ...keywordSuggestions];
    }

    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: function (
        model: editor.ITextModel,
        position: Position
      ) {
        var word = model.getWordUntilPosition(position);
        var range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        return {
          suggestions: createDependencyProposals(range),
        };
      },
    });
    registeredKeywords = true;
  };

  return (
    <Suspense fallback={<div style={{ height: '30vh' }} />}>
      <MonacoEditor
        loading={<LoadingOverlay visible={true} />}
        onMount={(editor, monaco) => {
          registerKeywords(monaco);
          editorRef.current = editor;
        }}
        defaultValue={`/*
Welcome to Play with SQL.
This is a very basic SQL simulator. It parses the SQL in the client side and makes necessary HTTP request to JSON Server (https://github.com/typicode/json-server), feel free to inspect network requests with browser devtools.
Currently it supports only SELECT, CREATE, and  UPDATE INTO queries, and only supports only single query at a time.

Some example queries have been put below, please comment out the unnecessary queries as it supports single query at a time.
*/

/* Select all columns from categories table:*/
-- SELECT * FROM categories;

/* Select only companyName, contactName, contactTitle, country from customers table:*/
-- SELECT companyName, contactName, contactTitle, country FROM customers;

/* Select all columns from customers with WHERE clause, where city is London 
   Note: only "=" operator is currently supported in WHERE clause. 
*/
-- SELECT * FROM customers WHERE city = "London";

/* Select all columns from orders table with WHERE clause and multiple conditions */
-- SELECT * FROM orders where (shipCity = "Lyon" AND employeeId = 8);

/* Insert into categories table*/
-- INSERT INTO categories (categoryName, description, picture) VALUES ("Some Category Name", "Some Description", "Some Picture");

/* Update from categories table*/
-- UPDATE categories SET categoryName = "A New Category Name", description = "A new description"
-- WHERE categoryName = "Some Category Name";

/*Okay enough of examples, why not try your own queries? 😇*/
`}
        // defaultValue="SELECT * FROM categories;"
        // defaultValue="SELECT categoryId, categoryName FROM categories;"
        height="30vh"
        defaultLanguage="sql"
        theme={theme.colorScheme === 'dark' ? 'vs-dark' : 'light'}
      />
    </Suspense>
  );
}
