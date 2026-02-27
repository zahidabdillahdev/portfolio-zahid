import { Column, Heading, Text, Row, Button, Icon, Grid } from "@once-ui-system/core";

export default function Dashboard() {
  const sections = [
    {
      title: "Projects",
      description: "Manage your work and projects",
      icon: "grid",
      href: "/dashboard/projects",
    },
    {
      title: "Media",
      description: "Upload images and videos",
      icon: "gallery",
      href: "/dashboard/media",
    },
    {
      title: "Certificates",
      description: "Manage your professional certifications",
      icon: "person",
      href: "/dashboard/certificates",
    },
    {
      title: "Identity",
      description: "Update your name, role, and social links",
      icon: "person",
      href: "/dashboard/profile",
    },
  ];

  return (
    <Column maxWidth="m" fillWidth paddingY="24" gap="24">
      <Column gap="8">
        <Heading variant="display-strong-s">Dashboard</Heading>
        <Text onBackground="neutral-weak">Welcome to your portfolio management system.</Text>
      </Column>

      <Grid columns="3" gap="16" s={{ columns: 1 }}>
        {sections.map((section) => (
          <Column
            key={section.title}
            padding="24"
            background="surface"
            radius="m"
            border="neutral-alpha-weak"
            gap="16"
            horizontal="center"
            align="center"
          >
            <Icon name={section.icon} size="l" onBackground="brand-medium" />
            <Column gap="4" horizontal="center">
              <Text variant="heading-strong-m" align="center">{section.title}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                {section.description}
              </Text>
            </Column>
            <Button href={section.href} variant="secondary" size="s">
              Open {section.title}
            </Button>
          </Column>
        ))}
      </Grid>
    </Column>
  );
}
