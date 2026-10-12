'use client';

import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  Code,
  Group,
  ScrollArea,
  Stack,
  TableOfContents,
  Text,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLayoutSidebarRightCollapse,
  IconLayoutSidebarRightExpand,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import { ButtonsShowcase } from './ButtonsShowcase';
import { DataDisplayShowcase } from './DataDisplayShowcase';
import { DatesShowcase } from './DatesShowcase';
import { FeedbackShowcase } from './FeedbackShowcase';
import { FormShowcase } from './FormShowcase';
import { HooksDomShowcase } from './HooksDomShowcase';
import { HooksMiscShowcase } from './HooksMiscShowcase';
import { HooksStateShowcase } from './HooksStateShowcase';
import { InputsShowcase } from './InputsShowcase';
import { LayoutShowcase } from './LayoutShowcase';
import { NavigationShowcase } from './NavigationShowcase';
import { NotificationsShowcase } from './NotificationsShowcase';
import { OverlaysShowcase } from './OverlaysShowcase';
import { ThemeShowcase } from './ThemeShowcase';
import { UtilitiesShowcase } from './UtilitiesShowcase';

function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  return (
    <ActionIcon
      variant="default"
      size="lg"
      aria-label="ライト・ダークを切り替え"
      onClick={() => setColorScheme(computed === 'light' ? 'dark' : 'light')}
    >
      {computed === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
    </ActionIcon>
  );
}

/** Aside に並べる、このページの AppShell を構成する部品 */
const SHELL_PARTS = [
  { name: 'AppShell.Header', description: 'タイトルとライト・ダークの切り替え' },
  { name: 'AppShell.Navbar', description: '左の目次。狭い画面ではハンバーガーで開閉' },
  { name: 'AppShell.Main', description: 'コンポーネントとフックの使用例' },
  { name: 'AppShell.Aside', description: 'この欄。右上のボタンで開閉' },
  { name: 'AppShell.Footer', description: '画面下に固定されたリンク' },
];

/** Mantine のコンポーネントとフックを一通り並べたショーケース */
export function ShowcasePage() {
  const [navOpened, nav] = useDisclosure(false);
  const [asideOpened, aside] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 44 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !navOpened },
      }}
      // 本文の列が狭くならないよう、Aside は lg 以上の幅でだけ出す
      aside={{
        width: 260,
        breakpoint: 'lg',
        collapsed: { mobile: true, desktop: !asideOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={navOpened}
              onClick={nav.toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label="目次を開閉"
            />
            <Title order={1} size="h3">
              Mantine ショーケース
            </Title>
          </Group>
          <Group gap="xs">
            <ColorSchemeToggle />
            <ActionIcon
              variant="default"
              size="lg"
              visibleFrom="lg"
              aria-label="右のサイド欄を開閉"
              onClick={aside.toggle}
            >
              {asideOpened ? (
                <IconLayoutSidebarRightCollapse size={18} />
              ) : (
                <IconLayoutSidebarRightExpand size={18} />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="xs" fw={700} c="dimmed" mb="xs">
          目次
        </Text>
        <AppShell.Section grow component={ScrollArea}>
          <TableOfContents
            size="sm"
            radius="sm"
            scrollSpyOptions={{ selector: '#showcase h2' }}
            getControlProps={({ data }) => ({
              onClick: () => {
                data.getNode().scrollIntoView({ behavior: 'smooth' });
                nav.close();
              },
              children: data.value,
            })}
          />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main id="showcase">
        <Text c="dimmed" mb="xl">
          インストール済みの @mantine/core・dates・hooks・form・notifications
          に入っているコンポーネントとフックの使用例です。
        </Text>
        <LayoutShowcase />
        <ButtonsShowcase />
        <InputsShowcase />
        <NavigationShowcase />
        <DataDisplayShowcase />
        <FeedbackShowcase />
        <OverlaysShowcase />
        <UtilitiesShowcase />
        <ThemeShowcase />
        <DatesShowcase />
        <FormShowcase />
        <NotificationsShowcase />
        <HooksStateShowcase />
        <HooksDomShowcase />
        <HooksMiscShowcase />
      </AppShell.Main>

      <AppShell.Aside p="md">
        <Text size="xs" fw={700} c="dimmed" mb="xs">
          このページの構成
        </Text>
        <AppShell.Section grow component={ScrollArea}>
          <Stack gap="sm">
            {SHELL_PARTS.map((part) => (
              <div key={part.name}>
                <Code>{part.name}</Code>
                <Text size="sm" c="dimmed" mt={4}>
                  {part.description}
                </Text>
              </div>
            ))}
          </Stack>
        </AppShell.Section>
      </AppShell.Aside>

      <AppShell.Footer>
        <Group h="100%" px="md" justify="space-between">
          <Text size="xs" c="dimmed">
            Mantine Playground
          </Text>
          <Group gap="md">
            <Anchor href="https://mantine.dev" target="_blank" size="xs">
              Mantine ドキュメント
            </Anchor>
            <Anchor href="https://tabler.io/icons" target="_blank" size="xs">
              Tabler Icons
            </Anchor>
          </Group>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
