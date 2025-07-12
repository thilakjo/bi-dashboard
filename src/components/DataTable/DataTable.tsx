import React, { useState, useMemo } from "react";
import { DataRow } from "../../types";
import styles from "./DataTable.module.css";

interface DataTableProps {
  data: DataRow[];
  columnHeaders: string[];
}

const ROWS_PER_PAGE = 100;

const DataTable: React.FC<DataTableProps> = ({ data, columnHeaders }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  // Reset page if filtered data causes current page to be out of bounds
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1); // Reset to page 1 if no data
    }
  }, [currentPage, totalPages]);

  const currentData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderTableRows = useMemo(() => {
    return currentData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {columnHeaders.map((header, colIndex) => (
          <td key={`${rowIndex}-${colIndex}`}>{String(row[header])}</td>
        ))}
      </tr>
    ));
  }, [currentData, columnHeaders]);

  return (
    <div className={styles.tableWrapper}>
      <h3>Displayed Data ({data.length} entries total)</h3>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {columnHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderTableRows}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={columnHeaders.length} className={styles.noData}>
                  No data available for the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages === 0 ? 1 : totalPages}{" "}
          {/* Handle 0 total pages */}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default DataTable;
