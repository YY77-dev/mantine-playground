'use client';

import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  ScrollArea,
  TableOfContents,
  Text,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';
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

/** Mantine のコンポーネントとフックを一通り並べたショーケース */
export function ShowcasePage() {
  const [navOpened, nav] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !navOpened },
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
          <ColorSchemeToggle />
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
    </AppShell>
  );
}
