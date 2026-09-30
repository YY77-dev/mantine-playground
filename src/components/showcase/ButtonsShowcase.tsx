'use client';

import { useState } from 'react';
import {
  ActionBar,
  ActionIcon,
  Burger,
  Button,
  CloseButton,
  CopyButton,
  FileButton,
  Group,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCheck,
  IconCopy,
  IconHeart,
  IconSettings,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react';
import { Demo, Section } from './Section';

export function ButtonsShowcase() {
  const [burgerOpened, burger] = useDisclosure(false);
  const [file, setFile] = useState<File | null>(null);
  const [actionBarOpened, actionBar] = useDisclosure(false);

  return (
    <Section
      id="buttons"
      title="ボタン・アクション"
      description="クリックして操作するコンポーネント"
    >
      <Demo name="Button" description="variant で見た目を変える">
        <Group gap="xs">
          <Button>filled</Button>
          <Button variant="light">light</Button>
          <Button variant="outline">outline</Button>
          <Button variant="subtle">subtle</Button>
          <Button variant="default">default</Button>
          <Button loading>loading</Button>
        </Group>
      </Demo>

      <Demo name="Button.Group" description="ボタンをくっつけて並べる">
        <Button.Group>
          <Button variant="default">前へ</Button>
          <Button variant="default">1</Button>
          <Button variant="default">次へ</Button>
        </Button.Group>
      </Demo>

      <Demo name="ActionIcon" description="アイコンだけのボタン">
        <Group gap="xs">
          <ActionIcon aria-label="お気に入り">
            <IconHeart size={18} />
          </ActionIcon>
          <ActionIcon variant="light" color="red" aria-label="削除">
            <IconTrash size={18} />
          </ActionIcon>
          <ActionIcon.Group>
            <ActionIcon variant="default" aria-label="設定">
              <IconSettings size={18} />
            </ActionIcon>
            <ActionIcon variant="default" aria-label="アップロード">
              <IconUpload size={18} />
            </ActionIcon>
          </ActionIcon.Group>
        </Group>
      </Demo>

      <Demo name="CloseButton" description="閉じるボタン">
        <Group>
          <CloseButton aria-label="閉じる" />
          <CloseButton size="lg" variant="light" aria-label="閉じる" />
        </Group>
      </Demo>

      <Demo name="CopyButton" description="クリップボードにコピー">
        <CopyButton value="https://mantine.dev">
          {({ copied, copy }) => (
            <Button
              color={copied ? 'teal' : 'blue'}
              leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              onClick={copy}
            >
              {copied ? 'コピーしました' : 'URL をコピー'}
            </Button>
          )}
        </CopyButton>
      </Demo>

      <Demo name="FileButton" description="ボタンからファイルを選ぶ">
        <Group>
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => (
              <Button variant="light" {...props}>
                画像を選ぶ
              </Button>
            )}
          </FileButton>
          <Text size="sm" c="dimmed">
            {file ? file.name : '未選択'}
          </Text>
        </Group>
      </Demo>

      <Demo name="UnstyledButton" description="見た目なしのボタン">
        <UnstyledButton
          onClick={() => undefined}
          className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Text size="sm">自由に装飾できるボタン</Text>
        </UnstyledButton>
      </Demo>

      <Demo name="Burger" description="メニューの開閉ボタン">
        <Group>
          <Burger opened={burgerOpened} onClick={burger.toggle} aria-label="メニューを開閉" />
          <Text size="sm">{burgerOpened ? '開いている' : '閉じている'}</Text>
        </Group>
      </Demo>

      <Demo name="ActionBar" description="選択中に下から出る操作バー">
        <Button variant="light" onClick={actionBar.toggle}>
          {actionBarOpened ? 'ActionBar を閉じる' : 'ActionBar を開く'}
        </Button>
        <ActionBar opened={actionBarOpened} onClose={actionBar.close} aria-label="選択中の操作">
          <Text size="sm" px="xs">
            3 件を選択中
          </Text>
          <ActionBar.Divider />
          <Tooltip label="削除">
            <ActionIcon variant="subtle" color="red" aria-label="削除">
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
          <ActionBar.CloseButton />
        </ActionBar>
      </Demo>
    </Section>
  );
}
