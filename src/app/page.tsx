import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Icon,
} from "@once-ui-system/core";
import { about, baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { getProfile } from "@/utils/utils";

export const revalidate = 0;

export async function generateMetadata() {
  const { home } = await getProfile();
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function Home() {
  const { home, person } = await getProfile();

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured?.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl" align="center">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href="/about"
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {person.avatar ? (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                ) : (
                    <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    size="m"
                  />
                )}
                About
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects />
      </RevealFx>

      <Column fillWidth horizontal="center" paddingY="64" gap="24">
        <Heading variant="display-strong-xs">Let's connect</Heading>
        <Text onBackground="neutral-weak" align="center" maxWidth="s">
          I'm always open to new opportunities and collaborations. <br />
          Reach out if you'd like to work together or just say hi!
        </Text>
        <Button
          href={person.email ? `mailto:${person.email}` : "#"}
          variant="primary"
          size="l"
          data-border="rounded"
        >
          <Row gap="8" vertical="center">
            <Icon name="email" size="s" />
            Email Me
          </Row>
        </Button>
      </Column>
    </Column>
  );
}
