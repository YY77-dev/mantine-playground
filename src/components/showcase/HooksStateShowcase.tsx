'use client';

import { useState } from 'react';
import { Badge, Button, Checkbox, Code, Group, Stack, Text, TextInput } from '@mantine/core';
import {
  useCounter,
  useDebouncedCallback,
  useDebouncedState,
  useDebouncedValue,
  useDisclosure,
  useIdle,
  useInputState,
  useInterval,
  useListState,
  useMap,
  usePrevious,
  useQueue,
  useSelection,
  useSet,
  useSetState,
  useStateHistory,
  useThrottledCallback,
  useThrottledState,
  useThrottledValue,
  useTimeout,
  useToggle,
  useUncontrolled,
  useValidatedState,
} from '@mantine/hooks';
import { Demo, Section } from './Section';

function UseDisclosureDemo() {
  const [opened, { toggle, open, close }] = useDisclosure(false);
  return (
    <Group gap="xs">
      <Button size="xs" onClick={open}>
        open
      </Button>
      <Button size="xs" variant="default" onClick={close}>
        close
      </Button>
      <Button size="xs" variant="light" onClick={toggle}>
        toggle
      </Button>
      <Badge color={opened ? 'teal' : 'gray'}>{opened ? '開' : '閉'}</Badge>
    </Group>
  );
}

function UseToggleDemo() {
  const [value, toggle] = useToggle(['グー', 'チョキ', 'パー'] as const);
  return (
    <Button size="xs" variant="light" onClick={() => toggle()}>
      {value}
    </Button>
  );
}

function UseCounterDemo() {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
  return (
    <Group gap="xs">
      <Button size="xs" variant="default" onClick={handlers.decrement}>
        −
      </Button>
      <Text fw={700}>{count}</Text>
      <Button size="xs" variant="default" onClick={handlers.increment}>
        ＋
      </Button>
      <Button size="xs" variant="subtle" onClick={handlers.reset}>
        reset
      </Button>
    </Group>
  );
}

function UseListStateDemo() {
  const [values, handlers] = useListState(['カタン', 'ドミニオン']);
  return (
    <Stack gap={4}>
      {values.map((v, i) => (
        <Group key={`${v}-${i}`} gap="xs">
          <Text size="sm">{v}</Text>
          <Button size="compact-xs" variant="subtle" color="red" onClick={() => handlers.remove(i)}>
            削除
          </Button>
        </Group>
      ))}
      <Button
        size="xs"
        variant="light"
        onClick={() => handlers.append(`ゲーム ${values.length + 1}`)}
      >
        append
      </Button>
    </Stack>
  );
}

function UseSetStateDemo() {
  const [state, setState] = useSetState({ name: 'カタン', players: 4 });
  return (
    <Stack gap="xs">
      <Code>{JSON.stringify(state)}</Code>
      <Button
        size="xs"
        variant="light"
        onClick={() => setState((s) => ({ players: s.players + 1 }))}
      >
        players だけ更新
      </Button>
    </Stack>
  );
}

function UseMapDemo() {
  const scores = useMap<string, number>([
    ['赤', 0],
    ['青', 0],
  ]);
  return (
    <Group gap="xs">
      {Array.from(scores.entries()).map(([color, score]) => (
        <Button key={color} size="xs" variant="light" onClick={() => scores.set(color, score + 1)}>
          {color}: {score}
        </Button>
      ))}
    </Group>
  );
}

function UseSetDemo() {
  const tags = useSet<string>(['協力']);
  return (
    <Group gap="xs">
      {['協力', '対戦', '推理'].map((tag) => (
        <Button
          key={tag}
          size="xs"
          variant={tags.has(tag) ? 'filled' : 'default'}
          onClick={() => (tags.has(tag) ? tags.delete(tag) : tags.add(tag))}
        >
          {tag}
        </Button>
      ))}
    </Group>
  );
}

function UseQueueDemo() {
  const { state, queue, add, cleanQueue } = useQueue<number>({
    initialValues: [],
    limit: 3,
  });
  return (
    <Stack gap={4}>
      <Button size="xs" variant="light" onClick={() => add(Math.ceil(Math.random() * 6))}>
        サイコロを振って追加
      </Button>
      <Text size="sm">表示中（最大 3）: {state.join(', ') || 'なし'}</Text>
      <Text size="sm" c="dimmed">
        待ち行列: {queue.join(', ') || 'なし'}
      </Text>
      <Button size="compact-xs" variant="subtle" onClick={cleanQueue}>
        待ち行列を空にする
      </Button>
    </Stack>
  );
}

function UseStateHistoryDemo() {
  const [value, handlers, history] = useStateHistory(1);
  return (
    <Stack gap={4}>
      <Group gap="xs">
        <Button
          size="xs"
          variant="light"
          onClick={() => handlers.set(Math.ceil(Math.random() * 100))}
        >
          ランダムな値
        </Button>
        <Button size="xs" variant="default" onClick={() => handlers.back()}>
          戻る
        </Button>
        <Button size="xs" variant="default" onClick={() => handlers.forward()}>
          進む
        </Button>
      </Group>
      <Text size="sm">
        現在: {value}（履歴 {history.current + 1}/{history.history.length}）
      </Text>
    </Stack>
  );
}

function UseInputStateDemo() {
  const [value, setValue] = useInputState('');
  return (
    <Stack gap={4}>
      <TextInput
        size="xs"
        value={value}
        onChange={setValue}
        placeholder="onChange にそのまま渡せる"
      />
      <Text size="sm">{value}</Text>
    </Stack>
  );
}

function UseValidatedStateDemo() {
  const [{ value, lastValidValue, valid }, setValue] = useValidatedState(
    '',
    (v) => /^\d*$/.test(v),
    true,
  );
  return (
    <Stack gap={4}>
      <TextInput
        size="xs"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="数字だけ OK"
        error={!valid}
      />
      <Text size="sm">最後の正しい値: {lastValidValue || '（なし）'}</Text>
    </Stack>
  );
}

/** 親から value を渡されなければ自分で状態を持つ入力欄 */
function FlexibleInput({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [current, handleChange, controlled] = useUncontrolled({
    value,
    defaultValue: '',
    finalValue: '',
    onChange,
  });
  return (
    <TextInput
      size="xs"
      label={controlled ? '制御モード' : '非制御モード'}
      value={current}
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  );
}

function UseUncontrolledDemo() {
  const [value, setValue] = useState('親が管理');
  return (
    <Stack gap="xs">
      <FlexibleInput />
      <FlexibleInput value={value} onChange={setValue} />
    </Stack>
  );
}

const selectionData = ['カタン', 'ドミニオン', 'アグリコラ'];

function UseSelectionDemo() {
  const [selected, handlers] = useSelection({ data: selectionData });
  return (
    <Stack gap={4}>
      <Checkbox
        size="xs"
        label="すべて"
        checked={handlers.isAllSelected()}
        indeterminate={handlers.isSomeSelected() && !handlers.isAllSelected()}
        onChange={() =>
          handlers.isAllSelected()
            ? handlers.resetSelection()
            : handlers.setSelection(selectionData)
        }
      />
      {selectionData.map((item) => (
        <Checkbox
          key={item}
          size="xs"
          ml="md"
          label={item}
          checked={selected.includes(item)}
          onChange={() => handlers.toggle(item)}
        />
      ))}
    </Stack>
  );
}

function UsePreviousDemo() {
  const [value, setValue] = useState(0);
  const previous = usePrevious(value);
  return (
    <Group>
      <Button size="xs" variant="light" onClick={() => setValue(Math.ceil(Math.random() * 6))}>
        サイコロ
      </Button>
      <Text size="sm">
        今回 {value} ／ 前回 {previous ?? '-'}
      </Text>
    </Group>
  );
}

function UseDebouncedValueDemo() {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);
  return (
    <Stack gap={4}>
      <TextInput
        size="xs"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="入力してみる"
      />
      <Text size="sm">0.5 秒後に反映: {debounced}</Text>
    </Stack>
  );
}

function UseDebouncedStateDemo() {
  const [value, setValue] = useDebouncedState('', 500);
  return (
    <Stack gap={4}>
      <TextInput
        size="xs"
        defaultValue={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="入力してみる"
      />
      <Text size="sm">state: {value}</Text>
    </Stack>
  );
}

function UseDebouncedCallbackDemo() {
  const [calls, setCalls] = useState(0);
  const handle = useDebouncedCallback(() => setCalls((c) => c + 1), 500);
  return (
    <Stack gap={4}>
      <TextInput size="xs" onChange={handle} placeholder="打ち終わってから 1 回呼ばれる" />
      <Text size="sm">呼ばれた回数: {calls}</Text>
    </Stack>
  );
}

function UseThrottledValueDemo() {
  const [value, setValue] = useState('');
  const throttled = useThrottledValue(value, 1000);
  return (
    <Stack gap={4}>
      <TextInput
        size="xs"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="速く打ってみる"
      />
      <Text size="sm">1 秒に 1 回だけ更新: {throttled}</Text>
    </Stack>
  );
}

function UseThrottledStateDemo() {
  const [value, setValue] = useThrottledState('', 1000);
  return (
    <Stack gap={4}>
      <TextInput
        size="xs"
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="速く打ってみる"
      />
      <Text size="sm">state: {value}</Text>
    </Stack>
  );
}

function UseThrottledCallbackDemo() {
  const [calls, setCalls] = useState(0);
  const handle = useThrottledCallback(() => setCalls((c) => c + 1), 1000);
  return (
    <Group>
      <Button size="xs" variant="light" onClick={handle}>
        連打してみる
      </Button>
      <Text size="sm">反応した回数: {calls}</Text>
    </Group>
  );
}

function UseIntervalDemo() {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);
  return (
    <Group>
      <Button size="xs" variant="light" onClick={interval.toggle}>
        {interval.active ? '停止' : '開始'}
      </Button>
      <Text size="sm">経過: {seconds} 秒</Text>
    </Group>
  );
}

function UseTimeoutDemo() {
  const [message, setMessage] = useState('');
  const { start, clear } = useTimeout(() => setMessage('2 秒たちました'), 2000);
  return (
    <Group>
      <Button
        size="xs"
        variant="light"
        onClick={() => {
          setMessage('待っています…');
          start();
        }}
      >
        2 秒タイマー
      </Button>
      <Button
        size="xs"
        variant="default"
        onClick={() => {
          clear();
          setMessage('取り消しました');
        }}
      >
        取り消し
      </Button>
      <Text size="sm">{message}</Text>
    </Group>
  );
}

function UseIdleDemo() {
  const idle = useIdle(3000);
  return <Badge color={idle ? 'gray' : 'teal'}>{idle ? '3 秒以上操作なし' : '操作中'}</Badge>;
}

export function HooksStateShowcase() {
  return (
    <Section
      id="hooks-state"
      title="フック: 状態管理・タイミング（@mantine/hooks）"
      description="状態を扱うフックと、実行のタイミングを調整するフック"
    >
      <Demo name="useDisclosure" description="開閉の状態">
        <UseDisclosureDemo />
      </Demo>
      <Demo name="useToggle" description="値を順番に切り替え">
        <UseToggleDemo />
      </Demo>
      <Demo name="useCounter" description="上限・下限付きのカウンター">
        <UseCounterDemo />
      </Demo>
      <Demo name="useListState" description="配列の状態">
        <UseListStateDemo />
      </Demo>
      <Demo name="useSetState" description="オブジェクトを部分更新">
        <UseSetStateDemo />
      </Demo>
      <Demo name="useMap" description="Map の状態">
        <UseMapDemo />
      </Demo>
      <Demo name="useSet" description="Set の状態">
        <UseSetDemo />
      </Demo>
      <Demo name="useQueue" description="上限付きの表示と待ち行列">
        <UseQueueDemo />
      </Demo>
      <Demo name="useStateHistory" description="戻る・進むができる状態">
        <UseStateHistoryDemo />
      </Demo>
      <Demo name="useInputState" description="入力欄用の状態">
        <UseInputStateDemo />
      </Demo>
      <Demo name="useValidatedState" description="検証付きの状態">
        <UseValidatedStateDemo />
      </Demo>
      <Demo name="useUncontrolled" description="制御・非制御の両対応">
        <UseUncontrolledDemo />
      </Demo>
      <Demo name="useSelection" description="複数選択の状態">
        <UseSelectionDemo />
      </Demo>
      <Demo name="usePrevious" description="1 つ前の値">
        <UsePreviousDemo />
      </Demo>
      <Demo name="useDebouncedValue" description="値の反映を遅らせる">
        <UseDebouncedValueDemo />
      </Demo>
      <Demo name="useDebouncedState" description="更新を遅らせる状態">
        <UseDebouncedStateDemo />
      </Demo>
      <Demo name="useDebouncedCallback" description="関数の実行を遅らせる">
        <UseDebouncedCallbackDemo />
      </Demo>
      <Demo name="useThrottledValue" description="値の更新を間引く">
        <UseThrottledValueDemo />
      </Demo>
      <Demo name="useThrottledState" description="更新を間引く状態">
        <UseThrottledStateDemo />
      </Demo>
      <Demo name="useThrottledCallback" description="関数の実行を間引く">
        <UseThrottledCallbackDemo />
      </Demo>
      <Demo name="useInterval" description="一定間隔で実行">
        <UseIntervalDemo />
      </Demo>
      <Demo name="useTimeout" description="一定時間後に実行">
        <UseTimeoutDemo />
      </Demo>
      <Demo name="useIdle" description="操作がないことを検知">
        <UseIdleDemo />
      </Demo>
    </Section>
  );
}
