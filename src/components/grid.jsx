import {useState} from "react";

function GridCanvas() {
  const [numberOfRows, setNumberOfRows] = useState(20);
  const [numberOfColumns, setNumberOfColumns] = useState(60);
  const [color, setColor] = useState("#e66465");
  const [mouseDown, setMouseDown] = useState(false);

  const rows = [];

  function handleChangeColor(event) {
    if (mouseDown || event.type === "mousedown") {
      event.target.style.backgroundColor = color;
    }
  }

  function handleMouseDown() {
    setMouseDown(true);
  }

  function handleMouseUp() {
    setMouseDown(false);
  }

  for (let y = 0; y < numberOfRows; y++) {
    const cells = [];
    for (let x = 0; x < numberOfColumns; x++) {
      cells.push(
        <th
          onMouseEnter={(e) => handleChangeColor(e)}
          onMouseDown={(e) => handleChangeColor(e)}
          onMouseUp={handleMouseUp}
          className="w-8 h-8 border border-gray-500  bg-white transition-colors duration-100"
          key={`${x},${y}`}
        ></th>
      );
    }
    rows.push(<tr key={y}>{cells}</tr>);
  }

  function handleChangeRows(quantity) {
    setNumberOfRows(Number(quantity));
  }

  function handleChangeColumns(quantity) {
    setNumberOfColumns(Number(quantity));
  }

  function handleColorChange(value) {
    setColor(value);
  }

  return (
    <main className="w-full flex-col gap-10 justify-center items-center p-10">
      <div className="flex flex-row justify-start items-center gap-5 mb-10">
        <label htmlFor="ROWS">Numero de filas:</label>
        <input
          id="ROWS"
          type="text"
          placeholder={numberOfRows}
          className="border border-gray-600 rounded-md p-1 focus:border-gray-700 focus:border bg-white"
          onChange={(e) => handleChangeRows(e.target.value)}
        />
        <label htmlFor="COLS">Numero de columnas:</label>
        <input
          id="COLS"
          type="text"
          placeholder={numberOfColumns}
          className="border border-gray-600 rounded-md p-1 focus:border-gray-700 focus:border bg-white"
          onChange={(e) => handleChangeColumns(e.target.value)}
        />
        <div className="inline-flex ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-palette"
          >
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
          </svg>
          <input
            type="color"
            id="head"
            name="head"
            value={color}
            className="rounded-md"
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
      </div>
      <table onMouseDown={handleMouseDown}>
        <tbody>{rows}</tbody>
      </table>
    </main>
  );
}

export default GridCanvas;
