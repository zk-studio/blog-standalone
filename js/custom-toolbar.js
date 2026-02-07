// 动态插入繁简切换按钮到 #rightside
document.addEventListener('DOMContentLoaded', function () {
    // 查找 Butterfly 主题的右下角设置按钮容器
    // 通常是 #rightside-config-hide (隐藏部分) 或直接在 #rightside (如果显示)
    // 为了方便访问，我们通常把它放在 #rightside-config-show 上方或者 #rightside 内部的最上面

    var rightSide = document.getElementById('rightside');
    var configHide = document.getElementById('rightside-config-hide');
    var configShow = document.getElementById('rightside-config-show');

    if (rightSide) {
        var btn = document.createElement('button');
        btn.id = 'translateLink';
        btn.type = 'button';
        btn.title = '繁简切换';
        btn.innerHTML = '<span style="font-weight: bold;">繁</span>'; // 使用 span 避免 i 标签的图标样式冲突
        btn.onclick = function () {
            if (typeof translatePage === 'function') {
                translatePage();
            } else {
                console.error('translatePage function not found');
            }
        };

        // 逻辑：Butterfly 的 rightside 包含 两个 div: rightside-config-hide 和 rightside-config-show
        // 我们想让它一直显示，或者在点击设置后显示。
        // 用户截图显示是一竖排按钮。
        // 我们可以直接插入到 rightside 的最前面，这样就会显示在最上方（因为是 fixed bottom right，DOM 顺序靠前的在上面? 需要看 CSS flex-direction）
        // 通常 #rightside 是 display: flex; flex-direction: column;

        // 尝试插入到 rightside-config-show (齿轮/箭头) 的前面，或者作为一个独立的 button 直接放在 #rightside
        // 如果插入 device-config-show，可能需要点击齿轮才出来。
        // 如果想要一直显示，应该直接 append 到 rightside，或者在这两个容器之外。

        // 方案：创建一个新的 div 包裹它，或者直接插入。
        // 为了简单，我们插入到 config-show 的兄弟节点位置

        // 如果存在 hide 区域（包含深色模式等），我们插入到 hide 区域里
        if (configHide) {
            configHide.insertBefore(btn, configHide.firstChild);
        } else {
            // 如果没有 hide 区域，直接放到 rightside
            rightSide.appendChild(btn);
        }
    }
});
