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
