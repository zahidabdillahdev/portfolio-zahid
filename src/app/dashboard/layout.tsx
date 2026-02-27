import { Column, Row, Button, Icon, Text, Flex } from "@once-ui-system/core";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Column fillWidth horizontal="center">
      <Column maxWidth="m" fillWidth paddingX="l" paddingTop="l">
        <Row fillWidth marginBottom="l" vertical="center" gap="12">
           <Button
            href="/dashboard"
            variant="tertiary"
            size="s"
          >
            <Row gap="8" vertical="center">
              <Icon name="home" size="s" />
              Dashboard
            </Row>
          </Button>
          <Text variant="body-default-s" onBackground="neutral-weak">/</Text>
        </Row>
        {children}
      </Column>
    </Column>
  );
}
