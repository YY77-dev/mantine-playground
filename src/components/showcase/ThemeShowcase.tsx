'use client';

import {
  Button,
  ColorSwatch,
  Drawer,
  Group,
  Modal,
  SegmentedControl,
  Text,
  useComputedColorScheme,
  useDrawersStack,
  useMantineColorScheme,
  useMantineTheme,
  useMatches,
  useModalsStack,
  type MantineColorScheme,
} from '@mantine/core';
import { Demo, Section } from './Section';

function ModalsStackDemo() {
  const stack = useModalsStack(['confirm', 'really']);
  return (
    <>
      <Button size="xs" onClick={() => stack.open('confirm')}>
        モーダルを重ねて開く
      </Button>
      <Modal.Stack>
        <Modal {...stack.register('confirm')} title="確認">
          <Text size="sm">本当に進みますか？</Text>
          <Button size="xs" mt="md" onClick={() => stack.open('really')}>
            次のモーダルを開く
          </Button>
        </Modal>
        <Modal {...stack.register('really')} title="最終確認">
          <Text size="sm">2 枚目のモーダルです。</Text>
          <Button size="xs" mt="md" onClick={stack.closeAll}>
            すべて閉じる
          </Button>
        </Modal>
      </Modal.Stack>
    </>
  );
}

function DrawersStackDemo() {
  const stack = useDrawersStack(['first', 'second']);
  return (
    <>
      <Button size="xs" onClick={() => stack.open('first')}>
        ドロワーを重ねて開く
      </Button>
      <Drawer.Stack>
        <Drawer {...stack.register('first')} title="1 枚目">
          <Button size="xs" onClick={() => stack.open('second')}>
            2 枚目を開く
          </Button>
        </Drawer>
        <Drawer {...stack.register('second')} title="2 枚目" position="right">
          <Button size="xs" onClick={stack.closeAll}>
            すべて閉じる
          </Button>
        </Drawer>
      </Drawer.Stack>
    </>
  );
}

export function ThemeShowcase() {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const breakpointLabel = useMatches({
    base: 'base（スマホ）',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl 以上',
  });

  return (
    <Section
      id="theme"
      title="テーマ関連のフック"
      description="@mantine/core に入っている、テーマや重ね表示のためのフック"
    >
      <Demo name="useMantineTheme" description="テーマの値を読む">
        <Text size="sm">primaryColor: {theme.primaryColor}</Text>
        <Group gap={4} mt="xs">
          {theme.colors[theme.primaryColor].map((c) => (
            <ColorSwatch key={c} color={c} size={20} />
          ))}
        </Group>
      </Demo>

      <Demo name="useMantineColorScheme" description="ライト・ダークの切り替え">
        <SegmentedControl
          size="xs"
          value={colorScheme}
          onChange={(v) => setColorScheme(v as MantineColorScheme)}
          data={[
            { label: 'ライト', value: 'light' },
            { label: 'ダーク', value: 'dark' },
            { label: 'OS に合わせる', value: 'auto' },
          ]}
        />
      </Demo>

      <Demo name="useComputedColorScheme" description="実際に使われている配色">
        <Text size="sm">
          いまは {computedColorScheme === 'dark' ? 'ダーク' : 'ライト'} で表示しています。
        </Text>
      </Demo>

      <Demo name="useMatches" description="画面幅ごとに値を変える">
        <Text size="sm">現在のブレークポイント: {breakpointLabel}</Text>
      </Demo>

      <Demo name="useModalsStack" description="モーダルを重ねる">
        <ModalsStackDemo />
      </Demo>

      <Demo name="useDrawersStack" description="ドロワーを重ねる">
        <DrawersStackDemo />
      </Demo>
    </Section>
  );
}
