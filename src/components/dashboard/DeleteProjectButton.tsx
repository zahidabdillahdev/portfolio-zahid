"use client";

import { useState } from "react";
import { Button } from "@once-ui-system/core";
import { useRouter } from "next/navigation";

export function DeleteProjectButton({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete project "${slug}"?`)) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/projects?slug=${slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
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
