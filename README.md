# Play with SQL

## Welcome to Play with SQL.
This is a very basic SQL simulator. It parses the SQL in the client side and makes necessary HTTP request to JSON Server (https://github.com/typicode/json-server), feel free to inspect network requests with browser devtools.
Currently it supports only SELECT, CREATE, and  UPDATE INTO queries, and only supports only single query at a time.

## Try it out

[play-with-sql-react.herokuapp.com/](https://play-with-sql-react.herokuapp.com/)

## Screenshots
![image](https://user-images.githubusercontent.com/14818143/172134504-e599ba64-eb38-4149-a883-a74a4c21c20a.png)

![image](https://user-images.githubusercontent.com/14818143/172134434-66cde28a-8be6-499f-a469-a81d31be655d.png)

### Tech Stacks Used:

- [ReactJS](https://reactjs.org/) - UI library
- [Create React App (CRA)](https://create-react-app.dev/) - React boilerplate
- [Mantine](https://mantine.dev/) - React component library.
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor by Microsoft that powers VS Code
- [Axios](https://axios-http.com/) - HTTP Client
- [FBEmitter](https://github.com/facebookarchive/emitter) - Event emitter by Facebook
- [JSON Server](https://github.com/typicode/json-server) - Fake REST API server
- [node-sql-parser](https://github.com/taozhi8833998/node-sql-parser) - SQL parser
- [React Query](https://react-query.tanstack.com/) - React data fetching library
- [Typescript](https://www.typescriptlang.org/) - Typed language

### TODO
- Remove depedency of JSON Server
- Implement something like [*Web SQL Database*](https://caniuse.com/sql-storage)
