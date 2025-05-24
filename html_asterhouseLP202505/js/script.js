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


document.addEventListener("DOMContentLoaded", () => {
  // 観測したいリンク要素を取得
  const links = document.querySelectorAll(".link_form a");

  // IntersectionObserver の設定
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 画面に入ったら .animated を付与
        entry.target.classList.add("animated");
        // 一度アニメーションしたらもう観測しなくて OK
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // 各リンクを監視
  links.forEach(link => observer.observe(link));
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



// footer info_4colの表示制御（要内容確認、反映されず）
document.addEventListener("DOMContentLoaded", () => {
  const info4col = document.querySelector(".info_4col");
  if (!info4col) return;

  const topPaths = [
    "/index.html",
    "/",
    "/index.php",
    "/front-page.php",
    "/lp-aster-test/",
    "/lp-aster-test/index.html",
  ];

  if ( topPaths.includes(window.location.pathname) ) {
    // トップページ：初期は非表示、スクロールで制御
    const updateVisibility = () => {
      // デバイス幅によって閾値を切り替え
      const threshold = window.innerWidth <= 600 ? 600 : 800;
      if (window.scrollY > threshold) {
        info4col.classList.add("visible");
      } else {
        info4col.classList.remove("visible");
      }
    };

    // 初回判定＆スクロール時に実行
    updateVisibility();
    window.addEventListener("scroll", updateVisibility);
    // リサイズ時にも閾値を再計算
    window.addEventListener("resize", updateVisibility);
  } else {
    // その他ページ：読み込み時から表示
    info4col.classList.add("visible");
  }
});



// strengthスマホ用フリック制御（translateX方式）
document.addEventListener('DOMContentLoaded', function() {
  const slider        = document.getElementById('strengthSlider');
  if (!slider) return;

  const container     = slider.closest('.strength-container');
  const prevBtn       = container.querySelector('.arrow-left');
  const nextBtn       = container.querySelector('.arrow-right');
  const dotsContainer = document.getElementById('dots');
  const origSlides    = Array.from(slider.children);
  const count         = origSlides.length;

  let currentIndex    = 1;
  let slideWidth;
  let isTransitioning = false;
  let startX          = 0;

  // — クローンを両端に追加 —
  const firstClone = origSlides[0].cloneNode(true);
  const lastClone  = origSlides[count - 1].cloneNode(true);
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slider.firstChild);

  // — スライダー幅・位置の初期化／リセット —
  function setSliderDimensions() {
    slideWidth = container.clientWidth;
    slider.style.width = `${(count + 2) * slideWidth}px`;

    slider.querySelectorAll('li').forEach(li => {
      li.style.width = `${slideWidth}px`;
      li.style.flex  = '0 0 auto';
    });

    // 無アニメで現在位置へ
    slider.style.transition = 'none';
    slider.style.transform  = `translateX(${-currentIndex * slideWidth}px)`;

    updateDots();
  }

  // — ドットの生成・更新 —
  function updateDots() {
    dotsContainer.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => {
        if (!isTransitioning) goTo(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  // — スライド移動 —
  function goTo(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;

    slider.style.transition = 'transform 0.4s ease';
    slider.style.transform  = `translateX(${-currentIndex * slideWidth}px)`;

    updateDots();
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // — ループ処理 —
  slider.addEventListener('transitionend', e => {
    if (e.propertyName !== 'transform') return;

    // まず必ずフラグ解除
    isTransitioning = false;

    // 左端クローン → 本物の最後へ
    if (currentIndex === 0) {
      slider.style.transition = 'none';
      currentIndex = count;
      slider.style.transform  = `translateX(${-currentIndex * slideWidth}px)`;
    }
    // 右端クローン → 本物の先頭へ
    else if (currentIndex === count + 1) {
      slider.style.transition = 'none';
      currentIndex = 1;
      slider.style.transform  = `translateX(${-currentIndex * slideWidth}px)`;
    }

    updateDots();
  });

  // — タッチでフリック対応 —
  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    const diffX = startX - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 50) {
      diffX > 0 ? nextBtn.click() : prevBtn.click();
    }
  }, { passive: true });

  // — リサイズ対応（アニメ中は再初期化しない） —
  window.addEventListener('resize', () => {
    if (!isTransitioning) {
      setSliderDimensions();
    }
  });

  // — 初回セットアップ —
  setSliderDimensions();
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


// 相談無料アイコンsvgファイル 発火タイミング処理
document.addEventListener('DOMContentLoaded', () => {
  const svg = document.querySelector('svg.consulfree');
  if (!svg) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        svg.classList.add('in-view');
        obs.unobserve(svg);
      }
    });
  }, {
    root: null,  
    threshold: 1.0        // 10% 見えたら発火
  });

  observer.observe(svg);
});


// info_4colと問合せフォームラジオボタンの連動
document.addEventListener("DOMContentLoaded", function () {
  // 資料請求
  var reqLink = document.getElementById("request-link");
  reqLink.addEventListener("click", function () {
    var radio = document.querySelector('input[name="inquiry"][value="general"]');
    if (radio) radio.checked = true;
  });

  // 相談会予約
  var consultLink = document.getElementById("consult-link");
  consultLink.addEventListener("click", function () {
    var radio = document.querySelector('input[name="inquiry"][value="consultation"]');
    if (radio) radio.checked = true;
  });
});


// 問合せ必須項目エラーメッセージ
document.addEventListener('DOMContentLoaded', function() {
  const form         = document.getElementById('mail_form');
  const confirmation = document.getElementById('confirmation');
  const resultArea   = document.getElementById('form-result');  

  // --- 既存バリデーション関数群 ---
  function clearErrors() {
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    resultArea.textContent = '';
  }

  function showError(el, msg) {
    const p = document.createElement('p');
    p.className = 'error-message';
    p.textContent = msg;
    el.insertAdjacentElement('afterend', p);
  }

  function validateFields() {
    clearErrors();
    let hasError = false;

    // テキスト系チェック
    form.querySelectorAll('input[required], textarea[required]').forEach(field => {
      if (!field.value.trim()) {
        hasError = true;
        showError(field, '項目を入力してください');
      }
    });

    // ラジオグループ
    const grp = form.querySelector('[data-required-group="inquiry"]');
    if (grp && grp.querySelectorAll('input[name="inquiry"]:checked').length === 0) {
      hasError = true;
      showError(grp, '項目を選択してください');
    }

    // エラー時スクロール
    if (hasError) {
      form.querySelector('.error-message')
          .scrollIntoView({ behavior:'smooth', block:'center' });
    }
    return hasError;
  }
  // --- /既存バリデーション関数群 ---

  // フォーム送信時：バリデーション→非同期送信→完了メッセージ
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // 入力ミスがあれば中断
    if (validateFields()) return;

    // ボタン二重押し防止
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;

    // フォームを送信
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
    })
    .then(res => {
      // 400 以上をエラー、それ未満（200～399）は成功とみなす
      if (res.status >= 400) {
        throw new Error('Server Error: ' + res.status);
      }
      return res.text();
    })
    .then(() => {
      // 成功時のメッセージ表示
      const p = document.createElement('p');
      p.className = 'success-message';
      p.textContent = '送信が完了しました。内容を確認の上、担当者よりご連絡させていただきます。2~3日返信が無い場合は、再度コンタクトフォームをご記入の上お問合せください。';
      resultArea.appendChild(p);
      form.reset();
    })
    .catch(err => {
      console.error(err);
      // 本当のネットワークエラーだけここに来る
      const errMsg = document.createElement('p');
      errMsg.className = 'error-message';
      errMsg.textContent = '送信中にエラーが発生しました。再度お試しください。';
      resultArea.appendChild(errMsg);
    })
    .finally(() => {
      form.querySelector('button[type="submit"]').disabled = false;
    });
  });

  // チェックボックスクリック時も同じバリデーション
  confirmation.addEventListener('click', function(e) {
    if (validateFields()) e.preventDefault();
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



