"use client";

import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  ScrollArea,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui";

type CSVTableProps = { url: string };

const CSVTable = ({ url }: CSVTableProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (url) {
      Papa.parse(url, {
        download: true,
        header: true,
        error: function (err) {
          console.log(err);
        },
        complete: (results) => {
          setData(results.data as never[]);
        },
      });
    }
  }, [url]);

  if (data.length === 0) {
    return <Skeleton className="h-[200px] w-full" />;
  }

  const headers = Object.keys(data[0] as never);

  return (
    <div className="rounded-md border">
      <ScrollArea className="relative h-[200px] w-full">
        <Table className="relative">
          <TableHeader className="sticky top-0">
            <TableRow>
              {headers.map((header, i) => (
                <TableHead key={i}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {headers.map((header, j) => (
                  <TableCell key={j}>{row[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default CSVTable;
