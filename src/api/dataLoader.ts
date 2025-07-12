import Papa from "papaparse";
import { DataRow } from "../types";

export const loadCsvData = async (filePath: string): Promise<DataRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const cleanedData = results.data.filter(
          (row) =>
            // Ensure row is an object and has at least one non-null/non-empty value
            typeof row === "object" &&
            row !== null &&
            Object.values(row as DataRow).some(
              (value) => value !== null && value !== ""
            )
        );
        resolve(cleanedData as DataRow[]);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
