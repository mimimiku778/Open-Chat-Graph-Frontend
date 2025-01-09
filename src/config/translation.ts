import { langCode } from './config'

const translation = {
  オプチャグラフ: {
    tw: 'LINE社群圖表',
    th: 'โอเพนแชท กราฟ',
  },
  検索: {
    tw: '搜尋',
    th: 'ค้นหา',
  },
  閉じる: {
    tw: '關閉',
    th: 'ปิด',
  },
  オープンチャットを検索: {
    tw: '搜尋社群聊天室',
    th: 'ค้นหา โอเพนแชท',
  },
  '【最新】': {
    tw: '【最新】',
    th: '【ล่าสุด】',
  },
  '人数増加・1週間': {
    tw: '人數增長・1週',
    th: 'การเพิ่มจำนวนคน・1 สัปดาห์',
  },
  '人数増加・24時間': {
    tw: '人數增長・24小時',
    th: 'การเพิ่มจำนวนคน・24 ชั่วโมง',
  },
  '人数増加・1時間': {
    tw: '人數增長・1小時',
    th: 'การเพิ่มจำนวนคน・1 ชั่วโมง',
  },
  参加人数のランキング: {
    tw: '參加人數排行榜',
    th: 'อันดับจำนวนผู้เข้าร่วม',
  },
}

const sprintfTranslation = {
  '「%s」の検索結果': {
    ja: (s: string) => `「${s}」の検索結果`,
    tw: (s: string) => `「${s}」的搜尋結果`,
    th: (s: string) => `ผลการค้นหา "${s}"`,
  },
}

export const sprintfT = (key: string, ...string: string[]): ((string: string) => string) => {
  // @ts-ignore
  return sprintfTranslation[key]?.[langCode ? langCode : 'ja'](...string) ?? key
}

export const t = (string: string): string => {
  // @ts-ignore
  return translation[string]?.[langCode] ?? string
}
