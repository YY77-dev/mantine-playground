'use client';

import {
  Affix,
  AspectRatio,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Splitter,
  SplitterPane,
  Stack,
  Text,
  Transition,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';
import { Demo, Section } from './Section';

/** デモ内で並べる色付きの箱 */
function Cell({ children }: { children: React.ReactNode }) {
  return (
    <Box bg="blue.1" c="blue.9" p="xs" ta="center" className="rounded">
      {children}
    </Box>
  );
}

export function LayoutShowcase() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Section id="layout" title="レイアウト" description="要素の配置や余白を整えるコンポーネント">
      <Demo name="AppShell" description="このページの外枠">
        <Text size="sm">
          ヘッダーと左の目次を含む、このページ全体の枠組みが AppShell
          です。狭い画面では左上のハンバーガーで目次を開閉できます。
        </Text>
      </Demo>

      <Demo name="Container" description="中央寄せと最大幅">
        <Container size="xs" bg="var(--mantine-color-default-hover)" p="xs">
          <Text size="sm" ta="center">
            size=&quot;xs&quot; の Container
          </Text>
        </Container>
      </Demo>

      <Demo name="Grid" description="12 分割のグリッド">
        <Grid>
          <Grid.Col span={6}>
            <Cell>span 6</Cell>
          </Grid.Col>
          <Grid.Col span={3}>
            <Cell>span 3</Cell>
          </Grid.Col>
          <Grid.Col span={3}>
            <Cell>span 3</Cell>
          </Grid.Col>
        </Grid>
      </Demo>

      <Demo name="SimpleGrid" description="同じ幅の列">
        <SimpleGrid cols={3} spacing="xs">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Cell key={n}>{n}</Cell>
          ))}
        </SimpleGrid>
      </Demo>

      <Demo name="Flex" description="flexbox をそのまま使う">
        <Flex justify="space-between" align="center" gap="xs">
          <Cell>左</Cell>
          <Cell>中央</Cell>
          <Cell>右</Cell>
        </Flex>
      </Demo>

      <Demo name="Group" description="横並び">
        <Group>
          <Button size="xs">保存</Button>
          <Button size="xs" variant="default">
            キャンセル
          </Button>
        </Group>
      </Demo>

      <Demo name="Stack" description="縦並び">
        <Stack gap="xs">
          <Cell>1 行目</Cell>
          <Cell>2 行目</Cell>
        </Stack>
      </Demo>

      <Demo name="Center" description="上下左右の中央寄せ">
        <Center h={80} bg="var(--mantine-color-default-hover)">
          <Text size="sm">中央</Text>
        </Center>
      </Demo>

      <Demo name="Space" description="空白を入れる">
        <Cell>上</Cell>
        <Space h="lg" />
        <Cell>h=&quot;lg&quot; の空白の下</Cell>
      </Demo>

      <Demo name="AspectRatio" description="縦横比を固定">
        <AspectRatio ratio={16 / 9} w="100%" maw={240} mx="auto">
          <Center bg="grape.1" c="grape.9">
            16 : 9
          </Center>
        </AspectRatio>
      </Demo>

      <Demo name="Divider" description="区切り線">
        <Text size="sm">上の段落</Text>
        <Divider my="sm" label="または" labelPosition="center" />
        <Text size="sm">下の段落</Text>
      </Demo>

      <Demo name="Box" description="スタイル props を受け取る div">
        <Box p="sm" bg="teal.1" c="teal.9" className="rounded">
          p=&quot;sm&quot; bg=&quot;teal.1&quot; の Box
        </Box>
      </Demo>

      <Demo name="Paper" description="背景と影のある面">
        <Paper shadow="sm" p="md" withBorder>
          <Text size="sm">shadow=&quot;sm&quot; の Paper</Text>
        </Paper>
      </Demo>

      <Demo name="Card" description="カード">
        <Card withBorder padding="sm">
          <Card.Section bg="orange.1" h={60} />
          <Text fw={600} mt="sm">
            カードのタイトル
          </Text>
          <Text size="sm" c="dimmed">
            Card.Section で端まで広がる領域を作れます。
          </Text>
        </Card>
      </Demo>

      <Demo name="Splitter" description="ドラッグで幅を変える">
        <Splitter h={120} className="rounded border border-gray-300">
          <SplitterPane defaultSize="40%" min="20%">
            <Center h="100%">
              <Text size="sm">左ペイン</Text>
            </Center>
          </SplitterPane>
          <SplitterPane defaultSize="60%" min="20%">
            <Center h="100%">
              <Text size="sm">右ペイン</Text>
            </Center>
          </SplitterPane>
        </Splitter>
      </Demo>

      <Demo name="Affix" description="画面の隅に固定">
        <Text size="sm">少しスクロールすると、右下に「上へ戻る」ボタンが表示されます。</Text>
        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 300}>
            {(styles) => (
              <Button
                leftSection={<IconArrowUp size={16} />}
                style={styles}
                onClick={() => scrollTo({ y: 0 })}
              >
                上へ戻る
              </Button>
            )}
          </Transition>
        </Affix>
      </Demo>
    </Section>
  );
}
