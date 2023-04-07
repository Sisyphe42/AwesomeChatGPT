//New chat 快捷键
// ==UserScript==
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.code === 'KeyY') {
        const element = document.querySelector('#__next > div.overflow-hidden.w-full.h-full.relative > div.dark.hidden.bg-gray-900.md\\:fixed.md\\:inset-y-0.md\\:flex.md\\:w-\\[260px\\].md\\:flex-col > div > div > nav > a.flex.py-3.px-3.items-center.gap-3.rounded-md.hover\\:bg-gray-500\\/10.transition-colors.duration-200.text-white.cursor-pointer.text-sm.mb-2.flex-shrink-0.border.border-white\\/20');
        if (element) {
            element.click();
        }
    }
});

//折叠左下侧边栏
// ==UserScript==
// 创建样式并添加到页面
const style = document.createElement('style');
style.innerHTML = `
  .collapsed {
    display: none;
  }
  .icon {
    font-size: 20px;
    color: white;
  }
`;
document.head.appendChild(style);

// 定义切换元素折叠状态的函数
function toggleElements() {
    const elements = document.querySelectorAll('.flex.py-3.px-3.items-center.gap-3.rounded-md.hover\\:bg-gray-500\\/10.transition-colors.duration-200.text-white.cursor-pointer.text-sm');
    let allCollapsed = true;

    elements.forEach(element => {
        element.classList.toggle('collapsed');
        if (!element.classList.contains('collapsed')) {
            allCollapsed = false;
        }
    });

    // 更新图标
    if (allCollapsed) {
        icon.className = 'fas fa-chevron-circle-down icon';
    } else {
        icon.className = 'fas fa-chevron-circle-up icon';
    }
}

// 添加 Font Awesome 图标库
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css';
document.head.appendChild(fontAwesomeLink);

// 创建图标元素并添加到页面
const iconContainer = document.createElement('div');
iconContainer.style.position = 'fixed';
iconContainer.style.left = '10px';
iconContainer.style.bottom = '10px';
iconContainer.style.cursor = 'pointer';

const icon = document.createElement('i');
icon.className = 'fas fa-chevron-circle-up icon';
icon.addEventListener('click', toggleElements);

iconContainer.appendChild(icon);
document.body.appendChild(iconContainer);

//浮动侧边栏（Not completed）
// ==UserScript==
// 创建样式并添加到页面
const style = document.createElement('style');
style.innerHTML = `
  .floating-panel {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%);
  }

  .floating-panel:hover,
  .floating-panel.fixed {
    transform: translateX(0%);
  }

  .floating-panel .toggle-float {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: white;
  }

  .floating-panel.fixed .relative.h-full.w-full.transition-width.flex.flex-col.overflow-hidden.items-stretch.flex-1 {
    max-width: 100%;
  }
`;
document.head.appendChild(style);

// 添加 Font Awesome 图标库
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css';
document.head.appendChild(fontAwesomeLink);

// 编写切换浮动面板的函数
function toggleFloatingPanel() {
    const panel = document.querySelector('.flex.h-full.min-h-0.flex-col');
    panel.classList.toggle('fixed');

    if (panel.classList.contains('fixed')) {
        toggleButton.className = 'fas fa-thumbtack toggle-float';
    } else {
        toggleButton.className = 'fas fa-thumbtack toggle-float fa-rotate-45';
    }
}

// 添加按钮并将其添加到浮动面板的右上角
const floatingPanel = document.querySelector('.flex.h-full.min-h-0.flex-col');
floatingPanel.classList.add('floating-panel');

const toggleButton = document.createElement('i');
toggleButton.className = 'fas fa-thumbtack toggle-float fa-rotate-45';
toggleButton.addEventListener('click', toggleFloatingPanel);

floatingPanel.appendChild(toggleButton);

// 设置鼠标靠近左边缘时显示浮动面板，鼠标离开时隐藏浮动面板
document.addEventListener('mousemove', (e) => {
    if (e.clientX < 50 && !floatingPanel.classList.contains('fixed')) {
        floatingPanel.style.transform = 'translateX(0%)';
    } else if (e.clientX > floatingPanel.offsetWidth && !floatingPanel.classList.contains('fixed')) {
        floatingPanel.style.transform = 'translateX(-100%)';
    }
});

//history平铺
// ==UserScript==
(function () {
  let interval;

//show more! show more! until show all!
  function clickButton() {
    const btn = document.querySelector('.btn.relative.btn-dark.btn-small.m-auto.mb-2');
    if (btn) {
      btn.click();
    } else {
      clearInterval(interval);
      flattenChildren();
    }
  }
//
  function flattenChildren() {
    const container = document.querySelector('.flex.flex-col.gap-2.text-gray-100.text-sm');
    if (container) {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.overflow = 'auto';
      overlay.style.zIndex = '9999';
      overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      overlay.style.display = 'flex';
      overlay.style.flexWrap = 'wrap';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';

      const children = Array.from(container.children);
      container.innerHTML = '';
      children.forEach(child => {
        child.classList.remove('flex', 'flex-col', 'gap-2', 'text-gray-100', 'text-sm');
        overlay.appendChild(child);
      });

      document.body.appendChild(overlay);
    }
  }

  interval = setInterval(clickButton, 1500);
})();