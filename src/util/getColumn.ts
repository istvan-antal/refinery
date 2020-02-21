const getColumn = <C>(data: C[][], columnIndex: number) => data.map(row => +row[columnIndex]);

export default getColumn;