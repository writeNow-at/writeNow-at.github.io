<template>
  <div class="posts-archive">
    <div v-for="group in grouped" :key="group.key" class="year-group">
      <h1 class="year">{{ group.label }}</h1>

      <div class="weeks">
        <div class="week" v-for="w in group.weeks" :key="w.weekNum">
          <div class="week-title">{{ w.weekNum }}주차</div>

          <a
            :href="withBase(article.regularPath)"
            v-for="(article, index) in w.items"
            :key="index"
            class="posts"
          >
            <div class="post-container">
              <div class="post-content">
                <span class="post-title">{{ article.frontMatter.title }}</span>
                <span class="post-author">{{ article.frontMatter.author }}</span>
              </div>
              <div class="post-tags" v-if="article.frontMatter.tags && article.frontMatter.tags.length">
                <span
                  v-for="(tag, tIndex) in article.frontMatter.tags"
                  :key="tIndex"
                  class="tag-label"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

// 날짜: "2025년 01기 03주차" → { year: 2025, quarter: 1, week: 3 }
function parseYQW(dateStr: string) {
  const m = dateStr.match(/(\d{4})년\s*(\d{1,2})기\s*(\d{1,2})주차/)
  if (!m) return null
  const [, y, q, w] = m
  return { year: Number(y), quarter: Number(q), week: Number(w) }
}

const { theme } = useData()

const grouped = computed(() => {
  const posts = theme.value.posts || []
  const map = new Map<string, { label: string; weeks: Map<number, any[]> }>()
  for (const p of posts) {
    const info = parseYQW(p.frontMatter.date)
    if (!info) continue
    const key = `${info.year}-${info.quarter}`
    if (!map.has(key)) {
      map.set(key, {
        label: `${info.year}년 ${info.quarter}기`,
        weeks: new Map<number, any[]>()
      })
    }
    const g = map.get(key)!
    if (!g.weeks.has(info.week)) g.weeks.set(info.week, [])
    g.weeks.get(info.week)!.push(p)
  }

  const groups = Array.from(map.entries())
    .sort((a, b) => {
      const [ay, aq] = a[0].split('-').map(Number)
      const [by, bq] = b[0].split('-').map(Number)
      if (by !== ay) return by - ay // 1. 연도(year) 내림차순 (최신순)
      return bq - aq                 // 2. 기수(quarter) 내림차순 (최신순)
    })
    .map(([key, val]) => {
      const weeks = Array.from(val.weeks.entries())
        // ▼▼▼ 이 부분이 수정되었습니다 ▼▼▼
        .sort((a, b) => b[0] - a[0]) // 3. 주차(week) 내림차순 (최신순)
        // ▲▲▲ (기존: a[0] - b[0]) ▲▲▲
        .map(([weekNum, items]) => ({
          weekNum,
          items
        }))
      return { key, label: val.label, weeks }
    })

  return groups
})
</script>

<style scoped>
.posts-archive {
  max-width: 48rem;
  margin: 0 auto;
  padding: 2rem 1.0rem;
}

.year-group {
  margin-bottom: 3rem;
}

.year {
  padding: 1.75rem 0 1rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  border-bottom: 2px solid var(--vp-c-brand-soft);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.weeks {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.week-title {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  position: relative;
}

.posts {
  display: block;
  text-decoration: none;
  padding: 0.75rem 1rem;
  margin: 0.75rem 0;
  border-radius: 8px;
  border: 1px solid;
  border-color: var(--vp-c-bg-soft);
  transition: all 0.25s ease;
  background-color: transparent;
}

.posts:hover {
  background-color: var(--vp-c-bg-soft);
  transform: translateX(4px);
}

.post-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.post-dot {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-2);
  opacity: 0.6;
}

.posts:hover .post-dot {
  background-color: var(--vp-c-brand-1);
  opacity: 1;
}

.post-content {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
}

.post-author {
  font-weight: 350;
  font-size: small;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.post-separator {
  color: var(--vp-c-text-3);
  font-weight: 300;
}

.post-title {
  color: var(--vp-c-text-1);
  font-weight: 450;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.posts:hover .post-title {
  color: var(--vp-c-brand-1);
}

.post-tags {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.tag-label {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border-radius: 4px;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.posts:hover .tag-label {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

/* 반응형 */
@media (max-width: 768px) {
  .posts-archive {
    padding: 1.5rem 1rem;
  }

  .year {
    font-size: 1.5rem;
    padding: 1.25rem 0 0.75rem 0;
  }

  .week {
    padding-left: 0.75rem;
  }

  .week-title::before {
    left: -1.125rem;
    width: 8px;
    height: 8px;
  }

  .post-container {
    flex-direction: column;   
    align-items: flex-start;
    gap: 0.5rem;           
  }

  .post-content {
    flex-direction: row;     
    align-items: center;  
    gap: 0.25rem;          
    flex-wrap: wrap;       
  }

  .post-separator {
    display: none;
  }

  .post-title {
    white-space: normal;
  }
}
</style>