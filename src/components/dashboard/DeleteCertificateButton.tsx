"use client";

import { useState } from "react";
import { Button, useToast } from "@once-ui-system/core";
import { useRouter } from "next/navigation";

export function DeleteCertificateButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/certificates?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        addToast({
            message: "Certificate deleted successfully.",
            variant: "success"
        });
        router.refresh();
      } else {
        addToast({
            message: "Failed to delete certificate.",
            variant: "danger"
        });
      }
    } catch (err) {
      console.error(err);
      addToast({
          message: "An error occurred.",
          variant: "danger"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="danger"
      size="s"
      onClick={handleDelete}
      loading={loading}
    >
      Delete
    </Button>
  );
}
