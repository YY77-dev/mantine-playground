'use client';

import { useRef, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Code,
  Group,
  Kbd,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  useClickOutside,
  useDisclosure,
  useDrag,
  useElementSize,
  useEventListener,
  useFocusReturn,
  useFocusTrap,
  useFocusWithin,
  useHeadroom,
  useHotkeys,
  useHover,
  useInViewport,
  useIntersection,
  useLongPress,
  useMouse,
  useMousePosition,
  useMove,
  useMutationObserver,
  useMutationObserverTarget,
  useRadialMove,
  useResizeObserver,
  useScrollDirection,
  useScrollIntoView,
  useScrollSpy,
  useTextSelection,
  useViewportSize,
  useWindowEvent,
  useWindowScroll,
} from '@mantine/hooks';
import { Demo, Section } from './Section';

/** デモで操作対象にする枠 */
const areaClass = 'rounded border border-dashed border-gray-400 p-3 text-center text-sm';

function UseClickOutsideDemo() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  return (
    <Box pos="relative">
      <Button size="xs" variant="light" onClick={() => setOpened(true)}>
        パネルを開く
      </Button>
      {opened && (
        <Paper ref={ref} shadow="md" p="sm" mt="xs" withBorder>
          <Text size="sm">パネルの外をクリックすると閉じます</Text>
        </Paper>
      )}
    </Box>
  );
}

function UseHoverDemo() {
  const { hovered, ref } = useHover();
  return (
    <div ref={ref} className={areaClass}>
      {hovered ? 'ホバー中' : 'ここにカーソルを乗せる'}
    </div>
  );
}

function UseFocusWithinDemo() {
  const { ref, focused } = useFocusWithin();
  return (
    <Box ref={ref} p="xs" bg={focused ? 'blue.1' : undefined} className="rounded">
      <TextInput size="xs" placeholder="中の入力欄にフォーカスすると色が変わる" />
    </Box>
  );
}

function UseFocusTrapDemo() {
  const [active, { toggle }] = useDisclosure(false);
  const ref = useFocusTrap(active);
  return (
    <Stack gap="xs">
      <Button size="xs" variant="light" onClick={toggle}>
        {active ? '解除' : 'トラップ開始'}
      </Button>
      <div ref={ref}>
        <Group gap="xs" grow>
          <TextInput size="xs" placeholder="1" />
          <TextInput size="xs" placeholder="2" />
        </Group>
      </div>
    </Stack>
  );
}

function UseFocusReturnDemo() {
  const [opened, { open, close }] = useDisclosure(false);
  useFocusReturn({ opened, shouldReturnFocus: true });
  return (
    <Stack gap="xs">
      <Button size="xs" variant="light" onClick={open}>
        入力欄を開く
      </Button>
      {opened && (
        <Group gap="xs">
          <TextInput
            size="xs"
            autoFocus
            placeholder="閉じるとボタンにフォーカスが戻る"
            className="flex-1"
          />
          <Button size="xs" variant="default" onClick={close}>
            閉じる
          </Button>
        </Group>
      )}
    </Stack>
  );
}

function UseEventListenerDemo() {
  const [count, setCount] = useState(0);
  const ref = useEventListener('click', () => setCount((c) => c + 1));
  return (
    <button ref={ref} type="button" className={`${areaClass} w-full`}>
      クリック回数: {count}
    </button>
  );
}

function UseWindowEventDemo() {
  const [key, setKey] = useState('');
  useWindowEvent('keydown', (event) => setKey(event.key));
  return <Text size="sm">最後に押したキー: {key ? <Kbd>{key}</Kbd> : '（まだなし）'}</Text>;
}

function UseHotkeysDemo() {
  const [count, setCount] = useState(0);
  useHotkeys([['mod+shift+K', () => setCount((c) => c + 1)]]);
  return (
    <Text size="sm">
      <Kbd>Ctrl</Kbd>（Mac は <Kbd>⌘</Kbd>）+ <Kbd>Shift</Kbd> + <Kbd>K</Kbd> を押した回数: {count}
    </Text>
  );
}

function UseLongPressDemo() {
  const [message, setMessage] = useState('');
  const handlers = useLongPress(() => setMessage('長押しされました'), {
    threshold: 800,
    onStart: () => setMessage('押しています…'),
    onCancel: () => setMessage('短すぎました'),
  });
  return (
    <Group>
      <Button size="xs" variant="light" {...handlers}>
        0.8 秒長押し
      </Button>
      <Text size="sm">{message}</Text>
    </Group>
  );
}

function UseMoveDemo() {
  const [value, setValue] = useState({ x: 0.3, y: 0.5 });
  const { ref, active } = useMove(setValue);
  return (
    <div ref={ref} className="relative h-24 rounded bg-gray-100 dark:bg-gray-800">
      <div
        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${value.x * 100}%`,
          top: `${value.y * 100}%`,
          background: active ? '#fa5252' : '#228be6',
        }}
      />
      <Text size="xs" className="absolute bottom-1 left-2">
        x {value.x.toFixed(2)} / y {value.y.toFixed(2)}
      </Text>
    </div>
  );
}

function UseDragDemo() {
  const [offset, setOffset] = useState<[number, number]>([0, 0]);
  const start = useRef<[number, number]>([0, 0]);
  const { ref, active } = useDrag((state) => {
    if (state.first) start.current = offset;
    setOffset([start.current[0] + state.movement[0], start.current[1] + state.movement[1]]);
  });
  return (
    <div className="relative h-24 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
      <div
        ref={ref}
        className="absolute top-4 left-4 cursor-grab touch-none rounded bg-blue-500 px-3 py-1 text-sm text-white select-none"
        style={{
          transform: `translate(${offset[0]}px, ${offset[1]}px)`,
          opacity: active ? 0.7 : 1,
        }}
      >
        ドラッグ
      </div>
    </div>
  );
}

function UseRadialMoveDemo() {
  const [angle, setAngle] = useState(90);
  const { ref } = useRadialMove(setAngle);
  return (
    <Group>
      <div
        ref={ref}
        className="relative h-20 w-20 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700"
      >
        <div
          className="absolute top-1/2 left-1/2 h-1 w-9 origin-left rounded bg-blue-500"
          style={{ transform: `rotate(${angle - 90}deg)` }}
        />
      </div>
      <Text size="sm">{Math.round(angle)}°</Text>
    </Group>
  );
}

function UseMouseDemo() {
  const { ref, x, y } = useMouse();
  return (
    <div ref={ref} className={areaClass}>
      要素内の座標: {x}, {y}
    </div>
  );
}

function UseMousePositionDemo() {
  const { x, y } = useMousePosition();
  return (
    <Text size="sm">
      画面上のカーソル位置: {x}, {y}
    </Text>
  );
}

function UseTextSelectionDemo() {
  const selection = useTextSelection();
  return (
    <Stack gap={4}>
      <Text size="sm">この文章の一部をマウスで選択してみてください。</Text>
      <Text size="sm" c="dimmed">
        選択中: {selection?.toString() || '（なし）'}
      </Text>
    </Stack>
  );
}

function UseElementSizeDemo() {
  const { ref, width, height } = useElementSize();
  return (
    <div ref={ref} className="resize overflow-auto rounded border border-gray-300 p-2 text-sm">
      右下をつまむ: 幅 {Math.round(width)} × 高さ {Math.round(height)}
    </div>
  );
}

function UseResizeObserverDemo() {
  const [ref, rect] = useResizeObserver();
  return (
    <div ref={ref} className="resize overflow-auto rounded border border-gray-300 p-2 text-sm">
      右下をつまむ: {Math.round(rect.width)} × {Math.round(rect.height)}
    </div>
  );
}

function UseViewportSizeDemo() {
  const { width, height } = useViewportSize();
  return (
    <Text size="sm">
      ウィンドウ: {width} × {height}
    </Text>
  );
}

function UseWindowScrollDemo() {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <Group>
      <Text size="sm">縦スクロール: {Math.round(scroll.y)}px</Text>
      <Button size="xs" variant="light" onClick={() => scrollTo({ y: 0 })}>
        先頭へ
      </Button>
    </Group>
  );
}

function UseScrollIntoViewDemo() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >();
  return (
    <Stack gap="xs">
      <Button size="xs" variant="light" onClick={() => scrollIntoView({ alignment: 'center' })}>
        目的の行までスクロール
      </Button>
      <ScrollArea h={90} viewportRef={scrollableRef}>
        {Array.from({ length: 15 }, (_, i) => (
          <Text key={i} size="sm">
            {i + 1} 行目
          </Text>
        ))}
        <Box ref={targetRef} bg="yellow.2" c="dark" p={4}>
          ここが目的の行
        </Box>
      </ScrollArea>
    </Stack>
  );
}

function UseScrollSpyDemo() {
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const spy = useScrollSpy({
    selector: '[data-spy-heading]',
    getDepth: () => 1,
    scrollHost: host ?? undefined,
  });
  return (
    <Stack gap="xs">
      <Group gap={4}>
        {spy.data.map((heading, index) => (
          <Badge key={heading.id} variant={index === spy.active ? 'filled' : 'light'}>
            {heading.value}
          </Badge>
        ))}
      </Group>
      <div ref={setHost} className="h-24 overflow-auto rounded border border-gray-300 p-2">
        {['第 1 章', '第 2 章', '第 3 章'].map((title) => (
          <div key={title} className="mb-8">
            <Text fw={700} size="sm" id={`spy-${title}`} data-spy-heading>
              {title}
            </Text>
            <Text size="xs" c="dimmed">
              スクロールすると上のバッジが切り替わります。
            </Text>
          </div>
        ))}
      </div>
    </Stack>
  );
}

function UseScrollDirectionDemo() {
  const direction = useScrollDirection();
  const label = { up: '上へ', down: '下へ', unknown: '不明' }[direction];
  return <Text size="sm">ページのスクロール方向: {label}</Text>;
}

function UseHeadroomDemo() {
  const { pinned } = useHeadroom({ fixedAt: 120 });
  return (
    <Stack gap={4}>
      <Group gap="xs">
        <Text size="sm">ヘッダーを出すべきか:</Text>
        <Badge color={pinned ? 'teal' : 'gray'}>{pinned ? '出す' : '隠す'}</Badge>
      </Group>
      <Text size="xs" c="dimmed">
        下へスクロールすると「隠す」、上へ戻すと「出す」になります
      </Text>
    </Stack>
  );
}

function UseInViewportDemo() {
  const { ref, inViewport } = useInViewport();
  return (
    <Stack gap="xs">
      <Badge color={inViewport ? 'teal' : 'red'}>
        {inViewport ? '見えている' : '見えていない'}
      </Badge>
      <ScrollArea h={70}>
        <Box h={120} />
        <Box ref={ref} bg="blue.1" c="blue.9" p={4}>
          監視している要素
        </Box>
        <Box h={40} />
      </ScrollArea>
    </Stack>
  );
}

function UseIntersectionDemo() {
  const { ref, entry } = useIntersection({ threshold: 1 });
  return (
    <Box ref={ref} bg="grape.1" c="grape.9" p="xs" className="rounded">
      <Text size="sm">
        {entry?.isIntersecting
          ? 'この枠は画面内に全部見えています'
          : 'この枠は一部または全部が画面外です'}
      </Text>
    </Box>
  );
}

function UseMutationObserverDemo() {
  const [items, setItems] = useState<number[]>([]);
  const [mutations, setMutations] = useState(0);
  const ref = useMutationObserver<HTMLDivElement>(
    (records) => setMutations((m) => m + records.length),
    { childList: true },
  );
  return (
    <Stack gap="xs">
      <Group>
        <Button size="xs" variant="light" onClick={() => setItems((i) => [...i, i.length])}>
          要素を追加
        </Button>
        <Text size="sm">検知した変化: {mutations}</Text>
      </Group>
      <Group gap={4} ref={ref}>
        {items.map((i) => (
          <Badge key={i}>{i}</Badge>
        ))}
      </Group>
    </Stack>
  );
}

function UseMutationObserverTargetDemo() {
  const [scheme, setScheme] = useState('');
  useMutationObserverTarget(
    () => setScheme(document.documentElement.getAttribute('data-mantine-color-scheme') ?? ''),
    { attributes: true, attributeFilter: ['data-mantine-color-scheme'] },
    () => document.documentElement,
  );
  return (
    <Text size="sm">
      html 要素の属性の変化を監視中。ヘッダーでライト・ダークを切り替えると更新されます:{' '}
      <Code>{scheme || '未検知'}</Code>
    </Text>
  );
}

export function HooksDomShowcase() {
  return (
    <Section
      id="hooks-dom"
      title="フック: DOM・イベント・スクロール（@mantine/hooks）"
      description="要素の操作やイベント、サイズ・スクロール位置を扱うフック"
    >
      <Demo name="useClickOutside" description="外側のクリックを検知">
        <UseClickOutsideDemo />
      </Demo>
      <Demo name="useHover" description="ホバー中か">
        <UseHoverDemo />
      </Demo>
      <Demo name="useFocusWithin" description="中の要素にフォーカスがあるか">
        <UseFocusWithinDemo />
      </Demo>
      <Demo name="useFocusTrap" description="フォーカスを閉じ込める">
        <UseFocusTrapDemo />
      </Demo>
      <Demo name="useFocusReturn" description="閉じたらフォーカスを戻す">
        <UseFocusReturnDemo />
      </Demo>
      <Demo name="useEventListener" description="要素にイベントを登録">
        <UseEventListenerDemo />
      </Demo>
      <Demo name="useWindowEvent" description="window にイベントを登録">
        <UseWindowEventDemo />
      </Demo>
      <Demo name="useHotkeys" description="ショートカットキー">
        <UseHotkeysDemo />
      </Demo>
      <Demo name="useLongPress" description="長押し">
        <UseLongPressDemo />
      </Demo>
      <Demo name="useMove" description="ドラッグで 0〜1 の位置を得る">
        <UseMoveDemo />
      </Demo>
      <Demo name="useDrag" description="ドラッグの移動量">
        <UseDragDemo />
      </Demo>
      <Demo name="useRadialMove" description="円の周りで角度を得る">
        <UseRadialMoveDemo />
      </Demo>
      <Demo name="useMouse" description="要素内のマウス座標">
        <UseMouseDemo />
      </Demo>
      <Demo name="useMousePosition" description="画面全体のマウス座標">
        <UseMousePositionDemo />
      </Demo>
      <Demo name="useTextSelection" description="選択中の文字">
        <UseTextSelectionDemo />
      </Demo>
      <Demo name="useElementSize" description="要素の大きさ">
        <UseElementSizeDemo />
      </Demo>
      <Demo name="useResizeObserver" description="要素の大きさと位置">
        <UseResizeObserverDemo />
      </Demo>
      <Demo name="useViewportSize" description="ウィンドウの大きさ">
        <UseViewportSizeDemo />
      </Demo>
      <Demo name="useWindowScroll" description="ページのスクロール位置">
        <UseWindowScrollDemo />
      </Demo>
      <Demo name="useScrollIntoView" description="指定の要素までスクロール">
        <UseScrollIntoViewDemo />
      </Demo>
      <Demo name="useScrollSpy" description="いま見えている見出し">
        <UseScrollSpyDemo />
      </Demo>
      <Demo name="useScrollDirection" description="スクロールの向き">
        <UseScrollDirectionDemo />
      </Demo>
      <Demo name="useHeadroom" description="スクロールでヘッダーを隠す判定">
        <UseHeadroomDemo />
      </Demo>
      <Demo name="useInViewport" description="画面内に見えているか">
        <UseInViewportDemo />
      </Demo>
      <Demo name="useIntersection" description="IntersectionObserver">
        <UseIntersectionDemo />
      </Demo>
      <Demo name="useMutationObserver" description="子要素の変化を監視">
        <UseMutationObserverDemo />
      </Demo>
      <Demo name="useMutationObserverTarget" description="任意の要素の変化を監視">
        <UseMutationObserverTargetDemo />
      </Demo>
    </Section>
  );
}
