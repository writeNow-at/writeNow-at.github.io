<script setup>
import { onMounted, watch } from "vue";

// Props
const props = defineProps({
  theme: {
    type: String,
    default: "light",
  },
});

// Methods
const appendGiscus = () => {
  const container = document.querySelector("#comments-container");
  if (!container) return;

  // 기존 giscus 내용 제거
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";

  // 기본 설정
  script.setAttribute("data-repo", "writeNow-at/writeNow-at.github.io");
  script.setAttribute("data-repo-id", "R_kgDOPNfyqQ");

  script.setAttribute("data-category", "Comment");
  script.setAttribute("data-category-id", "DIC_kwDOPNfyqc4Cx0WX");

  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");

  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "top");

  // theme 매핑 (라이트/다크에 맞춰 giscus 테마 이름 변경)
  const themeName =
    props.theme === "dark" ? "noborder_dark" : "noborder_light";
  script.setAttribute("data-theme", themeName);

  script.setAttribute("data-lang", "ko");

  container.appendChild(script);
};

// LifeCycle
onMounted(() => {
  appendGiscus();
});

// Watch: theme 바뀔 때 giscus iframe에 postMessage로 테마만 변경
watch(
  () => props.theme,
  (newTheme) => {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;

    const themeName =
      newTheme === "dark" ? "noborder_dark" : "noborder_light";

    const message = {
      giscus: {
        setConfig: {
          theme: themeName,
        },
      },
    };

    iframe.contentWindow?.postMessage(message, "https://giscus.app");
  }
);
</script>

<template>
  <div id="comments-container" class="comments-container"></div>
</template>

<style scoped>
.comments-container {
  margin-top: 40px;
}
</style>