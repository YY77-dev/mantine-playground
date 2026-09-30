import { Badge, Card, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

/** ショーケースの大見出し。TableOfContents は h2 を拾って目次にする */
export function Section({ id, title, description, children }: SectionProps) {
  return (
    <Stack component="section" gap="md" mb={48}>
      <div>
        <Title order={2} id={id} className="scroll-mt-20">
          {title}
        </Title>
        {description && (
          <Text c="dimmed" size="sm">
            {description}
          </Text>
        )}
      </div>
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md">
        {children}
      </SimpleGrid>
    </Stack>
  );
}

type DemoProps = {
  /** コンポーネント名やフック名。カードの見出しに出す */
  name: string;
  description?: string;
  /** 横幅いっぱいに広げたいデモで使う */
  wide?: boolean;
  children: React.ReactNode;
};

/** 1 つのコンポーネントやフックの使用例を囲むカード */
export function Demo({ name, description, wide, children }: DemoProps) {
  return (
    <Card
      withBorder
      radius="md"
      padding="md"
      className={wide ? 'md:col-span-2 xl:col-span-3' : undefined}
    >
      <Group gap="xs" mb="xs">
        <Badge variant="light" radius="sm" tt="none">
          {name}
        </Badge>
        {description && (
          <Text size="xs" c="dimmed">
            {description}
          </Text>
        )}
      </Group>
      {/* Card は flex の縦並びなので、そのまま置くとボタンが横幅いっぱいに伸びる */}
      <div>{children}</div>
    </Card>
  );
}
