/**
 * 博客卡片滚动动画脚本 (Enhanced Version)
 */

function initCardAnimation() {
  const observerOptions = {
    threshold: 0.01, // 只要露出一丁点就触发
    rootMargin: '0px 0px -10% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // 触发一次后就不管了，节省性能
      }
    });
  }, observerOptions);

  // 选中所有要动画的元素
  const items = document.querySelectorAll('.recent-post-item, .card-widget');
  items.forEach(item => observer.observe(item));

  // 强制触发首屏元素：防止 IntersectionObserver 在某些情况下反应慢
  setTimeout(() => {
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      // 如果元素在视口内，或者离视口顶部很近
      if (rect.top < window.innerHeight) {
        item.classList.add('show');
      }
    });
  }, 100);
}

// 页面加载完成后触发
document.addEventListener('DOMContentLoaded', initCardAnimation);

// 兼容 PJAX (Butterfly 主题默认开启了 PJAX)
document.addEventListener('pjax:complete', initCardAnimation);
