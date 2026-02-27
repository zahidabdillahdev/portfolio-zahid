import { Column, Heading, Text, Row, Grid, Media, SmartLink, RevealFx } from "@once-ui-system/core";
import pool, { isConfigured } from "@/lib/db";
import { getProfile } from "@/utils/utils";

export const revalidate = 0;

async function getCertificates() {
  if (!isConfigured) return [];
  try {
    const { rows } = await pool!.query("SELECT * FROM certificates ORDER BY issue_date DESC");
    return rows;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function Certificates() {
  const certificates = await getCertificates();
  const { person } = await getProfile();

  return (
    <Column maxWidth="m" fillWidth paddingTop="24" gap="40">
      <Column fillWidth horizontal="center" gap="16">
        <Heading variant="display-strong-s">Certifications</Heading>
        <Text onBackground="neutral-weak" align="center">
          Professional achievements and credentials earned by {person.name}.
        </Text>
      </Column>

      <Grid columns="2" gap="16" s={{ columns: 1 }}>
        {certificates.map((cert, index) => (
          <RevealFx key={cert.id} delay={index * 0.1}>
            <Column
              padding="24"
              background="surface"
              radius="l"
              border="neutral-alpha-weak"
              gap="16"
              fillWidth
            >
              <Column gap="8">
                <Heading variant="heading-strong-m">{cert.title}</Heading>
                <Text variant="body-default-s" onBackground="brand-medium">
                  {cert.issuer}
                </Text>
              </Column>
              
              <Row horizontal="justify" vertical="center">
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  Issued: {cert.issue_date?.toISOString().split('T')[0] || "N/A"}
                </Text>
                {cert.credential_url && (
                  <SmartLink href={cert.credential_url} style={{ fontSize: '14px' }}>
                    Verify Credential
                  </SmartLink>
                )}
              </Row>
            </Column>
          </RevealFx>
        ))}
      </Grid>

      {certificates.length === 0 && (
        <Column fillWidth paddingY="128" horizontal="center">
          <Text onBackground="neutral-weak">No certificates added yet.</Text>
        </Column>
      )}
    </Column>
  );
}
