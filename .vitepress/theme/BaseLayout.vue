<script setup>
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import DefaultTheme from "vitepress/theme";
import GiscusComment from "@/.vitepress/theme/components/GiscusComment.vue";

const { Layout } = DefaultTheme;

const COMMENT_THEME_DARK = "photon-dark";
const COMMENT_THEME_LIGHT = "github-light";

// Composable
const { frontmatter, page, isDark } = useData();

// Computed
const commentTheme = computed(() => {
  return isDark.value ? COMMENT_THEME_DARK : COMMENT_THEME_LIGHT;
});
</script>

<template>
  <Layout>
    <template #doc-before>
      <div style="padding-top: 20px" class="post-info" v-if="!frontmatter.page">
        <span v-for="item in frontmatter.tags"
            ><a :href="withBase(`/posts/tags.html?tag=${item}`)"> {{ item }}</a></span
        >
      </div>
    </template>
    <template #doc-after>
      <GiscusComment
        v-if="frontmatter.comment"
        :key="page.relativePath"
        :theme="commentTheme"
      ></GiscusComment>
    </template>
  </Layout>
</template>