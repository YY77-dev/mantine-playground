'use client';

import { Button, Checkbox, Code, Group, NumberInput, Stack, Text, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useField, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Demo, Section } from './Section';

type EntryValues = {
  name: string;
  email: string;
  players: number;
  agree: boolean;
};

function UseFormDemo() {
  const form = useForm<EntryValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '', players: 4, agree: false },
    validate: {
      name: isNotEmpty('名前を入力してください'),
      email: isEmail('メールアドレスの形式が正しくありません'),
      players: (value) => (value < 2 ? '2 人以上にしてください' : null),
      agree: (value) => (value ? null : '同意が必要です'),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        notifications.show({
          title: '送信しました',
          message: `${values.name} さん（${values.players} 人）`,
          color: 'teal',
        });
      })}
    >
      <Stack gap="xs">
        <TextInput label="名前" key={form.key('name')} {...form.getInputProps('name')} />
        <TextInput
          label="メールアドレス"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <NumberInput label="人数" key={form.key('players')} {...form.getInputProps('players')} />
        <Checkbox
          label="利用規約に同意する"
          key={form.key('agree')}
          {...form.getInputProps('agree', { type: 'checkbox' })}
        />
        <Group>
          <Button type="submit">送信</Button>
          <Button variant="default" onClick={form.reset}>
            リセット
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

function UseFieldDemo() {
  const field = useField({
    initialValue: '',
    validateOnBlur: true,
    validate: (value) => (value.trim().length < 3 ? '3 文字以上で入力してください' : null),
  });

  return (
    <Stack gap="xs">
      <TextInput
        {...field.getInputProps()}
        label="ニックネーム"
        placeholder="入力してから欄の外をクリック"
      />
      <Text size="xs" c="dimmed">
        現在の値: <Code>{JSON.stringify(field.getValue())}</Code>
      </Text>
    </Stack>
  );
}

export function FormShowcase() {
  return (
    <Section
      id="form"
      title="フォーム管理（@mantine/form）"
      description="入力値とバリデーションをまとめて管理する"
    >
      <Demo name="useForm" description="フォーム全体の値とバリデーション" wide>
        <UseFormDemo />
      </Demo>
      <Demo name="useField" description="1 つの入力欄だけを管理">
        <UseFieldDemo />
      </Demo>
    </Section>
  );
}
