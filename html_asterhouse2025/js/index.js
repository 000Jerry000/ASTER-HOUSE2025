(function(d) {
  var config = {
      kitId: 'hun8zss',
      scriptTimeout: 3000,
      async: true
    },
    h = d.documentElement,
    t = setTimeout(function() {
      h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
  h.className += " wf-loading";
  tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
  tk.async = true;
  tk.onload = tk.onreadystatechange = function() {
    a = this.readyState;
    if (f || a && a != "complete" && a != "loaded") return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config)
    } catch (e) {}
  };
  s.parentNode.insertBefore(tk, s)
})(document);




// ───────────────────────────────────────────────────────────
// ② FVアニメーション（ローディング／アニメーションを分離）
// ───────────────────────────────────────────────────────────
window.addEventListener('load', function() {
  const isMobile         = window.innerWidth <= 767;
  const loadingWrap      = document.getElementById('loadingWrap');
  const loadingTopBorder = document.getElementById('loadingTopBorder');
  const topAnimeBgWrap   = document.getElementById('topAnimeBgWrap');
  const topAnimeScroll   = document.getElementById('topAnimeScroll');
  const headerTop        = document.getElementById('headerTop');

  // ───────────────────────────────────────────────────────
  // 【追加】初回再生済みチェック → 以降はスキップ
  // ───────────────────────────────────────────────────────
  const hasPlayed = sessionStorage.getItem('fvPlayed') === 'true';

  // 下層ページからトップへの遷移判定
  let skipAnimations = hasPlayed;      // 初回再生済みなら最初からスキップ
  const referrer = document.referrer;
  if (referrer) {
    try {
      const refUrl = new URL(referrer, location.origin);
      // トップページ以外から戻ってきたらスキップ
      if (refUrl.origin === location.origin &&
          !/(?:\/$|index(?:\.html|\.php)?$|front-page\.php$)/.test(refUrl.pathname)) {
        skipAnimations = true;
      }
    } catch (e) {}
  }

  if (skipAnimations) {
    // 静止画のみ表示
    loadingWrap.classList.add('none');
    document.body.classList.remove('loading');
    loadingTopBorder.classList.remove('on');
    topAnimeBgWrap.classList.remove('on');
    topAnimeScroll.style.display = 'none';
    headerTop.classList.add('on');
    return;
  }
  // ───────────────────────────────────────────────────────

  // スクロール禁止ハンドラ
  function noScroll(e) { e.preventDefault(); }
  // スクロール検知で 01/02(全) ＋ PCのみ 03
  function scrollHandler() {
    topAnimeBgWrap.classList.add('scroll-01-02');
    if (!isMobile) topAnimeBgWrap.classList.add('scroll');
    setTimeout(() => topAnimeScroll.classList.add('none'), 100);
    topAnimeScroll.removeEventListener('scroll', scrollHandler);
  }
  // ローディング非表示→FVアニメ発火
  function startAnimations() {
    loadingWrap.classList.add('none');
    document.body.classList.remove('loading');
    loadingTopBorder.classList.add('on');
    topAnimeBgWrap.classList.add('on');
    topAnimeScroll.classList.remove('none');
    topAnimeScroll.addEventListener('scroll', scrollHandler);

    // ───────────────────────────────────────────────────────
    // 【追加】一度アニメを実行したらフラグを立てる
    // ───────────────────────────────────────────────────────
    sessionStorage.setItem('fvPlayed', 'true');

    document.removeEventListener('touchmove', noScroll);
    document.removeEventListener('wheel',    noScroll);
  }

  // 初回も再訪も常にこのシーケンス
  document.addEventListener('touchmove', noScroll, { passive: false });
  document.addEventListener('wheel',    noScroll, { passive: false });
  const delay = isMobile ? 0 : 6500;
  setTimeout(startAnimations, delay);
});

// bfcache 復帰時のみ静止画表示に切り替え
window.addEventListener('pageshow', function(event) {
  if (!event.persisted) return;
  const loadingWrap      = document.getElementById('loadingWrap');
  const loadingTopBorder = document.getElementById('loadingTopBorder');
  const topAnimeBgWrap   = document.getElementById('topAnimeBgWrap');
  const topAnimeScroll   = document.getElementById('topAnimeScroll');
  const headerTop        = document.getElementById('headerTop');

  loadingWrap.classList.add('none');
  document.body.classList.remove('loading');
  loadingTopBorder.classList.remove('on');
  topAnimeBgWrap.classList.remove('on');
  topAnimeScroll.style.display = 'none';
  headerTop.classList.add('on');
});


// トップ（index.php,front-page.php等）専用のheader__page表示制御
document.addEventListener("DOMContentLoaded", function () {
  const validPaths = [
      "/index.html",
      "/",
      "/index.php",
      "/front-page.php",
      "/asterhouse-test16/", // テストサーバーのルートパス
      "/asterhouse-test16/index.html", // テストサーバーのindex.html
      "/asterhouse-test16/index.php", // テストサーバーのindex.php
      "/asterhouse-test16/front-page.php", // テストサーバーのfront-page.php
      "/asterhouse2025/", // テストサーバーのルートパス
      "/asterhouse2025/index.html" // テストサーバーのindex.html
  ];

  if (!validPaths.includes(window.location.pathname)) return;

  const headerPage = document.querySelector(".header__page");
  if (!headerPage) return;

    // ── ここでトップページフラグを付与 ──
    headerPage.classList.add("is-top-page");

  if (window.innerWidth <= 767) {
    // モバイルなら最初から表示
    headerPage.style.display = "block";
    headerPage.classList.add("visible", "fade-down");

    // ロゴを非表示にする
    const logo = headerPage.querySelector(".logo");
    if (logo) logo.style.display = "none";

    return;
  }


  // PCのときだけ、従来どおり初期非表示＆スクロール判定
  headerPage.style.display = "none";

  window.addEventListener("scroll", function () {
    const scrollY     = window.scrollY || window.pageYOffset;
    const threshold   = 1000;  // PCは 1000px
    if (scrollY > threshold) {
      if (!headerPage.classList.contains("visible")) {
        headerPage.style.display = "block";
        headerPage.classList.add("visible", "fade-down");
      }
    } else {
      if (headerPage.classList.contains("visible")) {
        headerPage.classList.remove("visible", "fade-down");
        headerPage.style.display = "none";
      }
    }
  });
});

// pageshow ハックはそのまま
// window.addEventListener("pageshow", function () {
//   window.dispatchEvent(new Event("scroll"));
// });


// スクロールアイコンの表示（ディレイ）
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
      document.querySelector('.scroll-icon').classList.add('show');
  }, 7300);
});


// sell__card　スライド
document.addEventListener("DOMContentLoaded", () => {
  const slideTracks = document.querySelectorAll('.slide-track');

  slideTracks.forEach(track => {
    // コンテンツを複製して無限ループ化
    const html = track.innerHTML;
    track.innerHTML += html;

    // 状態管理
    let isSlideMode    = false;
    let isAnimating    = true;
    let currentTranslate = 0;
    let lastPointerX   = 0;
    let dragStartX     = 0;
    let isDragging     = false;
    let cancelClick    = false;
    let animationId    = null;
    let touchStartTime = 0;

    const dragThreshold     = 2;    // px：ドラッグ判定
    const longPressThreshold = 500; // ms：長押し判定
    const speed = window.matchMedia("(max-width: 767px)").matches ? 0.4 : 0.8;

    // ── 自動スクロール ──
    function updateAnimation() {
      if (!isSlideMode && isAnimating) {
        currentTranslate -= speed;
        track.style.transform = `translateX(${currentTranslate}px)`;
        const half = track.scrollWidth / 2;
        if (Math.abs(currentTranslate) >= half) {
          currentTranslate = 0;
        }
      }
      animationId = requestAnimationFrame(updateAnimation);
    }
    function startAnimation() {
      if (!animationId) {
        isAnimating = true;
        animationId = requestAnimationFrame(updateAnimation);
      }
    }
    function stopAnimation() {
      isAnimating = false;
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    // ── クリック遷移制御 ──
    function handleClick(e) {
      if (cancelClick) {
        e.preventDefault();
        cancelClick = false;
        return;
      }
      const link = e.target.closest('a');
      if (link) window.location.href = link.href;
    }

    // ── ドラッグ開始 ──
    function pointerDown(x) {
      stopAnimation();
      isSlideMode = true;
      isDragging  = false;
      dragStartX  = x;
      lastPointerX = x;
      track.style.cursor = 'grabbing';
    }

    // ── ドラッグ中 ──
    function pointerMove(x) {
      if (!isSlideMode) return;
      const delta = x - lastPointerX;
      if (Math.abs(x - dragStartX) > dragThreshold) {
        isDragging = true;
      }
      if (isDragging) {
        currentTranslate += delta;
        track.style.transform = `translateX(${currentTranslate}px)`;
        lastPointerX = x;
      }
    }

    // ── ドラッグ終了 ──
    function pointerUp() {
      isSlideMode = false;
      track.style.cursor = 'grab';
      if (isDragging) {
        cancelClick = true;  // ドラッグ後のクリックを無効化
      }
      isDragging = false;
      startAnimation();
    }

    // マウスオーバー時border薄くなるため整数移動で制御
    track.style.transform = `translateX(${Math.round(currentTranslate)}px)`;

    // ── マウスイベント登録 ──
    track.addEventListener('mousedown', e => {
      e.preventDefault();
      pointerDown(e.pageX);
    });
    track.addEventListener('mousemove', e => pointerMove(e.pageX));
    track.addEventListener('mouseup',  pointerUp);
    track.addEventListener('mouseleave', pointerUp);
    track.addEventListener('click', handleClick);

    // ── タッチイベント登録 ──
    track.addEventListener('touchstart', e => {
      e.preventDefault();               // ブラウザスクロールを抑制
      touchStartTime = Date.now();
      pointerDown(e.touches[0].pageX);
    }, { passive: false });
    
    // ── タッチ移動 & 終了 & キャンセル をグローバルで ──
    window.addEventListener('touchmove', e => {
      if (!isSlideMode) return;
      e.preventDefault();
      pointerMove(e.touches[0].pageX);
    }, { passive: false });
    
    window.addEventListener('touchend', e => {
      if (!isSlideMode) return;
      const dt = Date.now() - touchStartTime;
    
      if (isDragging) {
        // ② スワイプ
        pointerUp();
      } else if (dt < longPressThreshold) {
        // ① タップ
        pointerUp();
        // 手動でリンク遷移
        const touch = e.changedTouches[0];
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        const link = el?.closest('a');
        if (link) window.location.href = link.href;
      } else {
        // ③ 長押し：何もしない（オート再開のみ）
        cancelClick = true;
        pointerUp();
      }
    }, { passive: false });
    
    track.addEventListener('touchcancel', e => {
      pointerUp();
    }, { passive: false });
    
    // ── 初期化 ──
    track.style.transform = 'translateX(0px)';
    startAnimation();
  });
});


// タグ 無限ループ処理
document.addEventListener("DOMContentLoaded", function () {
  const scrollLists = document.querySelectorAll('.scroll-list');

  scrollLists.forEach(list => {
    list.innerHTML += list.innerHTML; // 無限ループ風にするために複製
  });
});


// top__conceptのスライドショー（フェード）
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".imgbox__concept .slide");
  let currentIndex = 0;

  function showNextSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }

  // 初期表示
  slides[currentIndex].classList.add("active");

  // 3秒ごとにスライド切り替え
  setInterval(showNextSlide, 3000);
});



// top__conceptのアニメーション発火タイミング
document.addEventListener("DOMContentLoaded", function () {
  const lottiePlayers = document.querySelectorAll("lottie-player");

  if (lottiePlayers.length > 0) {
      const observer = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                  const target = entry.target;

                  // すでに再生済みなら何もしない
                  if (target.dataset.played === "true") return;

                  if (entry.isIntersecting) {
                      target.play(); // アニメーションを再生
                      target.dataset.played = "true"; // フラグを立てる
                  }
              });
          },
          { threshold: 1.0 }
      );

      lottiePlayers.forEach((player) => observer.observe(player));
  }
});

// top__concept　シンボルのアニメーション発火タイミング
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  const target = document.querySelector(".ani_trigger");
  if (target) observer.observe(target);
});


// News画像切替
document.addEventListener('DOMContentLoaded', () => {
  const newsImage = document.getElementById('newsImage');
  let currentIndex = 0, intervalId = null;

  const isMobile = () => window.innerWidth <= 768;

  // 「display: none」で隠れていない <dd> だけを返す
  const getVisibleDds = () => {
    return Array.from(document.querySelectorAll('.news__textbox dd'))
      .filter(dd => {
        const style = window.getComputedStyle(dd);
        return style.display !== 'none';
      });
  };

  // 画像フェード切り替え
  const fadeToImage = (newImg) => {
    if (!newImg) return;
    // すでに同じ画像なら何もしない
    if (newsImage.src.endsWith(newImg)) return;

    newsImage.style.transition = 'opacity 0.3s';
    newsImage.style.opacity = '0';

    setTimeout(() => {
      newsImage.src = newImg;
      newsImage.onload = () => {
        newsImage.style.transition = 'opacity 0.5s';
        newsImage.style.opacity = '1';
      };
    }, 300);
  };

  // モバイル：自動スライド開始
  const startAutoSlide = () => {
    const dds       = getVisibleDds();
    const imageList = dds.map(dd => dd.dataset.img);
    if (imageList.length === 0) return;

    // 初期画像
    fadeToImage(imageList[0]);

    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % imageList.length;
      fadeToImage(imageList[currentIndex]);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  // 初期のフェードイン設定
  newsImage.style.transition = 'opacity 0.5s ease-in-out';
  newsImage.style.opacity    = '1';

  if (isMobile()) {
    startAutoSlide();
    window.addEventListener('resize', () => {
      stopAutoSlide();
      if (isMobile()) startAutoSlide();
    });
  } else {
    // PC：マウスオーバーで切り替え
    getVisibleDds().forEach(dd => {
      dd.addEventListener('mouseover', () => {
        fadeToImage(dd.dataset.img);
      });
    });
  }
});


