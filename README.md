# Jeju Haenyeo · 제주 해녀 — 网站骨架 v0.1

一个纪录片式的滚动叙事网站。当前是 **Midway Review 版本**：结构、导航、字体排版、配色、滚动动画、声音系统都已经可以运行，图片、视频和声音暂时用占位素材。

---

## 1. 怎么打开

**推荐：用 WebStorm 打开**
1. WebStorm → File → Open → 选择 `chen_s4151128_ass3` 文件夹
2. 在左侧文件列表里右键 `index.html` → **Open In → Browser → Chrome**
3. WebStorm 会用它自带的本地服务器打开网页（地址类似 `localhost:63342/...`）

也可以直接双击 `index.html` 用 Chrome 打开，大部分功能都能运行。但用 WebStorm 打开最稳定。

**修改后刷新浏览器（Cmd + R）就能看到效果。**

---

## 2. 文件结构

```
chen_s4151128_ass3/
├── index.html          页面外壳，一般不用改
├── css/
│   ├── style.css       所有样式（版式、字号、颜色）
│   └── fonts.css       字体声明
├── js/
│   ├── content.js      ★ 你主要修改的文件：所有文字、素材、章节颜色、声音
│   ├── main.js         网页生成 + 滚动动画（一般不用改）
│   ├── sound.js        声音系统（一般不用改）
│   └── vendor/         GSAP、ScrollTrigger、Lenis、Howler（本地副本，离线可用）
├── fonts/              字体文件（Oswald、Cormorant Garamond、Jost、Noto Serif KR）
└── assets/
    ├── img/            图片
    ├── video/          视频
    └── audio/          声音
```

---

## 3. 最常做的修改（都在 `js/content.js` 里）

### 换素材
1. 把文件放进 `assets/img/`、`assets/video/` 或 `assets/audio/`
2. 在 `content.js` 里找到对应位置，把占位换成你的文件：

```js
// 图片：img(路径, 替代文字, 出处)
media: img('assets/img/bulteok.webp', 'Divers resting at the bulteok', 'P1')

// 视频：video(路径, 封面图, 替代文字, 出处)
media: video('assets/video/surface.mp4', 'assets/img/surface-poster.jpg', 'A diver surfaces', 'F1')   // F1 = reference code in REFERENCES
```

### 引用编号（参考文献）
每个素材的最后一个参数是引用编号，比如 `video('assets/video/x.mp4', 'assets/img/x.jpg', '说明', 'F2')`。
文字段落用 `ref: 'T1'`。所有来源写在 `content.js` 顶部的 `REFERENCES` 里。
网站上素材左下角（全屏画面在右下角）会显示编号，点击跳到参考文献；参考文献会自动按类型分组，并列出"用在哪一章"，点击可以跳回去。
编号规则：F 影片 · P 照片/插画 · S 声音 · T 文字/数据。

### 换声音
修改 `content.js` 顶部的 `SOUNDS`，把路径换成你的文件，文件名不变也可以直接覆盖同名文件：
- `waves` 海浪 · `underwater` 水下 · `warm` 人声/亲密的声音 · `music` 配乐 · `quiet` 接近安静 · `sumbisori` 呼吸哨声（一次性）

### 改文字
直接改引号里的内容。`<i>…</i>` 是斜体（标题里的强调词会自动变成强调色），`<br>` 是换行。

### 改章节颜色
每一章的 `theme`：`bg` 背景 · `fg` 文字 · `muted` 次要文字 · `accent` 强调色。
`tone: 'mono'` 会让这一章的所有图片变成黑白（第 05 章在用）。

### 调整版式顺序
每章的 `modules` 就是这一章从上到下的内容。移动 `{ type: … }` 的顺序即可调整。

---

## 4. 版式模块（小结构）

| 模块 | type | 用途 |
|---|---|---|
| G 章节开篇 | `opener` | 编号 + 标题 + 氛围画面（`kr` 留空时不显示韩文行） |
| A 电影画面 | `film` | 全屏视频/照片 + 一句话，可加 `cue: 'sumbisori'` 播放哨声 |
| 文字段落 | `text` | 标题 + 导语 + 正文 |
| B 杂志跨页 | `spread` | 图片 + 分栏文字，`side: 'left'/'right'` 决定图片在哪边 |
| 横向杂志页 | `horizontal` | 纵向滚动时画面横向移动（第 03 章） |
| C 横向照片带 | `strip` | 连续照片 + 说明（第 04 章） |
| D 人像 + 引语 | `portrait` | 一个人、一句话 |
| 全屏场景 | `scene` | 全屏视频/照片 + 左侧文字；`fit: 'contain'` 时画面不裁切（05-7） |
| 下潜 | `dive` | 02 章：一个固定画面，底下的视频依次切换，深度计、数据卡和下潜节奏条随滚动出现 |
| 斜切照片页 | `gallery` | 02-5：斜边页面升起，照片从右向左经过文字下方 |
| F 人数递减 | `decline` | 画面固定，滚动时 4,500 → 2,839，圆点逐渐消失（05-3） |

---

## 5. 素材规格建议

- **视频**：MP4（H.264），1280×720 或 1920×1080，5–15 秒循环片段，**去掉声音轨**，每个尽量 < 8 MB。
  可以用 HandBrake 或 ffmpeg 压缩：`ffmpeg -i in.mov -an -vcodec libx264 -crf 26 -preset slow -vf scale=1280:-2 out.mp4`
- **视频封面**：同一段视频的第一帧存成 JPG，放在 `assets/img/`
- **图片**：WebP 或 JPG，长边不超过 2400 px
- **声音**：MP3，环境声 20–60 秒循环，开头结尾做淡入淡出

---

## 6. 现在的状态

**已完成**
- Landing + 6 章 + Ending 的完整结构，内容来自 A2 研究（文案为初稿）
- 固定导航：章节进度、当前章节名、声音开关、顶部阅读进度条
- 每章色调随滚动渐变：深海 → 更深 → 沙色（Land）→ 明亮 → 黑白 → 色彩回归
- 全部 7 种版式模块和滚动动画
- 声音系统：每章自动切换环境声、交叉淡入淡出；`Enter with sound` 之后才会发声
- 手机版：横向段落自动变成纵向排列
- 结尾 "Return to the surface" 回到开头，形成循环
- 支持系统"减少动态效果"设置

**占位中（需要替换）**
- 所有图片、视频、声音（声音是合成的占位音，只用来演示切换效果）
- 第 06 章的新一代海女引语：`[Add a quote…]`
- Ending 的素材出处

**韩文字体**：为了文件小，只包含网站用到的韩文字。如果新增了韩文词，告诉 Claude 重新生成 `fonts/noto-serif-kr-subset.woff2`；在那之前新字会用系统字体显示。

---

## 7. 技术栈
GSAP 3.15 + ScrollTrigger · Lenis 1.3 · Howler.js 2.2 · 原生 HTML/CSS/JS，无需安装或编译。
Code and planning assisted by Claude (Anthropic).
