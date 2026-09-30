'use client';

import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Group,
  Loader,
  LoadingOverlay,
  Notification,
  Progress,
  RingProgress,
  SemiCircleProgress,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconInfoCircle } from '@tabler/icons-react';
import { Demo, Section } from './Section';

export function FeedbackShowcase() {
  const [overlayVisible, overlay] = useDisclosure(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  return (
    <Section
      id="feedback"
      title="フィードバック・進捗"
      description="状態やお知らせ、読み込み中を伝えるコンポーネント"
    >
      <Demo name="Alert" description="注意書き">
        <Alert variant="light" color="blue" title="お知らせ" icon={<IconInfoCircle />}>
          新しい拡張セットが追加されました。
        </Alert>
      </Demo>

      <Demo name="Notification" description="通知の見た目（置くだけ）">
        <Notification
          icon={<IconCheck size={18} />}
          color="teal"
          title="保存しました"
          withCloseButton={false}
        >
          ゲームの記録を保存しました。
        </Notification>
      </Demo>

      <Demo name="Loader" description="読み込み中の印">
        <Group>
          <Loader size="sm" />
          <Loader size="sm" type="dots" />
          <Loader size="sm" type="bars" color="grape" />
        </Group>
      </Demo>

      <Demo name="LoadingOverlay" description="領域を覆う読み込み表示">
        <Box
          pos="relative"
          p="sm"
          mb="xs"
          bg="var(--mantine-color-default-hover)"
          className="rounded"
        >
          <LoadingOverlay visible={overlayVisible} overlayProps={{ radius: 'sm', blur: 2 }} />
          <Text size="sm">この領域の上にかぶさります。</Text>
        </Box>
        <Button size="xs" onClick={overlay.toggle}>
          {overlayVisible ? '止める' : '読み込み開始'}
        </Button>
      </Demo>

      <Demo name="Skeleton" description="読み込み中の仮表示">
        <Stack gap="xs">
          <Group>
            <Skeleton visible={skeletonLoading} circle height={40} width={40} />
            <Skeleton visible={skeletonLoading} width="60%">
              <Text size="sm">読み込み完了！</Text>
            </Skeleton>
          </Group>
          <Skeleton visible={skeletonLoading} height={8} />
          <Button size="xs" variant="light" onClick={() => setSkeletonLoading((v) => !v)}>
            切り替え
          </Button>
        </Stack>
      </Demo>

      <Demo name="Progress" description="横棒の進捗">
        <Stack gap="xs">
          <Progress value={65} />
          <Progress.Root size="xl">
            <Progress.Section value={40} color="blue">
              <Progress.Label>赤</Progress.Label>
            </Progress.Section>
            <Progress.Section value={25} color="teal">
              <Progress.Label>青</Progress.Label>
            </Progress.Section>
            <Progress.Section value={15} color="orange">
              <Progress.Label>緑</Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </Stack>
      </Demo>

      <Demo name="RingProgress" description="円の進捗">
        <RingProgress
          size={100}
          thickness={10}
          sections={[
            { value: 40, color: 'blue', tooltip: '勝ち 40%' },
            { value: 20, color: 'red', tooltip: '負け 20%' },
          ]}
          label={
            <Text ta="center" size="xs">
              勝率
            </Text>
          }
        />
      </Demo>

      <Demo name="SemiCircleProgress" description="半円の進捗">
        <SemiCircleProgress value={72} size={160} thickness={12} label="72%" />
      </Demo>
    </Section>
  );
}
