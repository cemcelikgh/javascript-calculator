import './App.css';
import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import { useState } from 'react';

function App() {

  const [processDisplay, setProcessDisplay] = useState('');
  const [inputDisplay, setInputDisplay] = useState('0');

  return (
    <table>
      <TableHead
        inputDisplay={inputDisplay}
        processDisplay={processDisplay}
      />
      <TableBody
        inputDisplay={inputDisplay}
        processDisplay={processDisplay}
        setInputDisplay={setInputDisplay}
        setProcessDisplay={setProcessDisplay}
      />
    </table>
  );

};

export default App;
