import { Button } from "@/components/ui";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

type UpdateDatasetsLayoutProps = {
  children: React.ReactNode;
};

export default function UpdateDatasetsLayout({
  children,
}: UpdateDatasetsLayoutProps) {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div>
        <Link href="/dashboard/datasets">
          <Button
            variant="outline"
            className="flex w-max items-center gap-2 text-sm font-semibold"
          >
            <IconArrowLeft size={20} /> Back to list
          </Button>
        </Link>
      </div>

      <div className="flex flex-col">
        <span className="text-2xl font-bold">Update Datasets</span>
        <span className="text-sm text-gray-500">
          Please fill the form below to update datasets.
        </span>
      </div>

      <div>{children}</div>
    </div>
  );
}
