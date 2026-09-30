'use client';

import { useState } from 'react';
import {
  Accordion,
  Badge,
  Box,
  Button,
  Collapse,
  FloatingIndicator,
  FocusTrap,
  Group,
  RemoveScroll,
  ScrollArea,
  Scroller,
  Stack,
  Text,
  TextInput,
  Transition,
  UnstyledButton,
  VisuallyHidden,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHeart } from '@tabler/icons-react';
import { Demo, Section } from './Section';

const indicatorItems = ['週', '月', '年'];

/** FloatingIndicator は選択中の要素の位置へ背景をすべらせる */
function FloatingIndicatorDemo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controls, setControls] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(indicatorItems[0]);

  return (
    <div ref={setRootRef} className="relative inline-flex rounded bg-gray-100 p-1 dark:bg-gray-800">
      {indicatorItems.map((item) => (
        <UnstyledButton
          key={item}
          ref={(node) => {
            // ref コールバックは描画のたびに null → 要素の順で呼ばれるので、null は無視しないと無限ループになる
            if (node)
              setControls((prev) => (prev[item] === node ? prev : { ...prev, [item]: node }));
          }}
          onClick={() => setActive(item)}
          className="relative z-[1] px-4 py-1 text-sm"
        >
          {item}
        </UnstyledButton>
      ))}
      <FloatingIndicator
        target={controls[active]}
        parent={rootRef}
        className="rounded bg-white shadow-sm dark:bg-gray-600"
      />
    </div>
  );
}

export function UtilitiesShowcase() {
  const [collapseOpened, collapse] = useDisclosure(false);
  const [transitionMounted, transition] = useDisclosure(true);
  const [trapActive, trap] = useDisclosure(false);
  const [scrollLocked, scrollLock] = useDisclosure(false);

  return (
    <Section
      id="utilities"
      title="その他ユーティリティ"
      description="開閉・アニメーション・スクロールなどの補助コンポーネント"
    >
      <Demo name="Accordion" description="折りたたみの一覧">
        <Accordion variant="separated" defaultValue="setup">
          <Accordion.Item value="setup">
            <Accordion.Control>準備</Accordion.Control>
            <Accordion.Panel>
              <Text size="sm">カードをよく混ぜて配ります。</Text>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="play">
            <Accordion.Control>遊び方</Accordion.Control>
            <Accordion.Panel>
              <Text size="sm">順番にカードを 1 枚ずつ出します。</Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Demo>

      <Demo name="Collapse" description="なめらかに開閉">
        <Button size="xs" onClick={collapse.toggle}>
          {collapseOpened ? '閉じる' : '開く'}
        </Button>
        <Collapse expanded={collapseOpened}>
          <Text size="sm" mt="xs">
            Collapse の中身です。高さがアニメーションします。
          </Text>
        </Collapse>
      </Demo>

      <Demo name="Transition" description="出入りのアニメーション">
        <Button size="xs" onClick={transition.toggle}>
          切り替え
        </Button>
        <Box h={48} mt="xs">
          <Transition mounted={transitionMounted} transition="pop" duration={250}>
            {(styles) => (
              <Badge size="lg" style={styles}>
                pop で出入り
              </Badge>
            )}
          </Transition>
        </Box>
      </Demo>

      <Demo name="ScrollArea" description="独自スクロールバー">
        <ScrollArea h={100} type="always" offsetScrollbars>
          {Array.from({ length: 12 }, (_, i) => (
            <Text key={i} size="sm">
              {i + 1} 行目のテキスト
            </Text>
          ))}
        </ScrollArea>
      </Demo>

      <Demo name="Scroller" description="左右ボタン付きの横スクロール">
        <Scroller>
          <Group wrap="nowrap" gap="xs">
            {Array.from({ length: 20 }, (_, i) => (
              <Badge key={i} variant="light" size="lg">
                タグ {i + 1}
              </Badge>
            ))}
          </Group>
        </Scroller>
      </Demo>

      <Demo name="FloatingIndicator" description="選択中の背景がすべる">
        <FloatingIndicatorDemo />
      </Demo>

      <Demo name="FocusTrap" description="フォーカスを閉じ込める">
        <Button size="xs" onClick={trap.toggle}>
          {trapActive ? 'トラップ解除' : 'トラップ開始'}
        </Button>
        <FocusTrap active={trapActive}>
          <Stack gap="xs" mt="xs">
            <TextInput size="xs" placeholder="Tab を押してもこの 2 つの間だけ移動" />
            <TextInput size="xs" placeholder="2 つ目の入力欄" />
          </Stack>
        </FocusTrap>
      </Demo>

      <Demo name="VisuallyHidden" description="画面には出さず読み上げだけ">
        <Group>
          <ActionIcon variant="light">
            <IconHeart size={18} />
            <VisuallyHidden>お気に入りに追加</VisuallyHidden>
          </ActionIcon>
          <Text size="xs" c="dimmed">
            スクリーンリーダーは「お気に入りに追加」と読み上げます
          </Text>
        </Group>
      </Demo>

      <Demo name="RemoveScroll" description="ページのスクロールを止める">
        <Button size="xs" color={scrollLocked ? 'red' : 'blue'} onClick={scrollLock.toggle}>
          {scrollLocked ? 'スクロール停止を解除' : 'ページのスクロールを止める'}
        </Button>
        <RemoveScroll enabled={scrollLocked}>
          <Text size="xs" c="dimmed" mt="xs">
            {scrollLocked
              ? 'いまはページをスクロールできません'
              : 'モーダルの裏側などで使われています'}
          </Text>
        </RemoveScroll>
      </Demo>
    </Section>
  );
}
