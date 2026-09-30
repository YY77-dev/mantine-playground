'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Code,
  ColorSwatch,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  useCallbackRef,
  useClipboard,
  useCollapse,
  useColorScheme,
  useDidUpdate,
  useDisclosure,
  useDocumentTitle,
  useDocumentVisibility,
  useEyeDropper,
  useFavicon,
  useFetch,
  useFileDialog,
  useFloatingWindow,
  useForceUpdate,
  useFullscreenDocument,
  useFullscreenElement,
  useHash,
  useHorizontalCollapse,
  useHover,
  useId,
  useIsFirstRender,
  useIsomorphicEffect,
  useLocalStorage,
  useLogger,
  useMask,
  useMediaQuery,
  useMergedRef,
  useMounted,
  useNetwork,
  useOrientation,
  useOs,
  usePageLeave,
  usePagination,
  useReducedMotion,
  useRovingIndex,
  useScroller,
  useSessionStorage,
  useShallowEffect,
  useSplitter,
} from '@mantine/hooks';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Demo, Section } from './Section';

function UseMediaQueryDemo() {
  const wide = useMediaQuery('(min-width: 62em)');
  return <Text size="sm">画面幅 62em 以上か: {wide ? 'はい' : 'いいえ'}</Text>;
}

function UseColorSchemeDemo() {
  const scheme = useColorScheme();
  return <Text size="sm">OS の配色設定: {scheme === 'dark' ? 'ダーク' : 'ライト'}</Text>;
}

function UseReducedMotionDemo() {
  const reduced = useReducedMotion();
  return <Text size="sm">「視差効果を減らす」設定: {reduced ? 'オン' : 'オフ'}</Text>;
}

function UseOsDemo() {
  const os = useOs();
  return <Text size="sm">OS: {os}</Text>;
}

function UseNetworkDemo() {
  const network = useNetwork();
  return (
    <Group gap="xs">
      <Badge color={network.online ? 'teal' : 'red'}>
        {network.online ? 'オンライン' : 'オフライン'}
      </Badge>
      <Text size="sm">回線の種類: {network.effectiveType ?? '取得不可'}</Text>
    </Group>
  );
}

function UseOrientationDemo() {
  const { angle, type } = useOrientation();
  return (
    <Text size="sm">
      画面の向き: {type}（{angle}°）
    </Text>
  );
}

function UseDocumentTitleDemo() {
  const [title, setTitle] = useState('');
  useDocumentTitle(title);
  return (
    <TextInput
      size="xs"
      value={title}
      onChange={(e) => setTitle(e.currentTarget.value)}
      placeholder="入力するとタブのタイトルが変わる"
    />
  );
}

function UseDocumentVisibilityDemo() {
  const visibility = useDocumentVisibility();
  const [hiddenCount, setHiddenCount] = useState(0);
  useDidUpdate(() => {
    if (visibility === 'hidden') setHiddenCount((c) => c + 1);
  }, [visibility]);
  return (
    <Text size="sm">
      いまの状態: {visibility}／別のタブに移った回数: {hiddenCount}
    </Text>
  );
}

const faviconColors = ['#fa5252', '#40c057', '#228be6'];

function UseFaviconDemo() {
  const [color, setColor] = useState('');
  const url = color
    ? `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="${color}"/></svg>`)}`
    : '';
  useFavicon(url);
  return (
    <Group gap="xs">
      <Text size="sm">タブのアイコンを変える:</Text>
      {faviconColors.map((c) => (
        <ColorSwatch
          key={c}
          color={c}
          component="button"
          onClick={() => setColor(c)}
          className="cursor-pointer"
        />
      ))}
    </Group>
  );
}

function UseHashDemo() {
  const [hash, setHash] = useHash();
  return (
    <Group gap="xs">
      <Button size="xs" variant="light" onClick={() => setHash('#hooks-misc')}>
        URL に #hooks-misc を付ける
      </Button>
      <Text size="sm">
        現在: <Code>{hash || '（なし）'}</Code>
      </Text>
    </Group>
  );
}

function UseFullscreenElementDemo() {
  const { ref, toggle, fullscreen } = useFullscreenElement();
  return (
    <Box ref={ref} p="sm" bg="dark.6" c="white" className="rounded">
      <Button size="xs" color={fullscreen ? 'red' : 'blue'} onClick={toggle}>
        {fullscreen ? '全画面を終了' : 'この枠を全画面にする'}
      </Button>
    </Box>
  );
}

function UseFullscreenDocumentDemo() {
  const { toggle, fullscreen } = useFullscreenDocument();
  return (
    <Button size="xs" variant="light" color={fullscreen ? 'red' : 'blue'} onClick={toggle}>
      {fullscreen ? '全画面を終了' : 'ページ全体を全画面にする'}
    </Button>
  );
}

function UsePageLeaveDemo() {
  const [count, setCount] = useState(0);
  usePageLeave(() => setCount((c) => c + 1));
  return <Text size="sm">マウスがページの外に出た回数: {count}</Text>;
}

function UseEyeDropperDemo() {
  const { supported, open } = useEyeDropper();
  const [color, setColor] = useState('');
  if (!supported)
    return (
      <Text size="sm">
        このブラウザは EyeDropper に対応していません（Chrome や Edge で使えます）
      </Text>
    );
  return (
    <Group>
      <Button
        size="xs"
        variant="light"
        onClick={async () => setColor((await open())?.sRGBHex ?? '')}
      >
        画面から色を拾う
      </Button>
      {color && (
        <Group gap={4}>
          <ColorSwatch color={color} size={18} />
          <Code>{color}</Code>
        </Group>
      )}
    </Group>
  );
}

function UseClipboardDemo() {
  const clipboard = useClipboard({ timeout: 1500 });
  return (
    <Button
      size="xs"
      variant="light"
      color={clipboard.copied ? 'teal' : 'blue'}
      onClick={() => clipboard.copy('Mantine は便利')}
    >
      {clipboard.copied ? 'コピーしました' : '「Mantine は便利」をコピー'}
    </Button>
  );
}

function UseFileDialogDemo() {
  const fileDialog = useFileDialog({ multiple: true });
  return (
    <Stack gap={4}>
      <Group gap="xs">
        <Button size="xs" variant="light" onClick={fileDialog.open}>
          ファイルを選ぶ
        </Button>
        <Button size="xs" variant="default" onClick={fileDialog.reset}>
          リセット
        </Button>
      </Group>
      <Text size="sm">
        {fileDialog.files && fileDialog.files.length > 0
          ? Array.from(fileDialog.files, (f) => f.name).join(', ')
          : '未選択'}
      </Text>
    </Stack>
  );
}

function UseLocalStorageDemo() {
  const [memo, setMemo, removeMemo] = useLocalStorage({
    key: 'showcase-memo',
    defaultValue: '',
  });
  return (
    <Group gap="xs" align="flex-end">
      <TextInput
        size="xs"
        value={memo}
        onChange={(e) => setMemo(e.currentTarget.value)}
        placeholder="再読み込みしても残る"
        className="flex-1"
      />
      <Button size="xs" variant="default" onClick={removeMemo}>
        消す
      </Button>
    </Group>
  );
}

function UseSessionStorageDemo() {
  const [memo, setMemo] = useSessionStorage({
    key: 'showcase-session-memo',
    defaultValue: '',
  });
  return (
    <TextInput
      size="xs"
      value={memo}
      onChange={(e) => setMemo(e.currentTarget.value)}
      placeholder="タブを閉じるまで残る"
    />
  );
}

/** 外部サーバーに依存しないよう、data URL の JSON を読み込む */
const sampleJsonUrl = `data:application/json,${encodeURIComponent(JSON.stringify({ game: 'カタン', players: 4 }))}`;

function UseFetchDemo() {
  const { data, loading, error, refetch } = useFetch<{
    game: string;
    players: number;
  }>(sampleJsonUrl, { autoInvoke: false });
  return (
    <Stack gap={4}>
      <Button size="xs" variant="light" loading={loading} onClick={refetch}>
        JSON を取得
      </Button>
      <Code>{error ? error.message : JSON.stringify(data)}</Code>
    </Stack>
  );
}

function UsePaginationDemo() {
  const pagination = usePagination({ total: 20, initialPage: 1, siblings: 1 });
  return (
    <Group gap={4}>
      <Button size="compact-xs" variant="default" onClick={pagination.previous}>
        前
      </Button>
      {pagination.range.map((item, i) =>
        item === 'dots' ? (
          <Text key={`dots-${i}`} size="xs">
            …
          </Text>
        ) : (
          <Button
            key={item}
            size="compact-xs"
            variant={item === pagination.active ? 'filled' : 'subtle'}
            onClick={() => pagination.setPage(item)}
          >
            {item}
          </Button>
        ),
      )}
      <Button size="compact-xs" variant="default" onClick={pagination.next}>
        次
      </Button>
    </Group>
  );
}

function UseCollapseDemo() {
  const [expanded, { toggle }] = useDisclosure(false);
  const { getCollapseProps } = useCollapse({ expanded });
  return (
    <>
      <Button size="xs" variant="light" onClick={toggle}>
        縦に開閉
      </Button>
      <div {...getCollapseProps()}>
        <Text size="sm" pt="xs">
          useCollapse で開閉している中身
        </Text>
      </div>
    </>
  );
}

function UseHorizontalCollapseDemo() {
  const [expanded, { toggle }] = useDisclosure(true);
  const { getCollapseProps } = useHorizontalCollapse({ expanded });
  return (
    <Group wrap="nowrap" gap="xs">
      <Button size="xs" variant="light" onClick={toggle}>
        横に開閉
      </Button>
      <div {...getCollapseProps()}>
        <Badge size="lg" className="whitespace-nowrap">
          横に伸び縮みする
        </Badge>
      </div>
    </Group>
  );
}

function UseMaskDemo() {
  const { ref, value, rawValue, isComplete } = useMask({ mask: '999-9999' });
  return (
    <Stack gap={4}>
      <input
        ref={ref}
        placeholder="郵便番号 123-4567"
        className="rounded border border-gray-300 px-2 py-1 text-sm"
      />
      <Text size="xs" c="dimmed">
        表示値: {value || '-'} ／ 数字だけ: {rawValue || '-'} ／{' '}
        {isComplete ? '入力完了' : '入力途中'}
      </Text>
    </Stack>
  );
}

const rovingItems = ['赤', '青', '緑', '黄'];

function UseRovingIndexDemo() {
  const { getItemProps, focusedIndex } = useRovingIndex({
    total: rovingItems.length,
    orientation: 'horizontal',
    loop: true,
  });
  return (
    <Stack gap={4}>
      <Group gap="xs">
        {rovingItems.map((item, index) => (
          <Button
            key={item}
            size="xs"
            variant={index === focusedIndex ? 'filled' : 'default'}
            {...getItemProps({ index })}
          >
            {item}
          </Button>
        ))}
      </Group>
      <Text size="xs" c="dimmed">
        1 つクリックしたあと ← → キーで移動できます
      </Text>
    </Stack>
  );
}

function UseSplitterDemo() {
  const { ref, sizes, getHandleProps } = useSplitter<HTMLDivElement>({
    panels: [
      { defaultSize: '50%', min: '20%' },
      { defaultSize: '50%', min: '20%' },
    ],
  });
  return (
    <div ref={ref} className="flex h-20 overflow-hidden rounded border border-gray-300">
      <div
        style={{ flexBasis: sizes[0] }}
        className="flex items-center justify-center bg-blue-50 text-sm dark:bg-blue-950"
      >
        左
      </div>
      <div
        {...getHandleProps({ index: 0 })}
        className="w-1.5 cursor-col-resize bg-gray-300 hover:bg-blue-400"
      />
      <div
        style={{ flexBasis: sizes[1] }}
        className="flex items-center justify-center bg-teal-50 text-sm dark:bg-teal-950"
      >
        右
      </div>
    </div>
  );
}

function UseScrollerDemo() {
  const { ref, canScrollStart, canScrollEnd, scrollStart, scrollEnd } = useScroller<HTMLDivElement>(
    { scrollAmount: 120 },
  );
  return (
    <Group wrap="nowrap" gap={4}>
      <Button
        size="compact-sm"
        variant="default"
        disabled={!canScrollStart}
        onClick={scrollStart}
        aria-label="左へ"
      >
        <IconChevronLeft size={14} />
      </Button>
      <div ref={ref} className="flex [scrollbar-width:none] gap-1 overflow-x-auto">
        {Array.from({ length: 15 }, (_, i) => (
          <Badge key={i} variant="light" className="shrink-0">
            項目 {i + 1}
          </Badge>
        ))}
      </div>
      <Button
        size="compact-sm"
        variant="default"
        disabled={!canScrollEnd}
        onClick={scrollEnd}
        aria-label="右へ"
      >
        <IconChevronRight size={14} />
      </Button>
    </Group>
  );
}

function FloatingPanel({ onClose }: { onClose: () => void }) {
  const { ref, isDragging } = useFloatingWindow<HTMLDivElement>({
    constrainToViewport: true,
    initialPosition: { bottom: 40, left: 40 },
  });
  return (
    <Paper
      ref={ref}
      shadow="lg"
      p="sm"
      withBorder
      w={220}
      className="fixed z-[200] cursor-move"
      style={{ opacity: isDragging ? 0.8 : 1 }}
    >
      <Text size="sm" fw={600}>
        どこでもドラッグ
      </Text>
      <Button size="compact-xs" variant="subtle" mt="xs" onClick={onClose}>
        閉じる
      </Button>
    </Paper>
  );
}

function UseFloatingWindowDemo() {
  const [opened, { toggle, close }] = useDisclosure(false);
  return (
    <>
      <Button size="xs" variant="light" onClick={toggle}>
        {opened ? '閉じる' : '動かせる窓を出す'}
      </Button>
      {opened && <FloatingPanel onClose={close} />}
    </>
  );
}

function UseIdDemo() {
  const id = useId();
  return (
    <Stack gap={4}>
      <label htmlFor={id} className="text-sm">
        ラベルと入力欄を id でつなぐ
      </label>
      <input id={id} className="rounded border border-gray-300 px-2 py-1 text-sm" />
      <Text size="xs" c="dimmed">
        生成された id: <Code>{id}</Code>
      </Text>
    </Stack>
  );
}

function UseMergedRefDemo() {
  const localRef = useRef<HTMLInputElement>(null);
  const { ref: hoverRef, hovered } = useHover<HTMLInputElement>();
  const mergedRef = useMergedRef(localRef, hoverRef);
  return (
    <Group gap="xs">
      <input
        ref={mergedRef}
        className="rounded border border-gray-300 px-2 py-1 text-sm"
        placeholder="1 つの要素に 2 つの ref"
      />
      <Button size="xs" variant="light" onClick={() => localRef.current?.focus()}>
        ref でフォーカス
      </Button>
      <Text size="xs">{hovered ? 'ホバー中' : ''}</Text>
    </Group>
  );
}

function UseMountedDemo() {
  const mounted = useMounted();
  return (
    <Text size="sm">ブラウザでの描画が終わったか: {mounted ? 'はい' : 'いいえ（サーバー側）'}</Text>
  );
}

function UseIsFirstRenderDemo() {
  const isFirst = useIsFirstRender();
  const mounted = useMounted();
  const forceUpdate = useForceUpdate();
  return (
    <Stack gap={4}>
      <Group>
        {/* サーバーとクライアントで値がずれないよう、マウント後だけ表示する */}
        <Text size="sm">初回の描画か: {mounted ? String(isFirst) : '-'}</Text>
        <Button size="xs" variant="light" onClick={forceUpdate}>
          再描画
        </Button>
      </Group>
      <Text size="xs" c="dimmed">
        初回の描画だけ true、2 回目以降は false を返します
      </Text>
    </Stack>
  );
}

function UseForceUpdateDemo() {
  const forceUpdate = useForceUpdate();
  const mounted = useMounted();
  return (
    <Group>
      <Button size="xs" variant="light" onClick={forceUpdate}>
        強制的に再描画
      </Button>
      <Text size="sm">描画時刻: {mounted ? new Date().toLocaleTimeString() : '-'}</Text>
    </Group>
  );
}

function UseDidUpdateDemo() {
  const [value, setValue] = useState(0);
  const [log, setLog] = useState('まだ変化なし');
  useDidUpdate(() => setLog(`${value} に変わりました`), [value]);
  return (
    <Group>
      <Button size="xs" variant="light" onClick={() => setValue((v) => v + 1)}>
        +1
      </Button>
      <Text size="sm">{log}（初回は呼ばれない）</Text>
    </Group>
  );
}

function UseShallowEffectDemo() {
  const [tick, setTick] = useState(0);
  const [runs, setRuns] = useState(0);
  const filter = { players: 4 };
  useShallowEffect(() => {
    setRuns((r) => r + 1);
  }, [filter]);
  return (
    <Group>
      <Button size="xs" variant="light" onClick={() => setTick((t) => t + 1)}>
        再描画（{tick}）
      </Button>
      <Text size="sm">effect の実行回数: {runs}（中身が同じなら増えない）</Text>
    </Group>
  );
}

function UseLoggerDemo() {
  const [count, setCount] = useState(0);
  useLogger('UseLoggerDemo', [{ count }]);
  return (
    <Group>
      <Button size="xs" variant="light" onClick={() => setCount((c) => c + 1)}>
        count: {count}
      </Button>
      <Text size="xs" c="dimmed">
        ブラウザのコンソールに値の変化が出ます
      </Text>
    </Group>
  );
}

function UseCallbackRefDemo() {
  const [count, setCount] = useState(0);
  const [logged, setLogged] = useState<number | null>(null);
  const logCount = useCallbackRef(() => setLogged(count));
  useEffect(() => {
    const id = window.setInterval(logCount, 1000);
    return () => window.clearInterval(id);
  }, [logCount]);
  return (
    <Group>
      <Button size="xs" variant="light" onClick={() => setCount((c) => c + 1)}>
        count: {count}
      </Button>
      <Text size="sm">1 秒ごとに読んだ最新値: {logged ?? '-'}</Text>
    </Group>
  );
}

function UseIsomorphicEffectDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useIsomorphicEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
  }, []);
  return (
    <div ref={ref}>
      <Text size="sm">
        描画直後に測った幅: {width}px（サーバーでは useEffect、ブラウザでは useLayoutEffect）
      </Text>
    </div>
  );
}

export function HooksMiscShowcase() {
  return (
    <Section
      id="hooks-misc"
      title="フック: ブラウザ・保存・その他（@mantine/hooks）"
      description="ブラウザの機能や環境、保存、細かな補助のフック"
    >
      <Demo name="useMediaQuery" description="メディアクエリの判定">
        <UseMediaQueryDemo />
      </Demo>
      <Demo name="useColorScheme" description="OS の配色設定">
        <UseColorSchemeDemo />
      </Demo>
      <Demo name="useReducedMotion" description="動きを減らす設定">
        <UseReducedMotionDemo />
      </Demo>
      <Demo name="useOs" description="OS の種類">
        <UseOsDemo />
      </Demo>
      <Demo name="useNetwork" description="ネットワークの状態">
        <UseNetworkDemo />
      </Demo>
      <Demo name="useOrientation" description="画面の向き">
        <UseOrientationDemo />
      </Demo>
      <Demo name="useDocumentTitle" description="タブのタイトル">
        <UseDocumentTitleDemo />
      </Demo>
      <Demo name="useDocumentVisibility" description="タブが見えているか">
        <UseDocumentVisibilityDemo />
      </Demo>
      <Demo name="useFavicon" description="タブのアイコン">
        <UseFaviconDemo />
      </Demo>
      <Demo name="useHash" description="URL の # 部分">
        <UseHashDemo />
      </Demo>
      <Demo name="useFullscreenElement" description="要素を全画面表示">
        <UseFullscreenElementDemo />
      </Demo>
      <Demo name="useFullscreenDocument" description="ページを全画面表示">
        <UseFullscreenDocumentDemo />
      </Demo>
      <Demo name="usePageLeave" description="マウスがページから出た">
        <UsePageLeaveDemo />
      </Demo>
      <Demo name="useEyeDropper" description="スポイトで色を拾う">
        <UseEyeDropperDemo />
      </Demo>
      <Demo name="useClipboard" description="クリップボードにコピー">
        <UseClipboardDemo />
      </Demo>
      <Demo name="useFileDialog" description="ファイル選択ダイアログ">
        <UseFileDialogDemo />
      </Demo>
      <Demo name="useLocalStorage" description="localStorage と同期">
        <UseLocalStorageDemo />
      </Demo>
      <Demo name="useSessionStorage" description="sessionStorage と同期">
        <UseSessionStorageDemo />
      </Demo>
      <Demo name="useFetch" description="データの取得">
        <UseFetchDemo />
      </Demo>
      <Demo name="usePagination" description="ページ番号の計算">
        <UsePaginationDemo />
      </Demo>
      <Demo name="useCollapse" description="縦方向の開閉アニメーション">
        <UseCollapseDemo />
      </Demo>
      <Demo name="useHorizontalCollapse" description="横方向の開閉アニメーション">
        <UseHorizontalCollapseDemo />
      </Demo>
      <Demo name="useMask" description="入力に書式を付ける">
        <UseMaskDemo />
      </Demo>
      <Demo name="useRovingIndex" description="矢印キーでフォーカス移動">
        <UseRovingIndexDemo />
      </Demo>
      <Demo name="useSplitter" description="分割ペインを自作する">
        <UseSplitterDemo />
      </Demo>
      <Demo name="useScroller" description="横スクロールを自作する">
        <UseScrollerDemo />
      </Demo>
      <Demo name="useFloatingWindow" description="ドラッグで動く要素を自作する">
        <UseFloatingWindowDemo />
      </Demo>
      <Demo name="useId" description="一意な id">
        <UseIdDemo />
      </Demo>
      <Demo name="useMergedRef" description="複数の ref をまとめる">
        <UseMergedRefDemo />
      </Demo>
      <Demo name="useMounted" description="マウント済みか">
        <UseMountedDemo />
      </Demo>
      <Demo name="useIsFirstRender" description="初回の描画か">
        <UseIsFirstRenderDemo />
      </Demo>
      <Demo name="useForceUpdate" description="強制的に再描画">
        <UseForceUpdateDemo />
      </Demo>
      <Demo name="useDidUpdate" description="初回を除いて effect を実行">
        <UseDidUpdateDemo />
      </Demo>
      <Demo name="useShallowEffect" description="浅い比較の useEffect">
        <UseShallowEffectDemo />
      </Demo>
      <Demo name="useLogger" description="値の変化をコンソールに出す">
        <UseLoggerDemo />
      </Demo>
      <Demo name="useCallbackRef" description="常に最新の関数を呼ぶ">
        <UseCallbackRefDemo />
      </Demo>
      <Demo name="useIsomorphicEffect" description="SSR でも安全な useLayoutEffect">
        <UseIsomorphicEffectDemo />
      </Demo>
    </Section>
  );
}
