import { evaluate } from 'mathjs';

function TableBody({  inputDisplay, processDisplay, setInputDisplay, setProcessDisplay }) {

  function allClear() {
    setProcessDisplay('');
    setInputDisplay('0');
  };

  function logInput(btn) {

    if (processDisplay.includes('=')) {
      const indexOfEqual = processDisplay.indexOf('=');
      if (/[/x\-+]/.test(btn)) {
        setInputDisplay(btn);
        setProcessDisplay(processDisplay.slice(indexOfEqual + 1) + btn);
      } else if (/[1-9]/.test(btn)) {
        setInputDisplay(btn);
        setProcessDisplay(btn)
      } else if (btn === '0') {
        setInputDisplay('0');
        setProcessDisplay('')
      } else if (btn === '.') {
        setInputDisplay('0.');
        setProcessDisplay('0.')
      }
      return;
    };

    if (inputDisplay === '0') {
      if (processDisplay === '') {
        if (btn === '0') {                            // 0  plus  0
          setInputDisplay('0');                       // input    0
          setProcessDisplay('0');                     // process  0
        } else if (btn !== '0') {
          if (btn !== '.') {                          // 0  plus  1
            setInputDisplay(btn);                     // input    1
            setProcessDisplay(btn);                   // process  1
          } else if (btn === '.') {                   // 0  plus  .
            setInputDisplay('0.');                    // input    0.
            setProcessDisplay(processDisplay + '0.'); // process  0.
          }
        }
      } else if (processDisplay !== '' && !/[0/x\-+.]/.test(btn)) { // 123+ plus 5 or 123+0 plus 5
        setInputDisplay(btn);                                       // input    5
        setProcessDisplay(processDisplay.slice(0, -1) + btn);       // process  123+5
      } else if (/0$/.test(processDisplay) && btn === '.') {        // 123+0 plus .
        setInputDisplay('0.');                                      // input    0.
        setProcessDisplay(processDisplay + '.');                    // process  123+0.
      }
    } else if (inputDisplay !== '0' && /[0-9.]/.test(btn)) {
      if (/[0-9]/.test(btn)) {
        setInputDisplay(inputDisplay + btn);
        setProcessDisplay(processDisplay + btn);
      } else if (btn === '.') {
        if (inputDisplay.includes('.')) {
          return;
        } else if (inputDisplay.includes('.') === false) {
          setInputDisplay(inputDisplay + btn);
          setProcessDisplay(processDisplay + btn);
        }
      }
    };

    if (/[/x\-+]$/.test(processDisplay) && /[/x\-+]/.test(btn)) { // 123+ plus [/x-+]
      if (btn !== '-' && /[/x+]-$/.test(processDisplay)) {        // 123+- plus +
        setInputDisplay(btn);                                     // input    +
        setProcessDisplay(processDisplay.slice(0, -2) + btn);     // process  123+
      } else if (btn !== '-') {                                   // 123+ plus [/x+]
        setInputDisplay(btn);                                     // input    +
        setProcessDisplay(processDisplay.slice(0, -1) + btn);     // process  123+
      } else if (btn === '-') {                                   // 123- plus -
        if (/-$/.test(inputDisplay)) {                            // input    123-
          return;                                                 // process  123-
        } else if (!/-$/.test(inputDisplay)) {                    // 123+ plus -
          setInputDisplay(btn);                                   // input    -
          setProcessDisplay(processDisplay + btn);                // process  123+-
        }
      }
    } else if (/[/x\-+]$/.test(processDisplay) && btn === '.') {            // 123+ plus .
      setInputDisplay('0.');                                                // input    0.
      setProcessDisplay(processDisplay + '0.');                             // process  123+0.
    } else if (/[0-9][/x\-+]$/.test(processDisplay) && /[0-9]/.test(btn)) { // 123+ plus 5
      setInputDisplay(btn);                                                 // input    5
      setProcessDisplay(processDisplay + btn);                              // process  123+5
    } else if (/[/x\-+]/.test(btn)) {                                       // 123 plus +
      setInputDisplay(btn);                                                 // input    +
      setProcessDisplay(processDisplay + btn);                              // process  123+
    };

  };

  function calculate() {
    if (processDisplay.includes('=')) return;
    const process = processDisplay.replace('x', '*');
    const result = evaluate(process);
    setInputDisplay(result);
    setProcessDisplay(processDisplay + '=' + result);
  };

  function processInput(event) {
    if (event.target.id === 'clear') {
      allClear();
    } else if (event.target.id === 'equals') {
      calculate();
    } else {
      logInput(event.target.innerHTML);
    }
  }

  return (
    <>
      <tbody onClick={processInput}>
        <tr>
          <td id='clear' colSpan={2}>AC</td>
          <td id='divide'>/</td>
          <td id='multiply'>x</td>
        </tr>
        <tr>
          <td id='seven'>7</td>
          <td id='eight'>8</td>
          <td id='nine'>9</td>
          <td id='subtract'>-</td>
        </tr>
        <tr>
          <td id='four'>4</td>
          <td id='five'>5</td>
          <td id='six'>6</td>
          <td id='add'>+</td>
        </tr>
        <tr>
          <td id='one'>1</td>
          <td id='two'>2</td>
          <td id='three'>3</td>
          <td id='equals' rowSpan={2}>=</td>
        </tr>
        <tr>
          <td id='zero' colSpan={2}>0</td>
          <td id='decimal'>.</td>
        </tr>
      </tbody>
    </>
  );

};

export default TableBody;
