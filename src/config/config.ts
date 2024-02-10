export const OPEN_CHAT_CATEGORY: [string, number][] = [
  ['すべて', 0],
  ['ゲーム', 17],
  ['スポーツ', 16],
  ['芸能人・有名人', 26],
  ['同世代', 7],
  ['アニメ・漫画', 22],
  ['金融・ビジネス', 40],
  ['音楽', 33],
  ['地域・暮らし', 8],
  ['ファッション・美容', 20],
  ['イラスト', 41],
  ['研究・学習', 11],
  ['働き方・仕事', 5],
  ['学校・同窓会', 2],
  ['料理・グルメ', 12],
  ['健康', 23],
  ['団体', 6],
  ['妊活・子育て', 28],
  ['乗り物', 19],
  ['写真', 37],
  ['旅行', 18],
  ['動物・ペット', 27],
  ['TV・VOD', 24],
  ['本', 29],
  ['映画・舞台', 30],
]

export const OPEN_CHAT_CATEGORY_OBJ = ((obj) => {
  OPEN_CHAT_CATEGORY.map((el) => obj[el[1]] = el[0])
  return obj
})({} as { [K: string]: string })

export const rankingArgDto: RankingArgDto = JSON.parse(document.getElementById('arg-dto')!.textContent!)