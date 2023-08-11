import { MenuItem } from "@mui/material";
import * as XLSX from "xlsx";
import * as React from "react";
import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from "@mui/x-data-grid";

function getExcelData(apiRef: any) {
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  const data = filteredSortedRowIds.map((id) => {
    const row: any = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return data;
}

function handleExport(apiRef: any) {
  const data = getExcelData(apiRef);
  const visibleColumns = apiRef.current.getVisibleColumns();
  const headerNames = visibleColumns.map((col: any) => col.headerName);
  const fields = visibleColumns.map((col: any) => col.field);

  const rows = data.map((row: any) => {
    const mRow: any = {};
    fields.forEach((field: any, index: number) => {
      mRow[headerNames[index]] = row[field];
    });
    return mRow;
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.sheet_add_aoa(worksheet, [headerNames], {
    origin: "A1",
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "nome-arquivo");
  XLSX.writeFile(workbook, "nome-arquivo.xlsx", { compression: true });
}

function convertToCSV(objArray: any[]) {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";
  const headers = Object.keys(objArray[0]);
  str += headers.join(",") + "\r\n";
  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index = 0; index < headers.length; index++) {
      if (line !== "") line += ",";
      line += array[i][headers[index]];
    }
    str += line + "\r\n";
  }
  return str;
}

function handleExportToCSV(apiRef: any) {
  const data = getExcelData(apiRef);
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "nome-arquivo.csv";
  link.click();
}

function handlePrint(apiRef: any) {
  const data = getExcelData(apiRef);
  const visibleColumns = apiRef.current.getVisibleColumns();
  const headerNames = visibleColumns.map((col: any) => col.headerName);
  const fields = visibleColumns.map((col: any) => col.field);

  let html = "<table><thead><tr>";
  headerNames.forEach((name: any) => {
    html += `<th>${name}</th>`;
  });
  html += "</tr></thead><tbody>";
  data.forEach((row: any) => {
    html += "<tr>";
    fields.forEach((field: any) => {
      html += `<td>${row[field]}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table>";

  const printWindow = window.open("", "_blank");
  printWindow?.document.write(html);
  printWindow?.document.close();
  printWindow?.print();
}

export function ExportMenuItem(props: any) {
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  return (
    <>
      <MenuItem
        onClick={() => {
          handleExport(apiRef);
          hideMenu?.();
        }}
      >
        Baixar como Excel
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleExportToCSV(apiRef);
          hideMenu?.();
        }}
      >
        Baixar como CSV
      </MenuItem>
      <MenuItem
        onClick={() => {
          handlePrint(apiRef);
          hideMenu?.();
        }}
      >
        Imprimir
      </MenuItem>
    </>
  );
}
