import { Column, Heading, Text, Row, Button, Icon, Grid } from "@once-ui-system/core";

export default function Dashboard() {
  const sections: {
    title: string;
    description: string;
    icon: string;
    href: string;
    color: "brand-medium" | "accent-medium" | "brand-strong" | "neutral-strong";
  }[] = [
    {
      title: "Identity",
      description: "Personal branding and social links",
      icon: "person",
      href: "/dashboard/profile",
      color: "brand-medium"
    },
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: "grid",
      href: "/dashboard/projects",
      color: "accent-medium"
    },
    {
      title: "Media",
      description: "Upload and manage assets",
      icon: "gallery",
      href: "/dashboard/media",
      color: "brand-strong"
    },
    {
      title: "Certificates",
      description: "Professional certifications",
      icon: "book",
      href: "/dashboard/certificates",
      color: "neutral-strong"
    },
  ];

  return (
    <Column fillWidth gap="32">
      <Column gap="8">
        <Heading variant="display-strong-s">Welcome back, Zahid</Heading>
        <Text onBackground="neutral-weak">Control center for your professional portfolio.</Text>
      </Column>

      <Grid columns="2" gap="16" s={{ columns: 1 }}>
        {sections.map((section) => (
          <Button
            key={section.title}
            href={section.href}
            variant="tertiary"
            style={{ 
              height: 'auto', 
              padding: '0',
              textAlign: 'left'
            }}
          >
            <Row 
              fillWidth 
              padding="24" 
              background="surface" 
              radius="l" 
              border="neutral-alpha-weak" 
              gap="24"
              vertical="center"
              transition="micro-medium"
              style={{ borderStyle: 'solid' }}
            >
              <Column 
                padding="12" 
                background="neutral-alpha-weak" 
                radius="m"
                horizontal="center"
                vertical="center"
              >
                <Icon name={section.icon} size="m" onBackground={section.color} />
              </Column>
              <Column gap="4">
                <Text variant="heading-strong-m">{section.title}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {section.description}
                </Text>
              </Column>
            </Row>
          </Button>
        ))}
      </Grid>
    </Column>
  );
}
