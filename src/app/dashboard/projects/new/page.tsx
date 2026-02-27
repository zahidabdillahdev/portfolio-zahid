import { Column, Heading, Text } from "@once-ui-system/core";
import { ProjectForm } from "@/components/dashboard/ProjectForm";

export default function NewProject() {
  return (
    <Column maxWidth="m" fillWidth paddingY="24" gap="24">
      <Column gap="8">
        <Heading variant="display-strong-s">New Project</Heading>
        <Text onBackground="neutral-weak">Add a new project to your portfolio.</Text>
      </Column>
      
      <ProjectForm />
    </Column>
  );
}
