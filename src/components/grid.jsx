import {useState} from "react";

function GridCanvas() {
  const [numberOfRows, setNumberOfRows] = useState(20);
  const [numberOfColumns, setNumberOfColumns] = useState(60);
  const [color, setColor] = useState("#e66465");
  const [mouseDown, setMouseDown] = useState(false);
  const [visibleGrid, setVisibleGrid] = useState(true);
  const [cellsSize, setCellsSize] = useState({
    width: 24,
    height: 24,
  });
  const rows = [];

  function handelPaint(event) {
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

  function handleDragStart(e) {
    e.preventDefault();
    return false;
  }

  for (let y = 0; y < numberOfRows; y++) {
    const cells = [];
    for (let x = 0; x < numberOfColumns; x++) {
      cells.push(
        <th
          onMouseEnter={(e) => handelPaint(e)}
          onMouseDown={(e) => handelPaint(e)}
          onMouseUp={handleMouseUp}
          onDragStart={handleDragStart}
          draggable="false"
          className={`${
            visibleGrid ? "border border-gray-200" : ""
          } bg-white transition-colors duration-100`}
          key={`${x},${y}`}
          style={{
            width: `${cellsSize.width}px`,
            height: `${cellsSize.height}px`,
          }}
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

  function handleReload() {
    location.reload();
  }

  function handleVisibleGrid() {
    setVisibleGrid((prev) => !prev);
  }

  function handleCellSizeChangeHeigth(event) {
    setCellsSize((prev) => ({
      ...prev,
      width: Number(event.target.value),
    }));
  }

  function handleCellSizeChangeWidth(event) {
    setCellsSize((prev) => ({
      ...prev,
      height: Number(event.target.value),
    }));
  }

  return (
    <main className="w-full flex-col gap-10 justify-center items-center p-10 relative">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-10 border border-[#3d3d3d] p-5 text-white fixed top-0 left-0 bg-[#272727] w-full">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
          <label htmlFor="ROWS">Numero de filas:</label>
          <input
            id="ROWS"
            type="text"
            placeholder={numberOfRows}
            className="border border-[#3d3d3d] rounded-md p-1 bg-transparent w-[162px] lg:w-20"
            onChange={(e) => handleChangeRows(e.target.value)}
          />
          <div className="inline-flex justify-center items-center border border-[#3d3d3d] rounded-md p-1 bg-transparent h-[32px] gap-2">
            <input
              type="range"
              name="rangeRows"
              id="rangeRows"
              min={0}
              max={100}
              onChange={(e) => handleChangeRows(e.target.value)}
              className="h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{accentColor: color}}
            />
            <div>
              <p>{numberOfRows}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
          <label htmlFor="COLS">Numero de columnas:</label>
          <input
            id="COLS"
            type="text"
            placeholder={numberOfColumns}
            className="border border-[#3d3d3d] rounded-md p-1 bg-transparent w-[162px] lg:w-20"
            onChange={(e) => handleChangeColumns(e.target.value)}
          />
          <div className="inline-flex justify-center items-center border border-[#3d3d3d] rounded-md p-1 bg-transparent h-[32px] gap-2">
            <input
              type="range"
              name="rangeCols"
              id="rangeCols"
              min={0}
              max={200}
              onChange={(e) => handleChangeColumns(e.target.value)}
              className="h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{accentColor: color}}
            />
            <div>
              <p>{numberOfColumns}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <div className="inline-flex justify-center items-center border border-[#3d3d3d] rounded-md  bg-transparent px-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-paintbrush-vertical"
            >
              <path d="M10 2v2" />
              <path d="M14 2v4" />
              <path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z" />
              <path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1" />
            </svg>
            <input
              type="color"
              id="head"
              name="head"
              value={color}
              className=" w-10 h-[32px]"
              onChange={(e) => handleColorChange(e.target.value)}
            />
          </div>
          <div className="inline-flex justify-center items-center gap-2">
            <div
              className={`border border-[#3d3d3d] rounded-md  ${
                color === "#fff" ? "bg-[#4d4d4d]" : "bg-transparent"
              }  p-1 cursor-pointer`}
              onClick={() => handleColorChange("#fff")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eraser"
              >
                <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
                <path d="M22 21H7" />
                <path d="m5 11 9 9" />
              </svg>
            </div>
            <div
              className={`border border-[#3d3d3d] p-1 rounded-md cursor-pointer ${
                !visibleGrid ? "bg-[#4d4d4d]" : "bg-transparent"
              }`}
              onClick={handleVisibleGrid}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-grid-3x3"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
              </svg>
            </div>
          </div>
          <div className="border border-[#3d3d3d] rounded-md bg-transparent p-1 h-[32px]">
            <div
              className="inline-flex justify-center  items-center gap-2 cursor-pointer"
              onClick={handleReload}
            >
              <p>Reiniciar</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-refresh-ccw"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
            </div>
          </div>
        </div>
        <div className="inline-flex justify-center items-center gap-5">
          <div className="inline-flex justify-center items-center gap-2">
            <label htmlFor="">Ancho celda:</label>
            <input
              onChange={(e) => handleCellSizeChangeWidth(e)}
              placeholder={`${cellsSize.width} px`}
              type="text"
              name=""
              id=""
              className="border border-[#3d3d3d] rounded-md p-1 bg-transparent w-[162px] lg:w-20"
            />
          </div>
          <div className="inline-flex justify-center items-center gap-2">
            <label htmlFor="">alto celda:</label>
            <input
              onChange={(e) => handleCellSizeChangeHeigth(e)}
              placeholder={`${cellsSize.height} px`}
              type="text"
              name=""
              id=""
              className="border border-[#3d3d3d] rounded-md p-1 bg-transparent w-[162px] lg:w-20"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-30">
        <div className="border border-[#3d3d3d] rounded-lg  overflow-auto w-fit max-w-full ">
          <table
            className="border-collapse cursor-crosshair"
            onMouseDown={handleMouseDown}
          >
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default GridCanvas;
