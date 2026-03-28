<template>
  <div class="post-stats">
    <div class="stats-grid">
      <!-- 전체 제출 수 -->
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-content">
          <div class="stat-value">{{ totalPosts }}편</div>
          <div class="stat-label">의 글이 발행되었어요</div>
        </div>
      </div>

      <!-- 작성자 수 -->
      <div class="stat-card">
        <div class="stat-icon">👤</div>
        <div class="stat-content">
          <div class="stat-value">{{ totalAuthors }}명</div>
          <div class="stat-label">이 참여중입니다</div>
        </div>
      </div>

      <!-- 기수별 제출 글 수 -->
      <div class="stat-card wide">
        <div class="stat-header">
          <div class="stat-icon">📊</div>
          <div class="stat-label">기수별 제출 글</div>
        </div>
        <div class="quarters-list">
          <div 
            v-for="(count, key) in quarterStats" 
            :key="key"
            class="quarter-item"
          >
            <div class="quarter-info">
              <span class="quarter-name">{{ key }}</span>
              <span class="quarter-count">{{ count }}편</span>
            </div>
            <a :href="getCurationLink(key)" class="curation-link">큐레이션 보러가기 →</a>
          </div>
          <div v-if="Object.keys(quarterStats).length === 0" class="empty-state">
            아직 제출된 글이 없습니다.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

type Post = {
  frontMatter: {
    author?: string
    date?: string
  }
}

const { theme } = useData()

// 날짜 파싱: "2025년 01기 03주차" → { year: 2025, quarter: 1, week: 3 }
function parseYQW(dateStr: string) {
  const m = dateStr?.match(/(\d{4})년\s*(\d{1,2})기\s*(\d{1,2})주차/)
  if (!m) return null
  const [, y, q] = m
  return { year: Number(y), quarter: Number(q) }
}

// 전체 제출 수
const totalPosts = computed(() => {
  const posts = theme.value.posts || []
  return posts.length
})

// 작성자 수
const totalAuthors = computed(() => {
  const posts = (theme.value.posts || []) as Post[]
  const authors = new Set<string>()
  for (const post of posts) {
    if (post.frontMatter.author) {
      authors.add(post.frontMatter.author)
    }
  }
  return authors.size
})

// 기수별 제출 글 수
const quarterStats = computed(() => {
  const posts = (theme.value.posts || []) as Post[]
  const map = new Map<string, number>()
  
  for (const post of posts) {
    const info = parseYQW(post.frontMatter.date || '')
    if (!info) continue
    const key = `${info.year}년 ${info.quarter}기`
    map.set(key, (map.get(key) || 0) + 1)
  }

  // 최신순 정렬
  const sorted = Array.from(map.entries()).sort((a, b) => {
    const matchA = a[0].match(/(\d{4})년\s*(\d{1,2})기/)
    const matchB = b[0].match(/(\d{4})년\s*(\d{1,2})기/)
    if (!matchA || !matchB) return 0
    const [, yearA, qA] = matchA
    const [, yearB, qB] = matchB
    if (yearB !== yearA) return Number(yearB) - Number(yearA)
    return Number(qB) - Number(qA)
  })

  return Object.fromEntries(sorted)
})

// 큐레이션 링크 생성
function getCurationLink(quarterKey: string): string {
  // "2025년 1기" → "1th"
  const match = quarterKey.match(/(\d{1,2})기/)
  if (!match) return '/blogs/curation/1th'
  const quarter = match[1]
  const suffix = quarter === '1' ? '1th' : quarter === '2' ? '2nd' : `${quarter}rd`
  return `/blogs/curation/${suffix}`
}
</script>

<style scoped>
.post-stats {
  margin: 2rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.stat-card.wide {
  grid-column: 1 / -1;
  flex-direction: column;
  align-items: stretch;
}

.stat-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.quarters-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quarter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.quarter-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.quarter-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.quarter-count {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.curation-link {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.curation-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.empty-state {
  grid-column: 1 / -1;
  padding: 1.5rem;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 1rem 1.25rem;
  }

  .stat-value {
    font-size: 1.75rem;
  }

  .quarter-item {
    padding: 0.6rem 0.75rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .curation-link {
    width: 100%;
    text-align: right;
  }
}
</style>
