'use client';

import 'dayjs/locale/ja';

import { useState } from 'react';
import { Stack, Text } from '@mantine/core';
import {
  Calendar,
  DateInput,
  DatePicker,
  DatePickerInput,
  DatesProvider,
  DateTimePicker,
  InlineDateTimePicker,
  MiniCalendar,
  MonthPicker,
  MonthPickerInput,
  TimeGrid,
  TimeInput,
  TimePicker,
  TimeValue,
  YearPicker,
  YearPickerInput,
  type DatesRangeValue,
} from '@mantine/dates';
import { Demo, Section } from './Section';

export function DatesShowcase() {
  const [range, setRange] = useState<DatesRangeValue<string>>([null, null]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>('10:00');

  return (
    <DatesProvider settings={{ locale: 'ja', firstDayOfWeek: 0 }}>
      <Section
        id="dates"
        title="日付・時刻（@mantine/dates）"
        description="カレンダーや日付・時刻の入力"
      >
        <Demo name="DatePickerInput" description="日付の入力欄">
          <DatePickerInput
            label="開催日"
            placeholder="日付を選ぶ"
            clearable
            valueFormat="YYYY年M月D日"
          />
        </Demo>

        <Demo name="DateInput" description="キーボードで打てる日付入力">
          <DateInput label="誕生日" placeholder="2000/01/01" valueFormat="YYYY/MM/DD" />
        </Demo>

        <Demo name="DateTimePicker" description="日付と時刻">
          <DateTimePicker
            label="開始日時"
            placeholder="日時を選ぶ"
            valueFormat="YYYY/MM/DD HH:mm"
          />
        </Demo>

        <Demo name="MonthPickerInput" description="年月の入力欄">
          <MonthPickerInput label="対象月" placeholder="月を選ぶ" valueFormat="YYYY年M月" />
        </Demo>

        <Demo name="YearPickerInput" description="年の入力欄">
          <YearPickerInput label="発売年" placeholder="年を選ぶ" />
        </Demo>

        <Demo name="TimeInput" description="時刻の入力（ブラウザ標準）">
          <TimeInput label="集合時刻" />
        </Demo>

        <Demo name="TimePicker" description="時刻の入力（ドロップダウン付き）">
          <TimePicker label="終了時刻" withDropdown clearable />
        </Demo>

        <Demo name="TimeGrid" description="時間帯をボタンで選ぶ">
          <TimeGrid
            data={['10:00', '11:00', '13:00', '14:00', '15:00', '16:00']}
            value={time}
            onChange={setTime}
            simpleGridProps={{ cols: 3, spacing: 'xs' }}
            size="xs"
          />
        </Demo>

        <Demo name="TimeValue" description="時刻の表示用フォーマット">
          <Stack gap={2}>
            <Text size="sm">
              24 時間表記: <TimeValue value="18:45:00" />
            </Text>
            <Text size="sm">
              12 時間表記:{' '}
              <TimeValue value="18:45:00" format="12h" amPmLabels={{ am: '午前', pm: '午後' }} />
            </Text>
          </Stack>
        </Demo>

        <Demo name="DatePicker" description="インラインのカレンダーで範囲選択">
          <DatePicker type="range" value={range} onChange={setRange} />
        </Demo>

        <Demo name="Calendar" description="選択機能のない土台のカレンダー">
          <Calendar
            getDayProps={(date) => ({
              selected: date === selectedDay,
              onClick: () => setSelectedDay(date),
            })}
          />
        </Demo>

        <Demo name="MiniCalendar" description="横に数日並ぶ小さなカレンダー">
          <MiniCalendar numberOfDays={5} />
        </Demo>

        <Demo name="MonthPicker" description="月を選ぶパネル">
          <MonthPicker />
        </Demo>

        <Demo name="YearPicker" description="年を選ぶパネル">
          <YearPicker />
        </Demo>

        <Demo name="InlineDateTimePicker" description="その場に出る日時選択">
          <InlineDateTimePicker />
        </Demo>
      </Section>
    </DatesProvider>
  );
}
