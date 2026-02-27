import { Column, Row, Button, Icon, Text, Flex, Background, RevealFx, SpacingToken } from "@once-ui-system/core";
import { effects } from "@/resources";
import { opacity } from "@once-ui-system/core";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Column fillWidth horizontal="center" position="relative" style={{ minHeight: '100vh' }}>
      {/* Background effects */}
      <RevealFx fill position="absolute" zIndex={-1}>
        <Background
          mask={{
            x: effects.mask.x,
            y: effects.mask.y,
            radius: 100,
            cursor: false,
          }}
          gradient={{
            display: effects.gradient.display,
            opacity: effects.gradient.opacity as opacity,
            x: effects.gradient.x,
            y: effects.gradient.y,
            width: effects.gradient.width,
            height: effects.gradient.height,
            tilt: effects.gradient.tilt,
            colorStart: effects.gradient.colorStart,
            colorEnd: effects.gradient.colorEnd,
          }}
          dots={{
            display: effects.dots.display,
            opacity: effects.dots.opacity as opacity,
            size: effects.dots.size as SpacingToken,
            color: effects.dots.color,
          }}
        />
      </RevealFx>

      {/* Increased maxWidth to 'l' for a roomier dashboard */}
      <Column maxWidth="l" fillWidth paddingX="l" paddingTop="xl" gap="24">
        {/* Navigation / Breadcrumb */}
        <Row fillWidth vertical="center" gap="12" paddingBottom="12">
           <Button
            href="/dashboard"
            variant="secondary"
            size="s"
            data-border="rounded"
          >
            <Row gap="8" vertical="center">
              <Icon name="home" size="s" />
              Dashboard
            </Row>
          </Button>
          <Text variant="body-default-s" onBackground="neutral-weak">/</Text>
        </Row>

        {/* Refined Glass Container with better padding */}
        <Column 
          fillWidth 
          background="surface" 
          radius="l" 
          border="neutral-alpha-weak" 
          padding="l"
          shadow="l"
          style={{ backdropFilter: 'blur(12px)', borderStyle: 'solid' }}
        >
          {children}
        </Column>
        
        <Flex height="64" />
      </Column>
    </Column>
  );
}
