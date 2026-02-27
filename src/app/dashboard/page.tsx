import { Column, Heading, Text, Row, Button, Icon } from "@once-ui-system/core";

export default function Dashboard() {
  return (
    <Column maxWidth="m" fillWidth paddingY="24" gap="24">
      <Heading variant="display-strong-s">Dashboard</Heading>
      <Text onBackground="neutral-weak">Manage your portfolio content and settings.</Text>

      <Row fillWidth gap="12" wrap>
        <Button
          href="/dashboard/projects"
          variant="secondary"
          size="m"
          weight="default"
        >
          <Row gap="8" vertical="center">
            <Icon name="grid" size="s" />
            Projects
          </Row>
        </Button>
        <Button
          href="/dashboard/media"
          variant="secondary"
          size="m"
          weight="default"
        >
          <Row gap="8" vertical="center">
            <Icon name="gallery" size="s" />
            Media
          </Row>
        </Button>
        <Button
          href="/dashboard/certificates"
          variant="secondary"
          size="m"
          weight="default"
        >
          <Row gap="8" vertical="center">
            <Icon name="person" size="s" />
            Certificates
          </Row>
        </Button>
        <Button
          href="/dashboard/content"
          variant="secondary"
          size="m"
          weight="default"
        >
          <Row gap="8" vertical="center">
            <Icon name="book" size="s" />
            Content
          </Row>
        </Button>
      </Row>

      <Column gap="12" marginTop="24">
        <Heading variant="heading-strong-m">Welcome, Zahid</Heading>
        <Text onBackground="neutral-weak">
          This is your private dashboard for managing your portfolio.
          Everything you do here is backed by PostgreSQL and Cloudflare R2.
        </Text>
      </Column>
    </Column>
  );
}
