'use client';

import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Dialog,
  Drawer,
  FloatingWindow,
  Group,
  HoverCard,
  Modal,
  Overlay,
  Popover,
  Portal,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconGripHorizontal } from '@tabler/icons-react';
import { Demo, Section } from './Section';

export function OverlaysShowcase() {
  const [modalOpened, modal] = useDisclosure(false);
  const [drawerOpened, drawer] = useDisclosure(false);
  const [dialogOpened, dialog] = useDisclosure(false);
  const [windowOpened, floatingWindow] = useDisclosure(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [portalOpened, portal] = useDisclosure(false);

  return (
    <Section
      id="overlays"
      title="オーバーレイ・ポップアップ"
      description="画面の上に重ねて表示するコンポーネント"
    >
      <Demo name="Modal" description="画面中央のダイアログ">
        <Button onClick={modal.open}>モーダルを開く</Button>
        <Modal opened={modalOpened} onClose={modal.close} title="ゲームを削除しますか？" centered>
          <Text size="sm">この操作は取り消せません。</Text>
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={modal.close}>
              キャンセル
            </Button>
            <Button color="red" onClick={modal.close}>
              削除
            </Button>
          </Group>
        </Modal>
      </Demo>

      <Demo name="Drawer" description="横から出てくるパネル">
        <Button onClick={drawer.open}>ドロワーを開く</Button>
        <Drawer opened={drawerOpened} onClose={drawer.close} title="絞り込み" position="right">
          <Stack>
            <TextInput label="キーワード" />
            <Button onClick={drawer.close}>適用</Button>
          </Stack>
        </Drawer>
      </Demo>

      <Demo name="Dialog" description="画面の隅に出る小窓">
        <Button onClick={dialog.toggle}>ダイアログを切り替え</Button>
        <Dialog opened={dialogOpened} withCloseButton onClose={dialog.close} size="md" radius="md">
          <Text size="sm" fw={500} mb="xs">
            ニュースレターを購読しますか？
          </Text>
          <Group align="flex-end">
            <TextInput placeholder="you@example.com" size="xs" className="flex-1" />
            <Button size="xs" onClick={dialog.close}>
              購読
            </Button>
          </Group>
        </Dialog>
      </Demo>

      <Demo name="Popover" description="クリックで出る吹き出し">
        <Popover width={220} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button variant="light">ポップオーバー</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <TextInput label="メモ" size="xs" />
          </Popover.Dropdown>
        </Popover>
      </Demo>

      <Demo name="HoverCard" description="ホバーで出るカード">
        <HoverCard width={240} shadow="md" openDelay={200}>
          <HoverCard.Target>
            <Avatar color="blue" radius="xl" className="cursor-pointer">
              PA
            </Avatar>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm" fw={600}>
              プレイヤー A
            </Text>
            <Text size="xs" c="dimmed">
              好きなゲーム: カタン、ドミニオン
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Demo>

      <Demo name="Tooltip" description="ホバーで出る説明">
        <Group>
          <Tooltip label="上に出るツールチップ" withArrow>
            <Button variant="default">ホバー</Button>
          </Tooltip>
          <Tooltip.Group openDelay={300} closeDelay={100}>
            <Tooltip label="1 つ目">
              <Button variant="default" size="xs">
                A
              </Button>
            </Tooltip>
            <Tooltip label="2 つ目">
              <Button variant="default" size="xs">
                B
              </Button>
            </Tooltip>
          </Tooltip.Group>
        </Group>
      </Demo>

      <Demo name="Tooltip.Floating" description="カーソルに付いてくる">
        <Tooltip.Floating label="カーソルに付いてきます">
          <Box p="lg" bg="var(--mantine-color-default-hover)" className="rounded text-center">
            <Text size="sm">ここにカーソルを乗せる</Text>
          </Box>
        </Tooltip.Floating>
      </Demo>

      <Demo name="FloatingWindow" description="ドラッグで動かせる窓">
        <Button onClick={floatingWindow.toggle}>{windowOpened ? '窓を閉じる' : '窓を開く'}</Button>
        {windowOpened && (
          <FloatingWindow
            w={260}
            p="sm"
            shadow="lg"
            withBorder
            radius="md"
            dragHandleSelector=".drag-handle"
            initialPosition={{ top: 120, right: 40 }}
          >
            <Group justify="space-between" className="drag-handle cursor-move" mb="xs">
              <Group gap={4}>
                <IconGripHorizontal size={16} />
                <Text size="sm" fw={600}>
                  スコアメモ
                </Text>
              </Group>
              <CloseButton size="sm" onClick={floatingWindow.close} aria-label="閉じる" />
            </Group>
            <Text size="xs" c="dimmed">
              上の帯をドラッグすると移動できます。
            </Text>
          </FloatingWindow>
        )}
      </Demo>

      <Demo name="Overlay" description="半透明の覆い">
        <Box
          pos="relative"
          h={80}
          className="cursor-pointer overflow-hidden rounded"
          bg="blue.1"
          onClick={() => setOverlayVisible((v) => !v)}
        >
          <Text p="sm" size="sm">
            クリックで覆いを切り替え
          </Text>
          {overlayVisible && <Overlay color="#000" backgroundOpacity={0.5} blur={2} />}
        </Box>
      </Demo>

      <Demo name="Portal" description="body 直下に描画する">
        <Button variant="light" onClick={portal.toggle}>
          {portalOpened ? 'Portal を閉じる' : 'Portal で表示'}
        </Button>
        {portalOpened && (
          <Portal>
            <Box
              pos="fixed"
              top={80}
              left="50%"
              p="sm"
              bg="yellow.2"
              c="dark"
              className="z-[300] -translate-x-1/2 rounded shadow"
            >
              <Text size="sm">Portal で body 直下に描画しています</Text>
            </Box>
          </Portal>
        )}
      </Demo>
    </Section>
  );
}
