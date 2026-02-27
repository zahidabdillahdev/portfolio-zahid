import { Column, Heading, Text } from "@once-ui-system/core";
import { CertificateForm } from "@/components/dashboard/CertificateForm";

export default function NewCertificate() {
  return (
    <Column maxWidth="m" fillWidth paddingY="24" gap="24">
      <Column gap="8">
        <Heading variant="display-strong-s">New Certificate</Heading>
        <Text onBackground="neutral-weak">Add a new professional certification.</Text>
      </Column>
      
      <CertificateForm />
    </Column>
  );
}
