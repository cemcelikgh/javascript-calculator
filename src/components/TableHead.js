function TableHead({ processDisplay, inputDisplay }) {

  return (
    <>
      <thead>
        <tr>
          <td id='dsply' colSpan={4}>
            {processDisplay}
          </td>
        </tr>
        <tr>
          <td id='display' colSpan={4}>
            {inputDisplay}
          </td>
        </tr>
      </thead>
    </>
  );

};

export default TableHead;
