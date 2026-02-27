import { Column, Heading, Text } from "@once-ui-system/core";
import { CertificateForm } from "@/components/dashboard/CertificateForm";
import pool, { isConfigured } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditCertificate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isConfigured) return notFound();

  const { rows } = await pool!.query("SELECT * FROM certificates WHERE id = $1", [id]);
  const cert = rows[0];

  if (!cert) {
    notFound();
  }

  const initialData = {
    id: cert.id,
    title: cert.title,
    issuer: cert.issuer,
    issue_date: cert.issue_date?.toISOString().split('T')[0] || "",
    expiry_date: cert.expiry_date?.toISOString().split('T')[0] || "",
    credential_id: cert.credential_id || "",
    credential_url: cert.credential_url || "",
    image_url: cert.image_url || "",
  };

  return (
    <Column maxWidth="m" fillWidth paddingY="24" gap="24">
      <Column gap="8">
        <Heading variant="display-strong-s">Edit Certificate</Heading>
        <Text onBackground="neutral-weak">Edit: {cert.title}</Text>
      </Column>
      
      <CertificateForm initialData={initialData} isEditing={true} />
    </Column>
  );
}
