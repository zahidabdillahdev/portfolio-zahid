import { Column, Heading, Text } from "@once-ui-system/core";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { getPosts } from "@/utils/utils";
import { notFound } from "next/navigation";

export default async function EditProject({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const initialData = {
    title: post.metadata.title,
    slug: post.slug,
    description: post.metadata.summary,
    content: post.content,
    publishedAt: post.metadata.publishedAt,
  };

  return (
    <Column maxWidth="m" fillWidth paddingY="24" gap="24">
      <Column gap="8">
        <Heading variant="display-strong-s">Edit Project</Heading>
        <Text onBackground="neutral-weak">Edit project: {post.metadata.title}</Text>
      </Column>
      
      <ProjectForm initialData={initialData} isEditing={true} />
    </Column>
  );
}
