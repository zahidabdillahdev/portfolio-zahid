import { Column, Heading, Text, Row, Button, Icon, Badge, Feedback } from "@once-ui-system/core";
import { getPosts } from "@/utils/utils";
import { DeleteProjectButton } from "@/components/dashboard/DeleteProjectButton";
import { isConfigured } from "@/lib/db";

export default async function ProjectsDashboard() {
  const projects = await getPosts(["src", "app", "work", "projects"]);

  return (
    <Column fillWidth gap="32">
      {!isConfigured && (
        <Feedback
          variant="warning"
          title="Database not configured"
          description="Please set DATABASE_URL in your .env file to enable database features."
        />
      )}
      <Row fillWidth horizontal="between" vertical="center">
        <Column gap="8">
          <Heading variant="display-strong-s">Projects</Heading>
          <Text onBackground="neutral-weak">Manage your portfolio works.</Text>
        </Column>
        <Button
          href="/dashboard/projects/new"
          variant="primary"
          size="m"
          weight="default"
          data-border="rounded"
        >
          <Row gap="8" vertical="center">
            <Icon name="plus" size="s" />
            New Project
          </Row>
        </Button>
      </Row>

      <Column fillWidth gap="12">
        {projects.map((project) => (
          <Row
            key={project.slug}
            fillWidth
            padding="16"
            background="surface"
            radius="m"
            border="neutral-alpha-weak"
            horizontal="between"
            vertical="center"
            transition="micro-medium"
            style={{ borderStyle: 'solid' }}
          >
            <Column gap="4">
              <Row gap="8" vertical="center">
                <Text variant="heading-strong-m">{project.metadata.title}</Text>
                {project.isStatic ? (
                  <Badge 
                    background="neutral-alpha-weak" 
                    onBackground="neutral-strong"
                  >
                    Static
                  </Badge>
                ) : (
                  <Badge 
                    background="brand-alpha-weak" 
                    onBackground="brand-strong"
                  >
                    Database
                  </Badge>
                )}
              </Row>
              <Text variant="body-default-s" onBackground="neutral-weak">
                /{project.slug} • {project.metadata.publishedAt}
              </Text>
            </Column>
            <Row gap="8">
              <Button
                href={`/dashboard/projects/edit/${project.slug}`}
                variant="secondary"
                size="s"
              >
                Edit
              </Button>
              {!project.isStatic && <DeleteProjectButton slug={project.slug} />}
            </Row>
          </Row>
        ))}
        {projects.length === 0 && (
          <Column fillWidth paddingY="64" horizontal="center" background="neutral-alpha-weak" radius="m">
            <Text onBackground="neutral-weak">No projects found.</Text>
          </Column>
        )}
      </Column>
    </Column>
  );
}
