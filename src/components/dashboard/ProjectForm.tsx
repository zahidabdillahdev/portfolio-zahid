"use client";

import { useState } from "react";
import { Column, Row, Button, Input, Text, useToast } from "@once-ui-system/core";
import { useRouter } from "next/navigation";

type ProjectFormProps = {
  initialData?: {
    title: string;
    slug: string;
    description: string;
    content: string;
    publishedAt: string;
  };
  isEditing?: boolean;
};

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    publishedAt: initialData?.publishedAt || new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/projects", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        addToast({
            message: `Project ${isEditing ? 'updated' : 'created'} successfully!`,
            variant: "success"
        });
        router.push("/dashboard/projects");
        router.refresh();
      } else {
        addToast({
            message: "Failed to save project.",
            variant: "danger"
        });
      }
    } catch (err) {
      console.error(err);
      addToast({
          message: "An unexpected error occurred.",
          variant: "danger"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Column gap="24" fillWidth>
        <Column gap="12">
          <Text variant="label-default-m">Title</Text>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Project Title"
            required
          />
        </Column>

        <Column gap="12">
          <Text variant="label-default-m">Slug</Text>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="project-slug"
            required
            disabled={isEditing}
          />
        </Column>

        <Column gap="12">
          <Text variant="label-default-m">Description</Text>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description"
          />
        </Column>

        <Column gap="12">
          <Text variant="label-default-m">Published Date</Text>
          <Input
            id="publishedAt"
            name="publishedAt"
            type="date"
            value={formData.publishedAt}
            onChange={handleChange}
            required
          />
        </Column>

        <Column gap="12">
          <Text variant="label-default-m">Content (MDX)</Text>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            style={{
                width: "100%",
                minHeight: "300px",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "var(--surface-background)",
                border: "1px solid var(--neutral-alpha-weak)",
                color: "var(--neutral-on-background-strong)",
                fontFamily: "var(--font-code)",
                fontSize: "14px",
                resize: "vertical"
            }}
            placeholder="Write your project content in MDX..."
          />
        </Column>

        <Row gap="12" horizontal="end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            {isEditing ? "Update Project" : "Create Project"}
          </Button>
        </Row>
      </Column>
    </form>
  );
}
