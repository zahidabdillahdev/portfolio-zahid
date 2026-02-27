"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Column, 
  Row, 
  Button, 
  Input, 
  Text, 
  Heading, 
  Icon, 
  Flex, 
  RevealFx,
  Feedback
} from "@once-ui-system/core";

export const ContactForm = ({ email }: { email: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: ""
  });
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate sending or use a real API if needed later
    // For now, we'll use mailto as a fallback but keep the UI "cool"
    setTimeout(() => {
      if (isMounted.current) {
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        setStatus('success');
        setFormData({ name: "", subject: "", message: "" });
      }
    }, 1000);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="primary"
        size="l"
        data-border="rounded"
      >
        <Row gap="8" vertical="center">
          <Icon name="email" size="s" />
          Email Me
        </Row>
      </Button>
    );
  }

  return (
    <RevealFx translateY="16" fillWidth horizontal="center">
      <Column 
        fillWidth 
        maxWidth={32} 
        padding="xl" 
        background="surface" 
        radius="l" 
        border="neutral-alpha-weak"
        shadow="l"
        gap="24"
        style={{ backdropFilter: 'blur(12px)', borderStyle: 'solid' }}
      >
        <Row horizontal="between" vertical="center">
          <Heading variant="display-strong-xs">Send a message</Heading>
          <IconButton
            icon="close"
            variant="tertiary"
            size="s"
            onClick={() => {
                setIsOpen(false);
                setStatus('idle');
            }}
          />
        </Row>

        {status === 'success' ? (
          <RevealFx>
            <Column gap="16" horizontal="center" paddingY="32">
              <Icon name="check" size="l" onBackground="success-medium" />
              <Text align="center">Message prepared! Your email client should open now.</Text>
              <Button variant="secondary" size="s" onClick={() => setStatus('idle')}>Send another</Button>
            </Column>
          </RevealFx>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Column gap="20" fillWidth>
              <Column gap="8">
                <Text variant="label-default-s" onBackground="neutral-weak">Your Name</Text>
                <Input
                  id="contact_name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="What should I call you?"
                  required
                />
              </Column>
              <Column gap="8">
                <Text variant="label-default-s" onBackground="neutral-weak">Subject</Text>
                <Input
                  id="contact_subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </Column>
              <Column gap="8">
                <Text variant="label-default-s" onBackground="neutral-weak">Message</Text>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Type your message here..."
                  style={{
                    width: "100%",
                    minHeight: "120px",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "var(--neutral-alpha-weak)",
                    border: "1px solid var(--neutral-alpha-weak)",
                    color: "var(--neutral-on-background-strong)",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    resize: "vertical"
                  }}
                />
              </Column>
              <Button
                type="submit"
                variant="primary"
                fillWidth
                loading={status === 'loading'}
              >
                Launch Message
              </Button>
            </Column>
          </form>
        )}
      </Column>
    </RevealFx>
  );
};

// Internal Helper for Close Button
const IconButton = ({ icon, onClick, variant, size }: any) => (
    <Button variant={variant} size={size} onClick={onClick} style={{ padding: '8px', height: 'auto' }}>
        <Icon name={icon} size="s" />
    </Button>
);
