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
    <div className="flex flex-col space-y-3 p-4 pl-0">
      <div className="sticky top-4 z-10 flex h-16 items-center justify-between rounded-lg border bg-white/50 p-6 pr-4 backdrop-blur-2xl transition-all duration-150 ease-in-out">
        <span className="font-heading text-xl font-medium">Reports</span>
      </div>

      <div className="flex flex-col flex-wrap space-y-4 rounded-lg border p-6">
        <div className="rounded-lg border">
          <Table>
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
                <TableCell className="font-medium">
                  DMLZ Weekly Report
                </TableCell>
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
                <TableCell className="font-medium">
                  DMLZ Weekly Report
                </TableCell>
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
                <TableCell className="font-medium">
                  DMLZ Weekly Report
                </TableCell>
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
                <TableCell className="font-medium">
                  DMLZ Weekly Report
                </TableCell>
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
              <TableRow>
                <TableCell className="font-medium">GBC Weekly Report</TableCell>
                <TableCell>2023-12-26</TableCell>
                <TableCell>
                  <Link
                    href="https://drive.google.com/file/d/1uMOiJJKTBlnzn97C9oU9Ac5YN3LqFh-b"
                    target="_blank"
                  >
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  DMLZ Weekly Report
                </TableCell>
                <TableCell>2023-12-26</TableCell>
                <TableCell>
                  <Link
                    href="https://drive.google.com/file/d/1q6pVx1LLOLET0dS7gaWV8ouw7lVFDhhm"
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
                <TableCell>2024-01-17</TableCell>
                <TableCell>
                  <Link
                    href="https://drive.google.com/file/d/1rxURacJtlCasW79QP7dEP2M7xS9lEruP/edit"
                    target="_blank"
                  >
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  DMLZ Weekly Report
                </TableCell>
                <TableCell>2024-01-17</TableCell>
                <TableCell>
                  <Link
                    href="https://drive.google.com/file/d/1KPF_ruB7zYIivldZUNkK_iqZZNpCIHmH/edit"
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
    </div>
  );
}
