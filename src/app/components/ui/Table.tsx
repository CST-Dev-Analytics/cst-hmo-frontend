import React from 'react';

type TableProps = {
  headers: string[];
  data: (string | number)[][];
};

export default function Table({ headers, data }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-primary-blue  text-white text-left text-sm">
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-black bg-white text-sm">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
