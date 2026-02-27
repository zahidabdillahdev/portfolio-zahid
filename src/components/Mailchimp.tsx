"use client";

import { mailchimp, newsletter } from "@/resources";
import { Button, Heading, Input, Text, Background, Column, Row } from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";

export const Mailchimp = ({ ...props }) => {
  if (!newsletter.display) return null;

  return (
    <Column
      fillWidth
      paddingY="80"
      paddingX="32"
      background="surface"
      radius="l"
      border="neutral-alpha-weak"
      horizontal="center"
      position="relative"
      overflow="hidden"
      {...props}
    >
      <Background
        mask={{
          x: 50,
          y: 0,
          radius: 100,
          cursor: true,
        }}
        gradient={{
          display: true,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          color: mailchimp.effects.lines.color,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
        }}
      />
      <Heading style={{ zIndex: 1 }} marginBottom="s" variant="display-strong-xs">
        {newsletter.title}
      </Heading>
      <Text
        style={{ zIndex: 1 }}
        marginBottom="l"
        onBackground="neutral-weak"
        variant="body-default-m"
      >
        {newsletter.description}
      </Text>
      <form
        style={{ width: "100%", display: "flex", justifyContent: "center", zIndex: 1 }}
        action={mailchimp.action}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
      >
        <Row maxWidth={32} fillWidth gap="8" s={{ direction: "column" }}>
          <Input
            id="mce-EMAIL"
            name="EMAIL"
            type="email"
            placeholder="Email address"
            required
          />
          <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
            <input type="text" name="b_0000000000000000000000000_0000000000" tabIndex={-1} />
          </div>
          <Row fitWidth s={{ fillWidth: true }}>
            <Row
              style={{
                borderRadius: "var(--border-radius-m)",
                boxShadow: "var(--glow-accent-linear)",
              }}
              fillWidth
              horizontal="center"
            >
              <Button id="mc-embedded-subscribe" value="Subscribe" size="m" fillWidth>
                Subscribe
              </Button>
            </Row>
          </Row>
        </Row>
      </form>
    </Column>
  );
};
