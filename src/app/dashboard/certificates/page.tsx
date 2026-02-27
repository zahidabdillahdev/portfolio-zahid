import { Column, Heading, Text, Row, Button, Icon, Feedback } from "@once-ui-system/core";
import pool, { isConfigured } from "@/lib/db";
import { DeleteCertificateButton } from "@/components/dashboard/DeleteCertificateButton";

async function getCertificates() {
  if (!isConfigured) return [];
  try {
    const { rows } = await pool!.query("SELECT * FROM certificates ORDER BY created_at DESC");
    return rows;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function CertificatesDashboard() {
  const certificates = await getCertificates();

  return (
    <Column maxWidth="m" fillWidth paddingY="24" gap="24">
      {!isConfigured && (
        <Feedback
          variant="warning"
          title="Database not configured"
          description="Please set DATABASE_URL in your .env file to enable database features."
        />
      )}
      <Row fillWidth horizontal="justify" vertical="center">
        <Column gap="8">
          <Heading variant="display-strong-s">Certificates</Heading>
          <Text onBackground="neutral-weak">Manage your professional certifications.</Text>
        </Column>
        <Button
          href="/dashboard/certificates/new"
          variant="primary"
          size="m"
          weight="default"
        >
          <Row gap="8" vertical="center">
            <Icon name="plus" size="s" />
            Add Certificate
          </Row>
        </Button>
      </Row>

      <Column fillWidth gap="12">
        {certificates.map((cert) => (
          <Row
            key={cert.id}
            fillWidth
            padding="16"
            background="surface"
            radius="m"
            border="neutral-alpha-weak"
            horizontal="justify"
            vertical="center"
          >
            <Column gap="4">
              <Text variant="heading-strong-m">{cert.title}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {cert.issuer} • {cert.issue_date?.toISOString().split('T')[0] || "N/A"}
              </Text>
            </Column>
            <Row gap="8">
              <Button
                href={`/dashboard/certificates/edit/${cert.id}`}
                variant="secondary"
                size="s"
              >
                Edit
              </Button>
              <DeleteCertificateButton id={cert.id} />
            </Row>
          </Row>
        ))}
        {certificates.length === 0 && (
          <Text align="center" paddingY="48" onBackground="neutral-weak">
            No certificates found.
          </Text>
        )}
      </Column>
    </Column>
  );
}
