/**
 * 繁简转换模块 - 使用 OpenCC-js CDN
 * 按钮逻辑和转换功能
 */

var defaultEncoding = 2; // 1: Traditional, 2: Simplified
var translateDelay = 0;
var msgToTraditionalChinese = "繁";
var msgToSimplifiedChinese = "简";
var translateButtonId = "translateLink";

// OpenCC 转换器实例 (延迟初始化)
var s2tConverter = null;
var t2sConverter = null;
var openccLoaded = false;

// 动态加载 OpenCC-js
function loadOpenCC() {
    return new Promise((resolve, reject) => {
        if (openccLoaded) {
            resolve();
            return;
        }
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.min.js';
        script.onload = function () {
            openccLoaded = true;
            // 初始化转换器
            s2tConverter = OpenCC.Converter({ from: 'cn', to: 'tw' });
            t2sConverter = OpenCC.Converter({ from: 'tw', to: 'cn' });
            console.log('OpenCC loaded successfully');
            resolve();
        };
        script.onerror = function () {
            console.error('Failed to load OpenCC');
            reject(new Error('Failed to load OpenCC'));
        };
        document.head.appendChild(script);
    });
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

function getsec(str) {
    if (!str) return 24 * 60 * 60 * 1000 * 30; // default 30 days
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s")
        return str1 * 1000;
    else if (str2 == "h")
        return str1 * 60 * 60 * 1000;
    else if (str2 == "d")
        return str1 * 24 * 60 * 60 * 1000;
}

// 遍历文本节点进行转换
function translateTextNodes(element, converter) {
    var walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    var node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.trim()) {
            node.nodeValue = converter(node.nodeValue);
        }
    }
}

async function translatePage() {
    // 确保 OpenCC 已加载
    if (!openccLoaded) {
        try {
            await loadOpenCC();
        } catch (e) {
            alert('繁简转换库加载失败，请刷新重试');
            return;
        }
    }

    var currentEncoding = getCookie("zh_choose");
    if (currentEncoding == null) {
        currentEncoding = defaultEncoding;
    }

    var btn = document.getElementById(translateButtonId);
    var mainContent = document.querySelector('main') || document.body;

    if (currentEncoding == 1) {
        // Currently Traditional, switch to Simplified
        setCookie("zh_choose", 2, "d30");
        translateTextNodes(mainContent, t2sConverter);
        if (btn) {
            btn.innerHTML = '<span style="font-weight: bold;">' + msgToTraditionalChinese + '</span>';
            btn.title = "繁体中文";
        }
    } else {
        // Currently Simplified, switch to Traditional
        setCookie("zh_choose", 1, "d30");
        translateTextNodes(mainContent, s2tConverter);
        if (btn) {
            btn.innerHTML = '<span style="font-weight: bold;">' + msgToSimplifiedChinese + '</span>';
            btn.title = "简体中文";
        }
    }
}

// 页面加载时预加载 OpenCC
document.addEventListener('DOMContentLoaded', function () {
    // 延迟 2 秒加载，避免阻塞首屏渲染
    setTimeout(function () {
        loadOpenCC().catch(function () {
            console.warn('OpenCC preload failed, will retry on button click');
        });
    }, 2000);
});
