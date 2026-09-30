'use client';

import { useState } from 'react';
import {
  Avatar,
  BackgroundImage,
  Badge,
  Blockquote,
  Button,
  Code,
  ColorSwatch,
  DataList,
  EmptyState,
  Group,
  Highlight,
  Image,
  Indicator,
  Kbd,
  List,
  Mark,
  Marquee,
  NumberFormatter,
  OverflowList,
  Pill,
  RollingNumber,
  Spoiler,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Timeline,
  Title,
  Typography,
} from '@mantine/core';
import {
  IconCheck,
  IconDice,
  IconGitBranch,
  IconGitCommit,
  IconMoodEmpty,
  IconQuote,
  IconStar,
} from '@tabler/icons-react';
import { Demo, Section } from './Section';

/**
 * 外部画像に頼らないよう、グラデーションの SVG を data URI で作る。
 * BackgroundImage は CSS の url() に引用符なしで埋め込むので、括弧もエスケープする
 */
const sampleImage = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4dabf7"/><stop offset="1" stop-color="#9775fa"/></linearGradient></defs><rect width="400" height="200" fill="url(#g)"/></svg>',
)
  .replace(/\(/g, '%28')
  .replace(/\)/g, '%29')}`;

const tableRows = [
  { name: 'カタン', players: '3〜4', time: '60 分' },
  { name: 'カルカソンヌ', players: '2〜5', time: '35 分' },
  { name: 'ドミニオン', players: '2〜4', time: '30 分' },
];

const tagList = [
  '戦略',
  '協力',
  '推理',
  'ブラフ',
  '陣取り',
  'デッキ構築',
  'ダイス',
  '協力型',
  'パーティー',
  '2人用',
];

export function DataDisplayShowcase() {
  const [score, setScore] = useState(1280);

  return (
    <Section id="data-display" title="表示・データ" description="文字や情報を見せるコンポーネント">
      <Demo name="Title" description="見出し h1〜h6">
        <Title order={3}>order=3 の見出し</Title>
        <Title order={5}>order=5 の見出し</Title>
      </Demo>

      <Demo name="Text" description="本文">
        <Text size="lg" fw={700}>
          太字の大きな文字
        </Text>
        <Text size="sm" c="dimmed">
          薄い色の小さな文字
        </Text>
        <Text variant="gradient" gradient={{ from: 'blue', to: 'grape' }} fw={700}>
          グラデーション文字
        </Text>
        <Text lineClamp={1} size="sm">
          lineClamp を付けると、長い文章が 1 行を超えたところで省略記号付きで切り詰められます。
        </Text>
      </Demo>

      <Demo name="Typography" description="素の HTML に文章用の装飾をあてる">
        <Typography>
          <h4>Typography の中の h4</h4>
          <p>
            中に書いた <strong>p</strong> や <a href="#">a</a>{' '}
            に、読みやすい余白とスタイルが付きます。
          </p>
        </Typography>
      </Demo>

      <Demo name="Highlight" description="一致した文字を強調">
        <Highlight highlight={['ボード', 'ゲーム']} size="sm">
          ボードゲームで遊ぶのは楽しいゲームです
        </Highlight>
      </Demo>

      <Demo name="Mark" description="マーカー">
        <Text size="sm">
          ここは <Mark>大事なところ</Mark> です。
        </Text>
      </Demo>

      <Demo name="Code" description="コード">
        <Text size="sm">
          インライン: <Code>pnpm dev</Code>
        </Text>
        <Code block mt="xs">
          {`const players = 4;\nstartGame(players);`}
        </Code>
      </Demo>

      <Demo name="Kbd" description="キーボードのキー">
        <Text size="sm">
          <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> で検索
        </Text>
      </Demo>

      <Demo name="Blockquote" description="引用">
        <Blockquote color="blue" icon={<IconQuote size={18} />} cite="– 誰かの言葉">
          勝っても負けても、楽しかったなら大成功。
        </Blockquote>
      </Demo>

      <Demo name="List" description="箇条書き">
        <List
          size="sm"
          spacing={4}
          icon={
            <ThemeIcon color="teal" size={18} radius="xl">
              <IconCheck size={12} />
            </ThemeIcon>
          }
        >
          <List.Item>カードを配る</List.Item>
          <List.Item>サイコロを振る</List.Item>
          <List.Item>得点を数える</List.Item>
        </List>
      </Demo>

      <Demo name="Table" description="表">
        <Table.ScrollContainer minWidth={300}>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>名前</Table.Th>
                <Table.Th>人数</Table.Th>
                <Table.Th>時間</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tableRows.map((row) => (
                <Table.Tr key={row.name}>
                  <Table.Td>{row.name}</Table.Td>
                  <Table.Td>{row.players}</Table.Td>
                  <Table.Td>{row.time}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Demo>

      <Demo name="DataList" description="項目名と値の一覧">
        <DataList withDivider size="sm">
          <DataList.Item>
            <DataList.ItemLabel>ゲーム名</DataList.ItemLabel>
            <DataList.ItemValue>カタン</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>人数</DataList.ItemLabel>
            <DataList.ItemValue>3〜4 人</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>対象年齢</DataList.ItemLabel>
            <DataList.ItemValue>10 歳以上</DataList.ItemValue>
          </DataList.Item>
        </DataList>
      </Demo>

      <Demo name="Badge" description="ラベル">
        <Group gap="xs">
          <Badge>新作</Badge>
          <Badge color="red" variant="light">
            人気
          </Badge>
          <Badge color="gray" variant="outline">
            中古
          </Badge>
          <Badge variant="dot">オンライン</Badge>
        </Group>
      </Demo>

      <Demo name="Pill" description="小さなタグ">
        <Pill.Group>
          <Pill>2 人</Pill>
          <Pill withRemoveButton>60 分</Pill>
        </Pill.Group>
      </Demo>

      <Demo name="Avatar" description="アイコン画像">
        <Group>
          <Avatar color="blue" radius="xl">
            PA
          </Avatar>
          <Avatar.Group>
            <Avatar color="red">A</Avatar>
            <Avatar color="green">B</Avatar>
            <Avatar color="grape">C</Avatar>
            <Avatar>+5</Avatar>
          </Avatar.Group>
        </Group>
      </Demo>

      <Demo name="Image" description="画像">
        <Image src={sampleImage} alt="サンプル画像" radius="md" h={100} />
      </Demo>

      <Demo name="BackgroundImage" description="背景画像付きの領域">
        <BackgroundImage src={sampleImage} radius="md" p="lg">
          <Text c="white" fw={700} ta="center">
            背景画像の上の文字
          </Text>
        </BackgroundImage>
      </Demo>

      <Demo name="ThemeIcon" description="色付きの丸いアイコン">
        <Group>
          <ThemeIcon size="lg">
            <IconDice size={20} />
          </ThemeIcon>
          <ThemeIcon size="lg" variant="light" color="yellow" radius="xl">
            <IconStar size={20} />
          </ThemeIcon>
        </Group>
      </Demo>

      <Demo name="ColorSwatch" description="色見本">
        <Group gap="xs">
          {['red', 'orange', 'yellow', 'green', 'blue', 'violet'].map((c) => (
            <ColorSwatch key={c} color={`var(--mantine-color-${c}-6)`} />
          ))}
        </Group>
      </Demo>

      <Demo name="Indicator" description="右上のバッジ">
        <Group gap="xl">
          <Indicator label="3" size={16}>
            <Avatar radius="md">通知</Avatar>
          </Indicator>
          <Indicator color="green" processing position="bottom-end">
            <Avatar radius="xl">PA</Avatar>
          </Indicator>
        </Group>
      </Demo>

      <Demo name="Timeline" description="時系列">
        <Timeline active={1} bulletSize={20} lineWidth={2}>
          <Timeline.Item bullet={<IconGitBranch size={12} />} title="ブランチ作成">
            <Text size="xs" c="dimmed">
              dev ブランチを作成
            </Text>
          </Timeline.Item>
          <Timeline.Item bullet={<IconGitCommit size={12} />} title="コミット">
            <Text size="xs" c="dimmed">
              画面を追加
            </Text>
          </Timeline.Item>
          <Timeline.Item title="レビュー待ち">
            <Text size="xs" c="dimmed">
              これから
            </Text>
          </Timeline.Item>
        </Timeline>
      </Demo>

      <Demo name="Spoiler" description="長い文章を折りたたむ">
        <Spoiler maxHeight={44} showLabel="続きを読む" hideLabel="閉じる">
          <Text size="sm">
            開拓者たちは無人島にたどり着きました。資源を集めて道や村を作り、交渉で足りない資源を手に入れながら、誰よりも早く発展した者が勝者となります。サイコロの出目と交渉のかけひきが勝負を分けます。
          </Text>
        </Spoiler>
      </Demo>

      <Demo name="Marquee" description="流れる文字">
        <Marquee pauseOnHover fadeEdges gap="lg">
          {['カタン', 'カルカソンヌ', 'ドミニオン', 'アグリコラ', 'スプレンダー'].map((g) => (
            <Badge key={g} size="lg" variant="light">
              {g}
            </Badge>
          ))}
        </Marquee>
      </Demo>

      <Demo name="RollingNumber" description="数字が回転して切り替わる">
        <Group>
          <RollingNumber value={score} suffix=" 点" thousandSeparator fz={28} fw={700} />
          <Button size="xs" onClick={() => setScore((s) => s + Math.floor(Math.random() * 500))}>
            加点
          </Button>
        </Group>
      </Demo>

      <Demo name="NumberFormatter" description="数値の書式">
        <Stack gap={2}>
          <Text size="sm">
            <NumberFormatter prefix="¥" value={1234567} thousandSeparator />
          </Text>
          <Text size="sm">
            <NumberFormatter value={0.4567 * 100} decimalScale={1} suffix="%" />
          </Text>
        </Stack>
      </Demo>

      <Demo name="EmptyState" description="データがないときの表示">
        <EmptyState
          size="sm"
          icon={<IconMoodEmpty size={28} />}
          title="まだゲームがありません"
          description="最初のゲームを登録してみましょう"
        >
          <EmptyState.Actions>
            <Button size="xs">ゲームを登録</Button>
          </EmptyState.Actions>
        </EmptyState>
      </Demo>

      <Demo name="OverflowList" description="入りきらない分を「+N」にまとめる">
        <OverflowList
          data={tagList}
          gap={6}
          maxRows={1}
          renderItem={(tag) => (
            <Badge key={tag} variant="light">
              {tag}
            </Badge>
          )}
          renderOverflow={(items) => <Badge color="gray">+{items.length}</Badge>}
        />
      </Demo>
    </Section>
  );
}
