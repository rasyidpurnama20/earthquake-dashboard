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

            <TableRow>
              <TableCell className="font-medium">GBC Weekly Report</TableCell>
              <TableCell>2023-12-05</TableCell>
              <TableCell>
                <Link
                  href="https://drive.google.com/file/d/1DOuEczVp4ADRn_FRPwttud-ZuaZNCQPl"
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
              <TableCell>2023-12-05</TableCell>
              <TableCell>
                <Link
                  href="https://drive.google.com/file/d/1maLqXaDVKbknv9mj-LbUVoUrGbQv7l_1"
                  target="_blank"
                >
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">GBC Weekly Report</TableCell>
              <TableCell>2023-12-12</TableCell>
              <TableCell>
                <Link
                  href="https://drive.google.com/file/d/1qarOlKjvboppHkFKTug_dvySkEqpkRfU"
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
              <TableCell>2023-12-12</TableCell>
              <TableCell>
                <Link
                  href="https://drive.google.com/file/d/1eg6D2y9Lz-NJbdjYk34IIXmLst9SQhIy"
                  target="_blank"
                >
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">GBC Weekly Report</TableCell>
              <TableCell>2023-12-19</TableCell>
              <TableCell>
                <Link
                  href="https://drive.google.com/file/d/1FK7dkc5lCzHI2HLdm24ieXkdeP-2JwgO"
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
              <TableCell>2023-12-19</TableCell>
              <TableCell>
                <Link
                  href="https://drive.google.com/file/d/18FWtO6fHl0FdFII2ZsMgh9dHtGLQoRQS"
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
