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


// Load 時に --vh を計算
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// g-navの開閉
$(function(){
  // □ 開閉ボタン
  $(".openbtn1").on("click", function () {
    $(this).toggleClass('active');   
    $("#g-nav").toggleClass('panelactive'); 
    $("body").toggleClass("no-scroll"); 

    if (!$("#g-nav").hasClass("panelactive")) {
      // 閉じるときだけ、トランジション後にvisibility:hiddenに
      setTimeout(function () {
        $("#g-nav").css("visibility", "hidden");
      }, 0);
    } else {
      $("#g-nav").css("visibility", "visible");
    }
  });

  // □ ナビ内リンクをクリックしたら「開閉ボタン」を擬似クリック（＝閉じる処理）
  $("#g-navi-list a").on("click", function(){
    if ( $("#g-nav").hasClass("panelactive") ) {
      $(".openbtn1").removeClass('active');
      $("#g-nav").removeClass('panelactive');
      $("body").removeClass('no-scroll');
      setTimeout(function () {
        $("#g-nav").css("visibility", "hidden");
      }, 500);
    }
  });
});


// タグ 無限ループ処理
document.addEventListener("DOMContentLoaded", function () {
  const scrollLists = document.querySelectorAll('.scroll-list');

  scrollLists.forEach(list => {
    list.innerHTML += list.innerHTML; // 無限ループ風にするために複製
  });
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



// footer info_3colの表示制御（要内容確認、反映されず）
document.addEventListener("DOMContentLoaded", () => {
    const info3col = document.querySelector(".info_4col");
    if (!info3col) return;
  
    // トップページとみなすパスを列挙
    const topPaths = [
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
  
    if ( topPaths.includes(window.location.pathname) ) {
      // ── トップページの場合 ──
      // 初期は非表示にしてスクロールで制御
      info3col.classList.remove("visible");
      window.addEventListener("scroll", () => {
        if ((window.scrollY || window.pageYOffset) > 700) {
          info3col.classList.add("visible");
        } else {
          info3col.classList.remove("visible");
        }
      });
    } else {
      // ── その他のページの場合 ──
      // 読み込み時から表示
      info3col.classList.add("visible");
    }
  });



// strengthスマホ用フリック制御（translateX方式）

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('strengthSlider');
  if (!slider) return;

  const container     = slider.closest('.strength-container');
  const prevBtn       = container.querySelector('.arrow-left');
  const nextBtn       = container.querySelector('.arrow-right');
  const dotsContainer = document.getElementById('dots');
  const origSlides    = Array.from(slider.children);
  const count         = origSlides.length;

  let currentIndex = 1;
  let slideWidth;
  let isTransitioning = false;
  let startX = 0;

  // —————————————————————————
  // スライド前後にクローンを配置
  const firstClone = origSlides[0].cloneNode(true);
  const lastClone  = origSlides[count - 1].cloneNode(true);
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slider.firstChild);

  // —————————————————————————
  // 幅・位置をリセット
  function setSliderDimensions() {
    slideWidth = container.clientWidth;
    // 全体幅：(実スライド数 + 2) × 幅
    slider.style.width = `${(count + 2) * slideWidth}px`;
    // 各スライド幅を設定
    Array.from(slider.children).forEach(li => {
      li.style.width = `${slideWidth}px`;
      li.style.flex  = '0 0 auto';
    });
    // 初期位置にジャンプ（トランジションなし）
    jumpTo(currentIndex, false);
  }

  function jumpTo(index, useTransition = true) {
    slider.style.transition = useTransition ? 'transform 0.4s ease' : 'none';
    slider.style.transform  = `translateX(${-index * slideWidth}px)`;
  }

  // —————————————————————————
  // ドット生成・更新
  function updateDots() {
    dotsContainer.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  // —————————————————————————
  // 指定スライドへ移動
  function goTo(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;
    jumpTo(currentIndex);
    updateDots();
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // —————————————————————————
  // ループ処理
  slider.addEventListener('transitionend', () => {
    // 左端（クローン）なら本物の最後へ
    if (currentIndex === 0) {
      currentIndex = count;
      jumpTo(currentIndex, false);
    }
    // 右端（クローン）なら本物の１へ
    else if (currentIndex === count + 1) {
      currentIndex = 1;
      jumpTo(currentIndex, false);
    }
    isTransitioning = false;
    updateDots();
  });

  // —————————————————————————
  // タッチでフリック
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diffX = startX - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 50) {
      diffX > 0 ? nextBtn.click() : prevBtn.click();
    }
  }, { passive: true });

  // —————————————————————————
  // リサイズ対応
  window.addEventListener('resize', setSliderDimensions);

  // 初回セットアップ
  setSliderDimensions();
  updateDots();
});




// dlラインアニメーション
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".line-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animated");
        }
    });
    }, {
        threshold: 0.1
    });

    items.forEach(item => observer.observe(item));
});




// ページ読み込み時にアンカーリンクを確認（プライバシーポリシー）
window.addEventListener('DOMContentLoaded', (event) => {
    const hash = window.location.hash;
    if (hash === '#privacy') {
        const privacyAccordion = document.getElementById('privacy-accordion');
        if (privacyAccordion) {
            const content = privacyAccordion.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
});


// svgファイル 発火タイミング処理
document.addEventListener("DOMContentLoaded", () => {
    const svgObjects = document.querySelectorAll(
        ".imgbox__form__reserve object, .imgbox__consul02 object, .imgbox50__company object, .imgbox__sell__spec object"
    );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const obj = entry.target;

        // 再読み込みしてアニメーションをリセット
        const currentData = obj.getAttribute("data");
        obj.setAttribute("data", ""); // 一旦空に
        obj.setAttribute("data", currentData); // 再設定

        // 一度だけ発火したいなら unobserve
        observer.unobserve(obj);
      }
    });
  }, {
    threshold: 0.5 // 50%以上見えたら発火
  });

  svgObjects.forEach(obj => {
    observer.observe(obj);
  });
});


// Modelアイコンsvgファイル 発火タイミング処理
document.addEventListener('DOMContentLoaded', function() {
  const svg = document.getElementById('uuid-a904badd-9208-4ee5-ba00-d44478995fa0');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        svg.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0  // 100% 見えたら発火
  });

  observer.observe(svg);
});



// フェードアップ
$(function() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const $el = $(entry.target);
  
        if (entry.isIntersecting) {
          // 画面に入ったら常に .active を付与
          $el.addClass('active');
        } else if ($el.closest('.tabs__after, .tabs__interior, .tabs__drawing').length) {
          // 画面から出た & 指定のタブ内要素なら .active を外す
          $el.removeClass('active');
        }
        // それ以外のフェード要素は一度付いた .active は消さない
      });
    }, options);
  
    // ページ上のすべての .fadeUp 要素を監視
    $('.fadeUp').each((i, el) => observer.observe(el));
  });
  


// フェードイン エフェクト（再表示時）
$(function() {
    const options = {
        root: null,             // ビューポートを基準に監視
        rootMargin: '0px',      // マージン調整
        threshold: 0.3         // 30%見えたら発火
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const $el = $(entry.target);
    
          if (entry.isIntersecting) {
            // 画面に入ったら常に .active を付与
            $el.addClass('active');
          } else if ($el.closest('.tabs__after, .tabs__interior, .tabs__drawing').length) {
            // 画面から出た & 指定のタブ内要素なら .active を外す
            $el.removeClass('active');
          }
          // それ以外のフェード要素は一度付いた .active は消さない
        });
      }, options);
  
    $(document).ready(function() {
        $('.fadeIn, .fadeOut, .fadeUp, .fadeLeft, .fadeRight, .fadeIn5, .fadeIn10, .fadeIn15').each(function(index, element) {
            observer.observe(element);
        });
    });
});



// バウンス防止
  (function() {
    const scrollEl = document.scrollingElement || document.body;
    let startY = 0;
  
    scrollEl.addEventListener('touchstart', function(e) {
      startY = e.touches[0].screenY;
    }, { passive: true });
  
    scrollEl.addEventListener('touchmove', function(e) {
      const currentY = e.touches[0].screenY;
      const deltaY   = currentY - startY;
  
      // ── 上端バウンス抑制 ──
      if (scrollEl.scrollTop <= 0 && deltaY > 0) {
        e.preventDefault();
        return;
      }
  
      // ── 下端バウンス抑制 ──
      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
      if (scrollEl.scrollTop >= maxScroll && deltaY < 0) {
        e.preventDefault();
        return;
      }
    }, { passive: false });
  })();



  ;(function() {
    const el = document.scrollingElement || document.body;
    // ── 初回ロード時に 1px 下へ
    window.addEventListener('load', () => {
      if (el.scrollTop === 0) window.scrollTo(0, 1);
    });
  
    // ── スクロール時に上下端をクランプ
    window.addEventListener('scroll', () => {
      const max = el.scrollHeight - el.clientHeight;
      if (el.scrollTop <= 0) {
        // 上端
        window.scrollTo(0, 1);
      } else if (el.scrollTop >= max) {
        // 下端
        window.scrollTo(0, max - 1);
      }
    }, { passive: true });
  })();



