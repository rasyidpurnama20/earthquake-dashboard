"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import Link from "next/link";

export default function Dashboard() {
  if (typeof window === "undefined") return null;
  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <span className="font-bold">Reports</span>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <Table className="rounded-lg border border-border">
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Report Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">GBC Weekly Report</TableCell>
              <TableCell>2023-11-21</TableCell>
              <TableCell>
                <Link
                  href="https://drive.google.com/file/d/1CDChgXFNJvSffVyWsEJVtb_IRlpz6Qhy"
                  target="_blank"
                >
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">DMLZ Weekly Report</TableCell>
              <TableCell>2023-11-21</TableCell>
              <TableCell>
                <Link
                  href="https://drive.google.com/file/d/1Dd6Z9wimbz7Q1iCZ4jc4PpsO1HbvsVdJ"
                  target="_blank"
                >
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
