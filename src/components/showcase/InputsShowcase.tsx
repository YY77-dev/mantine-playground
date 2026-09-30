'use client';

import { useState } from 'react';
import {
  AngleSlider,
  Autocomplete,
  Cascader,
  Checkbox,
  Chip,
  ColorInput,
  ColorPicker,
  Combobox,
  Fieldset,
  FileInput,
  Group,
  Input,
  InputBase,
  JsonInput,
  MaskInput,
  MultiSelect,
  NativeSelect,
  NumberInput,
  PasswordInput,
  Pill,
  PillsInput,
  PinInput,
  Radio,
  RangeSlider,
  Rating,
  SegmentedControl,
  Select,
  Slider,
  Stack,
  Switch,
  TagsInput,
  Text,
  TextInput,
  Textarea,
  TreeSelect,
  useCombobox,
} from '@mantine/core';
import { IconAt, IconUpload } from '@tabler/icons-react';
import { Demo, Section } from './Section';

const games = ['カタン', 'カルカソンヌ', 'ドミニオン', 'アグリコラ', 'スプレンダー'];

const areaData = [
  {
    value: 'kanto',
    label: '関東',
    children: [
      {
        value: 'tokyo',
        label: '東京都',
        children: [
          { value: 'shibuya', label: '渋谷区' },
          { value: 'shinjuku', label: '新宿区' },
        ],
      },
      {
        value: 'kanagawa',
        label: '神奈川県',
        children: [{ value: 'yokohama', label: '横浜市' }],
      },
    ],
  },
  {
    value: 'kansai',
    label: '関西',
    children: [
      {
        value: 'osaka',
        label: '大阪府',
        children: [{ value: 'osaka-city', label: '大阪市' }],
      },
      {
        value: 'kyoto',
        label: '京都府',
        children: [{ value: 'kyoto-city', label: '京都市' }],
      },
    ],
  },
];

const genreTree = [
  {
    value: 'strategy',
    label: '戦略',
    children: [
      { value: 'euro', label: 'ユーロゲーム' },
      { value: 'war', label: 'ウォーゲーム' },
    ],
  },
  {
    value: 'party',
    label: 'パーティー',
    children: [
      { value: 'word', label: '言葉遊び' },
      { value: 'bluff', label: 'ブラフ' },
    ],
  },
];

/** Combobox を組み合わせて作る独自のセレクト */
function ComboboxDemo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          label="Combobox で作ったセレクト"
        >
          {value || <Input.Placeholder>ゲームを選ぶ</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {games.map((game) => (
            <Combobox.Option value={game} key={game}>
              {game}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

/** PillsInput と Pill でタグ入力を組み立てる */
function PillsInputDemo() {
  const [tags, setTags] = useState(['2人', '30分']);
  const [search, setSearch] = useState('');

  return (
    <PillsInput label="PillsInput（Enter で追加）">
      <Pill.Group>
        {tags.map((tag) => (
          <Pill
            key={tag}
            withRemoveButton
            onRemove={() => setTags((t) => t.filter((x) => x !== tag))}
          >
            {tag}
          </Pill>
        ))}
        <PillsInput.Field
          value={search}
          placeholder="タグ"
          onChange={(e) => setSearch(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && search.trim()) {
              e.preventDefault();
              setTags((t) => [...t, search.trim()]);
              setSearch('');
            }
          }}
        />
      </Pill.Group>
    </PillsInput>
  );
}

export function InputsShowcase() {
  const [color, setColor] = useState('#228be6');
  const [angle, setAngle] = useState(45);

  return (
    <Section
      id="inputs"
      title="入力フォーム"
      description="文字・数値・選択肢などを入力するコンポーネント"
    >
      <Demo name="TextInput" description="1 行のテキスト">
        <TextInput
          label="メールアドレス"
          placeholder="you@example.com"
          leftSection={<IconAt size={16} />}
        />
      </Demo>

      <Demo name="Textarea" description="複数行のテキスト">
        <Textarea label="感想" placeholder="自由に書いてください" autosize minRows={2} />
      </Demo>

      <Demo name="PasswordInput" description="表示切り替え付き">
        <PasswordInput label="パスワード" defaultValue="secret" />
      </Demo>

      <Demo name="NumberInput" description="数値">
        <NumberInput label="プレイ人数" min={1} max={8} defaultValue={4} />
      </Demo>

      <Demo name="MaskInput" description="書式が決まった入力">
        <MaskInput label="電話番号" mask="999-9999-9999" placeholder="090-1234-5678" />
      </Demo>

      <Demo name="PinInput" description="認証コードなど">
        <PinInput length={4} type="number" />
      </Demo>

      <Demo name="JsonInput" description="JSON の編集と整形">
        <JsonInput
          label="設定"
          defaultValue={'{"players": 4}'}
          formatOnBlur
          autosize
          minRows={2}
          validationError="JSON の形式が正しくありません"
        />
      </Demo>

      <Demo name="Select" description="1 つ選ぶ">
        <Select label="ゲーム" data={games} placeholder="選んでください" searchable clearable />
      </Demo>

      <Demo name="NativeSelect" description="ブラウザ標準のセレクト">
        <NativeSelect label="ゲーム" data={games} />
      </Demo>

      <Demo name="MultiSelect" description="複数選ぶ">
        <MultiSelect label="好きなゲーム" data={games} defaultValue={['カタン']} searchable />
      </Demo>

      <Demo name="Autocomplete" description="入力補完">
        <Autocomplete label="ゲーム名" data={games} placeholder="カ と入力してみる" />
      </Demo>

      <Demo name="TagsInput" description="自由入力のタグ">
        <TagsInput label="タグ" defaultValue={['協力型']} data={['協力型', '対戦型', '推理']} />
      </Demo>

      <Demo name="Cascader" description="階層をたどって選ぶ">
        <Cascader label="地域" data={areaData} placeholder="地域を選ぶ" />
      </Demo>

      <Demo name="TreeSelect" description="ツリーから選ぶ">
        <TreeSelect
          label="ジャンル"
          data={genreTree}
          mode="checkbox"
          placeholder="ジャンルを選ぶ"
        />
      </Demo>

      <Demo name="PillsInput / Pill" description="入力欄の中にタグを表示">
        <PillsInputDemo />
      </Demo>

      <Demo name="Combobox" description="セレクト系を自作する土台">
        <ComboboxDemo />
      </Demo>

      <Demo name="Checkbox" description="チェックボックス">
        <Checkbox.Group label="遊べる曜日" defaultValue={['sat']}>
          <Group mt="xs">
            <Checkbox value="fri" label="金" />
            <Checkbox value="sat" label="土" />
            <Checkbox value="sun" label="日" />
          </Group>
        </Checkbox.Group>
      </Demo>

      <Demo name="Checkbox.Card" description="カード型のチェックボックス">
        <Checkbox.Card radius="md" p="sm" defaultChecked>
          <Group wrap="nowrap" align="flex-start">
            <Checkbox.Indicator />
            <div>
              <Text fw={600} size="sm">
                拡張セットを含める
              </Text>
              <Text size="xs" c="dimmed">
                カード全体がクリックできます
              </Text>
            </div>
          </Group>
        </Checkbox.Card>
      </Demo>

      <Demo name="Radio" description="ラジオボタン">
        <Radio.Group label="難易度" defaultValue="normal">
          <Group mt="xs">
            <Radio value="easy" label="かんたん" />
            <Radio value="normal" label="ふつう" />
            <Radio value="hard" label="むずかしい" />
          </Group>
        </Radio.Group>
      </Demo>

      <Demo name="Radio.Card" description="カード型のラジオボタン">
        <Radio.Group defaultValue="short">
          <Stack gap="xs">
            {[
              { value: 'short', label: '短時間', note: '30 分以内' },
              { value: 'long', label: 'じっくり', note: '2 時間以上' },
            ].map((item) => (
              <Radio.Card key={item.value} value={item.value} radius="md" p="sm">
                <Group wrap="nowrap">
                  <Radio.Indicator />
                  <div>
                    <Text fw={600} size="sm">
                      {item.label}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {item.note}
                    </Text>
                  </div>
                </Group>
              </Radio.Card>
            ))}
          </Stack>
        </Radio.Group>
      </Demo>

      <Demo name="Switch" description="オン・オフ">
        <Switch.Group defaultValue={['sound']}>
          <Stack gap="xs">
            <Switch value="sound" label="効果音" />
            <Switch value="bgm" label="BGM" />
          </Stack>
        </Switch.Group>
      </Demo>

      <Demo name="Chip" description="チップ型の選択">
        <Chip.Group multiple defaultValue={['2']}>
          <Group gap="xs">
            <Chip value="2">2 人</Chip>
            <Chip value="3">3 人</Chip>
            <Chip value="4">4 人</Chip>
          </Group>
        </Chip.Group>
      </Demo>

      <Demo name="SegmentedControl" description="切り替えボタン">
        <SegmentedControl data={['一覧', 'カード', '表']} />
      </Demo>

      <Demo name="Slider / RangeSlider" description="スライダー">
        <Stack gap="xl" pb="md">
          <Slider
            defaultValue={40}
            marks={[
              { value: 20, label: '20' },
              { value: 50, label: '50' },
              { value: 80, label: '80' },
            ]}
          />
          <RangeSlider defaultValue={[20, 60]} />
        </Stack>
      </Demo>

      <Demo name="AngleSlider" description="角度を回して選ぶ">
        <Group>
          <AngleSlider value={angle} onChange={setAngle} formatLabel={(v) => `${v}°`} />
          <Text size="sm">{angle}°</Text>
        </Group>
      </Demo>

      <Demo name="Rating" description="星の評価">
        <Group>
          <Rating defaultValue={3} />
          <Rating defaultValue={2.5} fractions={2} readOnly />
        </Group>
      </Demo>

      <Demo name="ColorInput" description="色の入力">
        <ColorInput label="テーマカラー" value={color} onChange={setColor} />
      </Demo>

      <Demo name="ColorPicker" description="色の選択パネル">
        <ColorPicker
          value={color}
          onChange={setColor}
          swatches={['#fa5252', '#40c057', '#228be6', '#fab005']}
        />
      </Demo>

      <Demo name="FileInput" description="ファイルの選択欄">
        <FileInput
          label="添付ファイル"
          placeholder="ファイルを選ぶ"
          leftSection={<IconUpload size={16} />}
          clearable
        />
      </Demo>

      <Demo name="Fieldset" description="入力欄のまとまり">
        <Fieldset legend="プロフィール">
          <TextInput label="名前" size="xs" />
          <TextInput label="ニックネーム" size="xs" mt="xs" />
        </Fieldset>
      </Demo>

      <Demo name="Input" description="入力欄を自作するための部品">
        <Input.Wrapper
          label="Input.Wrapper"
          description="ラベル・説明・エラーを付ける"
          error="エラー表示の例"
        >
          <Input placeholder="Input 単体" />
        </Input.Wrapper>
      </Demo>
    </Section>
  );
}
