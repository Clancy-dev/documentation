import { Topic } from "@/app/types/Topic";


export const sampleTopics: Topic[] = [
  {
    id: 1,
    title: "React Hooks Introduction",
    preview: "/images/react-hooks.png",
    explanation: "<p>React Hooks are functions that let you use state and other React features without writing a class. They were introduced in React 16.8.</p><p>Hooks allow you to reuse stateful logic without changing your component hierarchy. This makes it easy to share Hooks among many components or with the community.</p>",
    codeSections: [
      {
        title: "useState Example",
        location: "components/Counter.tsx",
        language: "react",
        code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`
      },
      {
        title: "useEffect Example",
        location: "components/DataFetcher.tsx",
        language: "react",
        code: `import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return <div>{JSON.stringify(data)}</div>;
}`
      }
    ]
  },
  {
    id: 2,
    title: "CSS Flexbox Layout",
    preview: "/images/css-flexbox.png",
    explanation: "<p>Flexbox is a one-dimensional layout method for laying out items in rows or columns. Items flex to fill additional space and shrink to fit into smaller spaces.</p>",
    codeSections: [
      {
        title: "Basic Flexbox Container",
        location: "styles/flexbox.css",
        language: "css",
        code: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  flex: 1;
  padding: 10px;
  margin: 5px;
  background-color: #f0f0f0;
}`
      }
    ]
  },
  {
    id: 3,
    title: "React Context API",
    preview: "/images/react-context.png",
    explanation: "<p>The Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It's designed to share data that can be considered 'global' for a tree of React components.</p>",
    codeSections: [
      {
        title: "Creating Context",
        location: "context/ThemeContext.tsx",
        language: "react",
        code: `import React from 'react';

const ThemeContext = React.createContext('light');

export default ThemeContext;`
      },
      {
        title: "Using Context",
        location: "components/ThemedButton.tsx",
        language: "react",
        code: `import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme === 'dark' ? 'black' : 'white', color: theme === 'dark' ? 'white' : 'black' }}>
      I am styled by theme context!
    </button>
  );
}`
      },
      {
        title: "Providing Context",
        location: "App.tsx",
        language: "react",
        code: `import React from 'react';
import ThemeContext from './context/ThemeContext';
import ThemedButton from './components/ThemedButton';

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}`
      }
    ]
  }
]