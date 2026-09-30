'use client';

import { Button, Group, Text } from '@mantine/core';
import { notifications, useNotifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { Demo, Section } from './Section';

function showLoadingThenDone() {
  const id = notifications.show({
    loading: true,
    title: '保存しています',
    message: '少しお待ちください',
    autoClose: false,
    withCloseButton: false,
  });
  window.setTimeout(() => {
    notifications.update({
      id,
      color: 'teal',
      title: '保存しました',
      message: '2 秒後に消えます',
      icon: <IconCheck size={18} />,
      loading: false,
      autoClose: 2000,
    });
  }, 1500);
}

export function NotificationsShowcase() {
  const store = useNotifications();

  return (
    <Section
      id="notifications"
      title="トースト通知（@mantine/notifications）"
      description="画面の隅に一時的なお知らせを出す"
    >
      <Demo name="notifications.show" description="通知を出す">
        <Group gap="xs">
          <Button
            onClick={() =>
              notifications.show({
                title: 'こんにちは',
                message: 'これは通知です',
              })
            }
          >
            通常
          </Button>
          <Button
            color="red"
            onClick={() =>
              notifications.show({
                color: 'red',
                title: 'エラー',
                message: '保存に失敗しました',
              })
            }
          >
            エラー
          </Button>
          <Button
            variant="light"
            onClick={() =>
              notifications.show({
                position: 'top-center',
                title: '上に表示',
                message: 'position で場所を変えられます',
              })
            }
          >
            上に表示
          </Button>
        </Group>
      </Demo>

      <Demo name="notifications.update" description="表示中の通知を書き換える">
        <Button variant="light" onClick={showLoadingThenDone}>
          読み込み → 完了
        </Button>
      </Demo>

      <Demo name="notifications.clean / useNotifications" description="まとめて消す・件数を読む">
        <Group>
          <Button variant="default" onClick={() => notifications.clean()}>
            すべて消す
          </Button>
          <Text size="sm">表示中: {store.notifications.length} 件</Text>
        </Group>
      </Demo>
    </Section>
  );
}
