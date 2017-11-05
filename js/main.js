// OPEN/CLOSE NAVIGATION
var closeBtn = document.querySelector(".close_nav");
var menuBtn = document.querySelector(".sandwich");
var nav = document.querySelector(".menu");
var body = document.body;
var html = document.documentElement;

menuBtn.onclick = showNav;
function showNav() {
    nav.classList.add("show_menu");
};

closeBtn.onclick = hideNav;
function hideNav() {
    nav.classList.remove("show_menu");
};

// SMOOTH SCROLLING INITIALIZE
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}


function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    nav.classList.remove("show_menu");
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 40);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}
// SCROLL-TO-TOP BUTTON SHOWING
var el = document.querySelector('.top_btn')
window.addEventListener("scroll", foo);

function foo() {
    var scrollToTop = window.pageYOffset;
    if (scrollToTop >= 100) {
        el.classList.add("show_btn");
    } else if (scrollToTop <= 100) {
        el.classList.remove("show_btn")
    }
}

// PROGRESS BAR STARTING (ONCE, MARKER !)
var marker = true;
(function onScroll() {
    window.addEventListener("scroll", callbackFunc);

    function callbackFunc() {
        var block = document.querySelector(".home_page__skills");
        var scrollToTop = window.pageYOffset;
        var blockPos = block.offsetTop;
        var el = document.querySelector(".top_btn");
        if (blockPos < scrollToTop + 700 && marker === true) {
            myMove();
            marker = false;
        } else {
            return false;
        }
    }
}());
// PROGRESS BAR MOVING
function myMove() {
    var width = 0;
    var elems = document.getElementsByClassName("move_bar");
    var timer = setInterval(frame = function() {
        for (var i = 0; i < elems.length; i++) {
            if (width >= 100) {
                clearInterval(timer)
            } else {
                width++;
                elems[i].style.width = width + "%";
            }
        }
    }, 10)
};
