import { Column, Heading, Text, Row, Button, Icon, Badge, Feedback } from "@once-ui-system/core";
import { getPosts } from "@/utils/utils";
import { DeleteProjectButton } from "@/components/dashboard/DeleteProjectButton";
import { isConfigured } from "@/lib/db";

export default async function ProjectsDashboard() {
  const projects = await getPosts(["src", "app", "work", "projects"]);

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
          <Heading variant="display-strong-s">Projects</Heading>
          <Text onBackground="neutral-weak">Manage your portfolio projects.</Text>
        </Column>
        <Button
          href="/dashboard/projects/new"
          variant="primary"
          size="m"
          weight="default"
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
            horizontal="justify"
            vertical="center"
          >
            <Column gap="4">
              <Row gap="8" vertical="center">
                <Text variant="heading-strong-m">{project.metadata.title}</Text>
                {project.isStatic ? (
                  <Badge size="s" variant="neutral">Static (MDX)</Badge>
                ) : (
                  <Badge size="s" variant="brand">Database</Badge>
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
          <Text align="center" paddingY="48" onBackground="neutral-weak">
            No projects found.
          </Text>
        )}
      </Column>
    </Column>
  );
}
