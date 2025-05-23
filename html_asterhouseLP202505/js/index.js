(function (d) {
  var config = {
      kitId: "hun8zss",
      scriptTimeout: 3000,
      async: true,
    },
    h = d.documentElement,
    t = setTimeout(function () {
      h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
  h.className += " wf-loading";
  tk.src = "https://use.typekit.net/" + config.kitId + ".js";
  tk.async = true;
  tk.onload = tk.onreadystatechange = function () {
    a = this.readyState;
    if (f || (a && a != "complete" && a != "loaded")) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) {}
  };
  s.parentNode.insertBefore(tk, s);
})(document);

// ───────────────────────────────────────────────────────────
// ② FVアニメーション（ローディング／アニメーションを分離）
// ───────────────────────────────────────────────────────────
window.addEventListener("load", function () {
  const isMobile = window.innerWidth <= 767;
  console.log("isMobile", isMobile);
  // const loadingWrap      = document.getElementById('loadingWrap');
  // const loadingTopBorder = document.getElementById('loadingTopBorder');
  const topAnimeBgWrap = document.getElementById("topAnimeBgWrap");
  const topAnimeScroll = document.getElementById("topAnimeScroll");
  const headerTop = document.getElementById("headerTop");

  // ───────────────────────────────────────────────────────
  // 【追加】初回再生済みチェック → 以降はスキップ
  // ───────────────────────────────────────────────────────
  const hasPlayed = sessionStorage.getItem("fvPlayed") === "true";

  // 下層ページからトップへの遷移判定
  let skipAnimations = hasPlayed; // 初回再生済みなら最初からスキップ
  const referrer = document.referrer;
  if (referrer) {
    try {
      const refUrl = new URL(referrer, location.origin);
      // トップページ以外から戻ってきたらスキップ
      if (
        refUrl.origin === location.origin &&
        !/(?:\/$|index(?:\.html|\.php)?$|front-page\.php$)/.test(
          refUrl.pathname
        )
      ) {
        skipAnimations = true;
      }
    } catch (e) {}
  }

  if (skipAnimations) {
    // 静止画のみ表示
    // document.body.classList.remove('loading');
    // loadingTopBorder.classList.remove('on');
    // topAnimeBgWrap.classList.remove('on');
    // topAnimeScroll.style.display = 'none';
    // headerTop.classList.add('on');
    startAnimations();
    return;
  }
  // ───────────────────────────────────────────────────────

  // スクロール禁止ハンドラ
  function noScroll(e) {
    e.preventDefault();
  }
  // スクロール検知で 01/02(全) ＋ PCのみ 03
  function scrollHandler() {
    console.log("scrollHandler");
    // topAnimeBgWrap.classList.remove("scroll-01-02");
    // topAnimeBgWrap.classList.add("scroll");
    topAnimeBgWrap.classList.add("scroll-01-02");
    if (!isMobile) {
      // topAnimeBgWrap.classList.remove("scroll");
      topAnimeBgWrap.classList.add("scroll-01-02");
    }
    setTimeout(() => topAnimeScroll.classList.add("none"), 100);
    topAnimeScroll.addEventListener("scroll", scrollHandler);
  }
  // ローディング非表示→FVアニメ発火
  function startAnimations() {
    console.log("startAnimations");
    // document.body.classList.remove('loading');
    // loadingTopBorder.classList.add('on');
    topAnimeBgWrap.classList.add("on");
    topAnimeScroll.classList.remove("none");
    // topAnimeScroll.style.display = 'none';
    topAnimeScroll.addEventListener("scroll", scrollHandler);

    // ───────────────────────────────────────────────────────
    // 【追加】一度アニメを実行したらフラグを立てる
    // ───────────────────────────────────────────────────────
    sessionStorage.setItem("fvPlayed", "true");

    document.removeEventListener("touchmove", noScroll);
    document.removeEventListener("wheel", noScroll);
  }

  // 初回も再訪も常にこのシーケンス
  document.addEventListener("touchmove", noScroll, { passive: false });
  document.addEventListener("wheel", noScroll, { passive: false });
  const delay = isMobile ? 0 : 6500;
  setTimeout(startAnimations, delay);
});

// bfcache 復帰時のみ静止画表示に切り替え
window.addEventListener("pageshow", function (event) {
  if (!event.persisted) return;
  const loadingTopBorder = document.getElementById("loadingTopBorder");
  const topAnimeBgWrap = document.getElementById("topAnimeBgWrap");
  const topAnimeScroll = document.getElementById("topAnimeScroll");
  const headerTop = document.getElementById("headerTop");

  document.body.classList.remove("loading");
  loadingTopBorder.classList.remove("on");
  topAnimeBgWrap.classList.remove("on");
  // topAnimeScroll.style.display = 'none';
  headerTop.classList.add("on");
});

// スクロールアイコンの表示（ディレイ）
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelector(".scroll-icon").classList.add("show");
  }, 7300);
});

// タグ 無限ループ処理
document.addEventListener("DOMContentLoaded", function () {
  const scrollLists = document.querySelectorAll(".scroll-list");

  scrollLists.forEach((list) => {
    list.innerHTML += list.innerHTML; // 無限ループ風にするために複製
  });
});
