import { Column, Heading, Text } from "@once-ui-system/core";
import { ProfileForm } from "@/components/dashboard/ProfileForm";

export default function ProfileDashboard() {
  return (
    <Column maxWidth="m" fillWidth paddingY="24" gap="24">
      <Column gap="8">
        <Heading variant="display-strong-s">Identity</Heading>
        <Text onBackground="neutral-weak">Manage your personal brand and social links.</Text>
      </Column>
      
      <ProfileForm />
    </Column>
  );
}
