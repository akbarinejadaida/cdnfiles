!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).Service=t(e.React)}(this,(function(e){"use strict";var t=function(){return t=Object.assign||function(e){for(var t,o=1,n=arguments.length;o<n;o++)for(var r in t=arguments[o])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},t.apply(this,arguments)};return"function"==typeof SuppressedError&&SuppressedError,function(o){var n=o.manifest,r=function(e,t,o){if("link"===e){var n=document.createElement("link");n.rel="stylesheet",n.href=t,o&&(n.onload=o),document.head.appendChild(n)}else if("script"===e){var r=document.createElement("script");r.src=t,r.async=!0,o&&(r.onload=o),document.body.appendChild(r)}},i=function(){if(n){if(n.meta){var e=n.meta.component;r("script",e,(function(){var e=window.Meta;if(e){var o=document.getElementById("service-meta-root");o?window.ReactDOM.render(window.React.createElement(e,t({},n.meta)),o):console.error("Meta root not found")}else console.error("Meta component not loaded")}))}if(n.slider){var o=n.slider.baseStyle,i=n.slider.style,s=n.slider.component;r("link",o),r("link",i),r("script",s,(function(){var e=window.Swiper;if(e){var t=document.getElementById("service-slider-root");t?window.ReactDOM.render(window.React.createElement(e,{images:["https://swiperjs.com/demos/images/nature-1.jpg","https://swiperjs.com/demos/images/nature-2.jpg","https://swiperjs.com/demos/images/nature-3.jpg","https://swiperjs.com/demos/images/nature-4.jpg","https://swiperjs.com/demos/images/nature-5.jpg","https://swiperjs.com/demos/images/nature-6.jpg","https://swiperjs.com/demos/images/nature-7.jpg","https://swiperjs.com/demos/images/nature-8.jpg"]}),t):console.error("Slider root not found")}else console.error("Swiper component not loaded")}))}}};return e.useEffect((function(){var e=function(){if(window.ReactDOM)i();else{var e=document.createElement("script");e.src="https://unpkg.com/react-dom/umd/react-dom.production.min.js",e.onload=i,document.body.appendChild(e)}};n&&function(){if(window.React)e();else{var t=document.createElement("script");t.src="https://unpkg.com/react/umd/react.production.min.js",t.onload=e,document.body.appendChild(t)}}()}),[n]),React.createElement(React.Fragment,null,React.createElement("div",{id:"service-meta-root"}),React.createElement("div",{id:"service-slider-root"}))}}));
