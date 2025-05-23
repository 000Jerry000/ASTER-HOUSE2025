// Load 時に --vh を計算
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Wrap all jQuery code in a single document ready handler
jQuery(document).ready(function($) {
  // g-navの開閉
  $(".openbtn1").on("click", function () {
    $(this).toggleClass('active'); // ボタンにactiveクラスを付与
    $("#g-nav").toggleClass('panelactive'); // ナビゲーションにpanelactiveクラスを付与
    $("body").toggleClass("no-scroll"); // スクロールを無効化・解除

    if (!$("#g-nav").hasClass("panelactive")) {
        setTimeout(function () {
            $("#g-nav").css("visibility", "hidden");
        }, 500);
    } else {
        $("#g-nav").css("visibility", "visible");
    }
  });

  // もっと見るボタン
  const sellList = $('#sell-list li');
  const moreButton = $('#more-button');
  const initialVisibleCount = 8;
  const itemsPerLoad = 8;
  let currentVisibleCount = initialVisibleCount;

  // 初期表示で12件目までを表示
  sellList.slice(initialVisibleCount).addClass('is-hidden');

  // 13件以上ある場合のみ「もっと見る」ボタンを表示
  if (sellList.length <= initialVisibleCount) {
      moreButton.hide();
  }

  // 「もっと見る」ボタンのクリックイベント
  moreButton.on('click', function() {
      const nextVisibleCount = currentVisibleCount + itemsPerLoad;
      sellList.slice(currentVisibleCount, nextVisibleCount).removeClass('is-hidden');
      currentVisibleCount = nextVisibleCount;

      // 全て表示されたら「もっと見る」ボタンを非表示
      if (currentVisibleCount >= sellList.length) {
          moreButton.hide();
      }
  });
});

// ページ遷移時のオーバーレイの制御
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.overlay');

  // ── リンククリック時のオーバーレイ再生 ──
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // 外部リンクやアンカー、別タブは除外
    if (!href || href.startsWith('#') || link.target === '_blank' || link.origin !== location.origin) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      // コンテンツを隠してオーバーレイを再生
      document.body.classList.add('overlay-active');
      overlay.classList.add('play');
      // アニメーション完了後に遷移
      overlay.addEventListener('animationend', () => {
        window.location.href = link.href;
      }, { once: true });
    });
  });

  // ── オーバーレイ制御リセット関数 ──
  function resetOverlay() {
    document.body.classList.remove('overlay-active');
    overlay.classList.remove('play');
  }

  // ── bfcache 復元時／履歴操作時に必ずリセット ──
  window.addEventListener('pageshow', resetOverlay);
  window.addEventListener('popstate', resetOverlay);

  // ── bfcache 復元時のみ、ローディング表示もオフに ──
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      // ローディングクラス解除
      document.body.classList.remove('loading');
      // ローディング要素非表示
      const loadingWrap   = document.getElementById('loadingWrap');
      const loadingBorder = document.getElementById('loadingTopBorder');
      if (loadingWrap)   loadingWrap.classList.add('none');
      if (loadingBorder) loadingBorder.classList.add('on');
      // ヘッダー表示制御などの再実行用にスクロールイベントを再発火
      window.dispatchEvent(new Event('scroll'));
    }
  });
});



// footer info_3colの表示制御（要内容確認、反映されず）
document.addEventListener("DOMContentLoaded", () => {
    const info3col = document.querySelector(".info__3col");
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


// strengthスマホ用フリック制御（translateX方式）
// strengthスマホ用フリック制御（translateX方式）
(function() {
  // ————————————————————————————————
  // DOM 要素取得
  const slider        = document.getElementById('strengthSlider');
  if (!slider) return; 
  
  const container     = slider.parentElement;                // .strength-container
  const prevBtn       = container.querySelector('.arrow-left');
  const nextBtn       = container.querySelector('.arrow-right');
  const dotsContainer = document.getElementById('dots');
  const origSlides    = Array.from(slider.children);
  const count         = origSlides.length;

  // ————————————————————————————————
  // 状態変数
  let slideWidth;
  let index;
  let initialized = false;
  let startX = null;

  // ————————————————————————————————
  // ドット生成
  function updateDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === index - 1 ? ' active' : '');
      dot.addEventListener('click', () => moveTo(i + 1));
      dotsContainer.appendChild(dot);
    }
  }

  // ————————————————————————————————
  // LottieなどのfadeIn/fadeUp再起動
  function restartAnimations() {
    const slide = slider.children[index];
    slide.querySelectorAll('.fadeIn, .fadeUp').forEach(el => {
      el.classList.remove('fadeIn','fadeUp');
      void el.offsetWidth;
      el.classList.add('fadeIn','fadeUp');
    });
  }

  // ————————————————————————————————
  // スライド移動
  function moveTo(target) {
    slider.style.transition = 'transform 0.3s ease';
    slider.style.transform  = `translateX(${-slideWidth * target}px)`;
    index = target;
    updateDots();
    restartAnimations();
  }

  // ————————————————————————————————
  // 端到達で無限ループ跳ね返り
  function onTransitionEnd() {
    let jumped = false;
    if (index === 0) {
      slider.style.transition = 'none';
      index = count;
      jumped = true;
    } else if (index === count + 1) {
      slider.style.transition = 'none';
      index = 1;
      jumped = true;
    }
    if (jumped) {
      slider.style.transform = `translateX(${-slideWidth * index}px)`;
      updateDots();
      restartAnimations();
    }
  }

  // ————————————————————————————————
  // タッチでフリック
  function onTouchStart(e) { startX = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (startX === null) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextBtn.click() : prevBtn.click();
    startX = null;
  }

  // ————————————————————————————————
  // 矢印クリック
  function onPrev() { if (index > 0) moveTo(index - 1); }
  function onNext() { if (index < count + 1) moveTo(index + 1); }

  // ————————————————————————————————
  // スライダー（モバイル用）を初期化
  function initSlider() {
    if (initialized) return;
    if (window.innerWidth > 768) return;

    initialized = true;
    slideWidth  = container.clientWidth;
    index       = 1;

    const firstClone = origSlides[0].cloneNode(true);
    const lastClone  = origSlides[count - 1].cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slider.firstChild);

    slider.style.display    = 'flex';
    slider.style.width      = `${(count + 2) * slideWidth}px`;
    slider.style.transition = 'transform 0.3s ease';
    slider.style.transform  = `translateX(${-slideWidth}px)`;

    Array.from(slider.children).forEach(li => {
      li.style.flex      = '0 0 auto';
      li.style.width     = `${slideWidth}px`;
      li.style.boxSizing = 'border-box';
    });

    prevBtn.addEventListener('click', onPrev);
    nextBtn.addEventListener('click', onNext);
    slider.addEventListener('transitionend', onTransitionEnd);
    slider.addEventListener('touchstart', onTouchStart, { passive: true });
    slider.addEventListener('touchend',   onTouchEnd,   { passive: true });

    updateDots();
    restartAnimations();
  }

  // ————————————————————————————————
  // スライダーを破棄し、元のグリッドに戻す
  function destroySlider() {
    if (!initialized) return;
    initialized = false;

    // イベント解除
    prevBtn.removeEventListener('click', onPrev);
    nextBtn.removeEventListener('click', onNext);
    slider.removeEventListener('transitionend', onTransitionEnd);
    slider.removeEventListener('touchstart', onTouchStart);
    slider.removeEventListener('touchend',   onTouchEnd);

    // DOM をクリアしてから…元スライドを戻す
    slider.innerHTML = '';
    origSlides.forEach(slide => {
      // ← ここで各 LI のインライン style を消去
      slide.removeAttribute('style');
      slider.appendChild(slide);
    });

    // UL の inline style も削除
    slider.removeAttribute('style');
    // ドットもリセット
    dotsContainer.innerHTML = '';
  }

  // ————————————————————————————————
  // リサイズ／ロード時にモードを切り替え
  function checkMode() {
    if (window.innerWidth <= 768) {
      initSlider();
      if (initialized) {
        slideWidth = container.clientWidth;
        slider.style.transition = 'none';
        slider.style.width      = `${(count + 2) * slideWidth}px`;
        Array.from(slider.children).forEach(li => {
          li.style.width = `${slideWidth}px`;
        });
        slider.style.transform = `translateX(${-slideWidth * index}px)`;
      }
    } else {
      destroySlider();
    }
  }

  window.addEventListener('DOMContentLoaded', checkMode);
  window.addEventListener('resize',         checkMode);
})();


// tab-itemのフリック機能
document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth >= 768) return; // PCは無視

    const tabWrappers = document.querySelectorAll(".tabs__after, .tabs__interior, .tabs__drawing");

    tabWrappers.forEach(wrapper => {
        const inputs = wrapper.querySelectorAll("input[type=radio]");
        let currentIndex = [...inputs].findIndex(input => input.checked);

        let touchStartX = 0;
        let touchEndX = 0;

        wrapper.addEventListener("touchstart", function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        wrapper.addEventListener("touchend", function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        });

        function handleGesture() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // 左スワイプ → 次へ
                if (currentIndex < inputs.length - 1) {
                    currentIndex++;
                    inputs[currentIndex].checked = true;
                }
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // 右スワイプ → 前へ
                if (currentIndex > 0) {
                    currentIndex--;
                    inputs[currentIndex].checked = true;
                }
            }
        }

        // ラジオボタン切り替え時にindex更新
        inputs.forEach((input, i) => {
            input.addEventListener("change", () => {
                currentIndex = i;
            });
        });
    });
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


// companyページ　アコーディオン開閉処理
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-header').forEach(header => {
    const content = header.nextElementSibling;

    // 初期状態：閉じる
    header.classList.remove('active');
    content.style.maxHeight = '0px';
    content.style.overflow = 'hidden';

    header.addEventListener('click', e => {
      e.preventDefault();
      header.blur();

      const isOpen = header.classList.contains('active');
      if (isOpen) {
        // ── 閉じる ──
        header.classList.remove('active');
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
      } else {
        // ── 開く ──
        header.classList.add('active');
        content.style.overflow = 'visible';

        // 一度 max-height をリセットして reflow を発生させる
        content.style.maxHeight = '0px';

        // 次の tick で正しい scrollHeight を再セット
        setTimeout(() => {
          content.style.maxHeight = content.scrollHeight + 'px';
        }, 0);
      }
    });
  });
});

  // staff-card の Close ボタン処理はそのまま
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.staff-card').forEach(card => {
        card.classList.remove('open', 'shrink');
      });
    });
    
    // 閉じるボタンの処理
    document.querySelectorAll('.close-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // すべてのカードをリセット（クラスを削除）
            document.querySelectorAll('.staff-card').forEach(card => {
            card.classList.remove('open', 'half-height');
            });
        });
        });
    });
    


    document.addEventListener("DOMContentLoaded", function () {
      const staffCards = Array.from(document.querySelectorAll(".staff-card"));
      const modal      = document.getElementById("modal");
      const modalBody  = document.getElementById("modalBody");
      const modalClose = document.getElementById("modalClose");
    
      staffCards.forEach((card, index) => {
        const viewBtn  = card.querySelector(".view-btn");
        const closeBtn = card.querySelector(".close-btn");
        const detail   = card.querySelector(".card-detail");
    
        viewBtn.addEventListener("click", () => {
          // モバイル（≤767px）はモーダル表示
          if (window.innerWidth <= 767) {
            modal.style.display = "flex";
            modalBody.innerHTML = detail.innerHTML;
            return;
          }
    
          // ── 全カードリセット ──
          staffCards.forEach(c => {
            c.classList.remove("open", "shrink");
            c.style.gridRow    = "";
            c.style.gridColumn = "";
            c.querySelector(".card-detail").style.display = "none";
          });
    
          // ── デスクトップ(>1200px)：４カラムロジック ──
          if (window.innerWidth > 1200) {
            const colCount = 4;
            const colPos   = index % colCount;                          
            const baseRow  = Math.floor(index / colCount) * 2 + 1;      
            const startCol = colPos < colCount - 1 ? colPos + 1 : colCount - 1;
    
            // (1) 開いたカードを2行×2列で配置
            card.classList.add("open");
            detail.style.display = "block";
            card.style.gridRow    = `${baseRow} / span 2`;
            card.style.gridColumn = `${startCol} / span 2`;
    
            // (2) shrink対象インデックス
            const targetsIdx = ((index + 1) % colCount === 0)
              ? [ index - 2, index - 1 ]   // 4,8,… は「前の2枚」
              : [ index + 1, index + 2 ];  // それ以外は「次の2枚」
    
            // (3) shrink配置列と行を決定
            let shrinkCol, shrinkRows;
            if (colPos < 2) {
              // 1番目・2番目：右隣列（同ブロック rows1–2）
              shrinkCol    = startCol + 2;
              shrinkRows   = [ baseRow, baseRow + 1 ];
            } else if (colPos === 2) {
              // 3番目：左端列（下のブロック rows3–4）
              shrinkCol    = 1;
              shrinkRows   = [ baseRow + 2, baseRow + 3 ];
            } else {
              // 4番目：左隣列（同ブロック rows1–2）
              shrinkCol    = startCol - 1;
              shrinkRows   = [ baseRow, baseRow + 1 ];
            }
    
            // (4) 実際に shrink を配置
            targetsIdx.forEach((i, k) => {
              const x = staffCards[i];
              if (!x) return;
              x.classList.add("shrink");
              x.querySelector(".card-detail").style.display = "none";
              x.style.gridColumn = `${shrinkCol} / span 1`;
              x.style.gridRow    = `${shrinkRows[k]} / span 1`;
            });
    
          } else {
            // ── ３カラム以下の既存ロジック ──
            card.classList.add("open");
            detail.style.display = "block";
            const baseRow = Math.floor(index / 3) * 2 + 1;
            const colPos3 = index % 3;
            card.style.gridRow = `${baseRow} / span 2`;
    
            let targets = [];
            if (colPos3 === 0) {
              card.style.gridColumn = `1 / span 2`;
              targets = [
                { i: index + 1, row: baseRow,     col: 3 },
                { i: index + 2, row: baseRow + 1, col: 3 }
              ];
            }
            else if (colPos3 === 1) {
              // ↓ ここを「同ブロック内」から「下のブロック(rows3–4)」へ戻します
              card.style.gridColumn = `2 / span 2`;
              targets = [
                { i: index + 1, row: baseRow + 2, col: 1 },
                { i: index + 2, row: baseRow + 3, col: 1 }
              ];
            }
            else {
              card.style.gridColumn = `2 / span 2`;
              targets = [
                { i: index - 2, row: baseRow,     col: 1 },
                { i: index - 1, row: baseRow + 1, col: 1 }
              ];
            }
    
            targets.forEach(({ i, row, col }) => {
              const x = staffCards[i];
              if (!x) return;
              x.classList.add("shrink");
              x.querySelector(".card-detail").style.display = "none";
              x.style.gridColumn = `${col} / span 1`;
              x.style.gridRow    = `${row} / span 1`;
            });
          }
        });
    

        window.addEventListener('resize', () => {
          if (window.innerWidth > 767) {
            modal.style.display = "none";
            modalBody.innerHTML = "";
          }
          
          // ← ここに追加 ↓
          staffCards.forEach(c => {
            c.classList.remove('open', 'shrink');
            c.style.gridRow    = '';
            c.style.gridColumn = '';
            c.querySelector('.card-detail').style.display = 'none';
          });
        });

        // ── Close ボタン ──
        closeBtn.addEventListener("click", () => {
          if (window.innerWidth <= 767) {
            modal.style.display = "none";
            modalBody.innerHTML = "";
            return;
          }
          staffCards.forEach(c => {
            c.classList.remove("open", "shrink");
            c.style.gridRow    = "";
            c.style.gridColumn = "";
            c.querySelector(".card-detail").style.display = "none";
          });
        });
      });
    
      // モーダル背景クリック＆リサイズでリセット
      modalClose.addEventListener("click", () => {
        modal.style.display = "none";
        modalBody.innerHTML = "";
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth > 767) {
          modal.style.display = "none";
          modalBody.innerHTML = "";
        }
      });
      modal.addEventListener("click", e => {
        if (e.target === modal) {
          modal.style.display = "none";
          modalBody.innerHTML = "";
        }
      });
    });

    
    

// 会社概要ラインアニメーション
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".company-item");
    
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

// btn__moreラインアニメーション
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    });

    // すべての.btn__moreを監視
    const targets = document.querySelectorAll('.btn__more');
    targets.forEach(target => {
        observer.observe(target);
        target.addEventListener('mouseenter', () => {
            target.classList.remove('active'); // クラスを削除してリセット
            void target.offsetWidth; // リフロー強制
            target.classList.add('active'); // 再度クラスを追加してアニメーション発火
        });
    });
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



