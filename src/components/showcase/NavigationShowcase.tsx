'use client';

import { useState } from 'react';
import {
  Anchor,
  Breadcrumbs,
  Button,
  Group,
  Menu,
  Menubar,
  NavLink,
  Pagination,
  Stepper,
  Tabs,
  Text,
  Tree,
  useTree,
} from '@mantine/core';
import {
  IconChevronDown,
  IconDice,
  IconHome,
  IconSettings,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import { Demo, Section } from './Section';

const treeData = [
  {
    value: 'src',
    label: 'src',
    children: [
      {
        value: 'src/app',
        label: 'app',
        children: [{ value: 'src/app/page.tsx', label: 'page.tsx' }],
      },
      {
        value: 'src/lib',
        label: 'lib',
        children: [{ value: 'src/lib/api.ts', label: 'api.ts' }],
      },
    ],
  },
  { value: 'package.json', label: 'package.json' },
];

function TreeDemo() {
  const tree = useTree({ initialExpandedState: { src: true } });
  return (
    <Tree
      data={treeData}
      tree={tree}
      renderNode={({ node, expanded, hasChildren, elementProps }) => (
        <Group gap={4} {...elementProps}>
          {hasChildren && (
            <IconChevronDown
              size={14}
              style={{ transform: expanded ? undefined : 'rotate(-90deg)' }}
            />
          )}
          <Text size="sm">{node.label}</Text>
        </Group>
      )}
    />
  );
}

export function NavigationShowcase() {
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(1);
  const [activeNav, setActiveNav] = useState(0);

  return (
    <Section
      id="navigation"
      title="ナビゲーション"
      description="画面や項目を行き来するコンポーネント"
    >
      <Demo name="Tabs" description="タブの切り替え">
        <Tabs defaultValue="rules">
          <Tabs.List>
            <Tabs.Tab value="rules">ルール</Tabs.Tab>
            <Tabs.Tab value="cards">カード</Tabs.Tab>
            <Tabs.Tab value="faq">FAQ</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="rules" pt="xs">
            <Text size="sm">ルールのタブです。</Text>
          </Tabs.Panel>
          <Tabs.Panel value="cards" pt="xs">
            <Text size="sm">カードのタブです。</Text>
          </Tabs.Panel>
          <Tabs.Panel value="faq" pt="xs">
            <Text size="sm">FAQ のタブです。</Text>
          </Tabs.Panel>
        </Tabs>
      </Demo>

      <Demo name="Menu" description="ドロップダウンメニュー">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button variant="default" rightSection={<IconChevronDown size={14} />}>
              メニュー
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>アプリ</Menu.Label>
            <Menu.Item leftSection={<IconSettings size={14} />}>設定</Menu.Item>
            <Menu.Sub>
              <Menu.Sub.Target>
                <Menu.Sub.Item>並べ替え</Menu.Sub.Item>
              </Menu.Sub.Target>
              <Menu.Sub.Dropdown>
                <Menu.Item>名前順</Menu.Item>
                <Menu.Item>新しい順</Menu.Item>
              </Menu.Sub.Dropdown>
            </Menu.Sub>
            <Menu.Divider />
            <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
              削除
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Demo>

      <Demo name="Menubar" description="アプリ上部のメニューバー">
        <Menubar>
          <Menubar.Menu>
            <Menubar.Target>ファイル</Menubar.Target>
            <Menubar.Dropdown>
              <Menu.Item>新規作成</Menu.Item>
              <Menu.Item>開く</Menu.Item>
            </Menubar.Dropdown>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Target>編集</Menubar.Target>
            <Menubar.Dropdown>
              <Menu.Item>元に戻す</Menu.Item>
              <Menu.Item>やり直す</Menu.Item>
            </Menubar.Dropdown>
          </Menubar.Menu>
        </Menubar>
      </Demo>

      <Demo name="NavLink" description="サイドバーのリンク">
        {[
          { label: 'ホーム', icon: IconHome },
          { label: 'ゲーム', icon: IconDice },
          { label: 'フレンド', icon: IconUsers },
        ].map((item, index) => (
          <NavLink
            key={item.label}
            label={item.label}
            leftSection={<item.icon size={16} />}
            active={index === activeNav}
            onClick={() => setActiveNav(index)}
          />
        ))}
      </Demo>

      <Demo name="Breadcrumbs" description="パンくずリスト">
        <Breadcrumbs>
          <Anchor href="#">ホーム</Anchor>
          <Anchor href="#">ゲーム一覧</Anchor>
          <Text size="sm">カタン</Text>
        </Breadcrumbs>
      </Demo>

      <Demo name="Anchor" description="リンク">
        <Anchor href="https://mantine.dev" target="_blank">
          Mantine の公式サイト
        </Anchor>
      </Demo>

      <Demo name="Pagination" description="ページ送り">
        <Pagination total={10} value={page} onChange={setPage} size="sm" />
      </Demo>

      <Demo name="Stepper" description="手順の進み具合" wide>
        <Stepper active={step} onStepClick={setStep} size="sm">
          <Stepper.Step label="ゲームを選ぶ" description="遊ぶゲーム">
            <Text size="sm">ステップ 1 の内容</Text>
          </Stepper.Step>
          <Stepper.Step label="メンバーを招待" description="一緒に遊ぶ人">
            <Text size="sm">ステップ 2 の内容</Text>
          </Stepper.Step>
          <Stepper.Step label="開始" description="準備完了">
            <Text size="sm">ステップ 3 の内容</Text>
          </Stepper.Step>
          <Stepper.Completed>
            <Text size="sm">すべて完了しました</Text>
          </Stepper.Completed>
        </Stepper>
        <Group mt="sm">
          <Button variant="default" size="xs" onClick={() => setStep((s) => Math.max(s - 1, 0))}>
            戻る
          </Button>
          <Button size="xs" onClick={() => setStep((s) => Math.min(s + 1, 3))}>
            次へ
          </Button>
        </Group>
      </Demo>

      <Demo name="Tree" description="ツリー表示">
        <TreeDemo />
      </Demo>

      <Demo name="TableOfContents" description="見出しから目次を作る">
        <Text size="sm">
          左の目次がこのページの h2 見出しから自動生成された TableOfContents
          です。スクロールに合わせて現在位置が光ります。
        </Text>
      </Demo>
    </Section>
  );
}
