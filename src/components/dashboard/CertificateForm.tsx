"use client";

import { useState } from "react";
import { Column, Row, Button, Input, Text, useToast } from "@once-ui-system/core";
import { useRouter } from "next/navigation";

type CertificateFormProps = {
  initialData?: {
    id?: string;
    title: string;
    issuer: string;
    issue_date: string;
    expiry_date: string;
    credential_id: string;
    credential_url: string;
    image_url: string;
  };
  isEditing?: boolean;
};

export function CertificateForm({ initialData, isEditing = false }: CertificateFormProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    issuer: initialData?.issuer || "",
    issue_date: initialData?.issue_date || "",
    expiry_date: initialData?.expiry_date || "",
    credential_id: initialData?.credential_id || "",
    credential_url: initialData?.credential_url || "",
    image_url: initialData?.image_url || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/certificates", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditing ? { ...formData, id: initialData?.id } : formData),
      });

      if (response.ok) {
        addToast({
            message: `Certificate ${isEditing ? 'updated' : 'saved'} successfully!`,
            variant: "success"
        });
        router.push("/dashboard/certificates");
        router.refresh();
      } else {
        addToast({
            message: "Failed to save certificate.",
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
          <Text variant="label-default-m">Certificate Title</Text>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Google Cloud Professional"
            required
          />
        </Column>

        <Column gap="12">
          <Text variant="label-default-m">Issuer</Text>
          <Input
            id="issuer"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            placeholder="e.g. Google Cloud"
            required
          />
        </Column>

        <Row gap="16">
            <Column gap="12" flex={1}>
                <Text variant="label-default-m">Issue Date</Text>
                <Input
                    id="issue_date"
                    name="issue_date"
                    type="date"
                    value={formData.issue_date}
                    onChange={handleChange}
                />
            </Column>
            <Column gap="12" flex={1}>
                <Text variant="label-default-m">Expiry Date</Text>
                <Input
                    id="expiry_date"
                    name="expiry_date"
                    type="date"
                    value={formData.expiry_date}
                    onChange={handleChange}
                />
            </Column>
        </Row>

        <Column gap="12">
          <Text variant="label-default-m">Credential ID</Text>
          <Input
            id="credential_id"
            name="credential_id"
            value={formData.credential_id}
            onChange={handleChange}
            placeholder="ID or Serial Number"
          />
        </Column>

        <Column gap="12">
          <Text variant="label-default-m">Credential URL</Text>
          <Input
            id="credential_url"
            name="credential_url"
            value={formData.credential_url}
            onChange={handleChange}
            placeholder="Link to verify certificate"
          />
        </Column>

        <Column gap="12">
          <Text variant="label-default-m">Image URL</Text>
          <Input
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Link to certificate image"
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
            {isEditing ? "Update Certificate" : "Save Certificate"}
          </Button>
        </Row>
      </Column>
    </form>
  );
}
