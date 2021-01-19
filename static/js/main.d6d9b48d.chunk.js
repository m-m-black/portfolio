(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{33:function(e,t,i){},34:function(e,t,i){"use strict";i.r(t);var c=i(0),s=i(1),n=i.n(s),a=i(20),r=i.n(a),l=i(7),h=i(8),o=i(10),j=i(9),d=i(14),b=i(12),u=function(e){Object(o.a)(i,e);var t=Object(j.a)(i);function i(e){var c;return Object(l.a)(this,i),(c=t.call(this,e)).state={burger:null,nav:null},c.navSlide=c.navSlide.bind(Object(d.a)(c)),c.homeSlide=c.homeSlide.bind(Object(d.a)(c)),c}return Object(h.a)(i,[{key:"componentDidMount",value:function(){this.setState({burger:document.querySelector(".burger"),nav:document.querySelector(".nav-links")})}},{key:"navSlide",value:function(){this.state.nav.classList.toggle("nav-active"),this.state.burger.classList.toggle("toggle")}},{key:"homeSlide",value:function(){this.state.nav.classList.contains("nav-active")&&this.navSlide()}},{key:"render",value:function(){return Object(c.jsxs)("nav",{children:[Object(c.jsx)(b.b,{to:"/",children:Object(c.jsx)("h3",{className:"nav-header",onClick:this.homeSlide,children:"Morgan Black"})}),Object(c.jsxs)("ul",{className:"nav-links",children:[Object(c.jsx)(b.b,{to:"/about",onClick:this.navSlide,children:Object(c.jsx)("li",{children:"About"})}),Object(c.jsx)(b.b,{to:"/",onClick:this.navSlide,children:Object(c.jsx)("li",{children:"Home"})}),Object(c.jsx)("a",{href:"https://github.com/m-m-black",target:"_black",rel:"noreferrer",onClick:this.navSlide,children:Object(c.jsx)("li",{children:"GitHub"})}),Object(c.jsx)("a",{href:"https://www.linkedin.com/in/morgan-black-132b145a/",target:"_black",rel:"noreferrer",onClick:this.navSlide,children:Object(c.jsx)("li",{children:"LinkedIn"})})]}),Object(c.jsxs)("div",{className:"burger",onClick:this.navSlide,children:[Object(c.jsx)("div",{className:"line1"}),Object(c.jsx)("div",{className:"line2"}),Object(c.jsx)("div",{className:"line3"})]})]})}}]),i}(n.a.Component),m=function(e){var t=e.url,i=e.title,s=e.description,n=e.image,a=e.alignment;return"left"===a?Object(c.jsxs)("div",{className:"sketch-preview",children:[Object(c.jsx)("div",{className:"sketch-img",children:Object(c.jsx)("a",{href:t,target:"_blank",rel:"noreferrer",children:Object(c.jsx)("img",{src:n,alt:"glitch",width:"300"})})}),Object(c.jsxs)("div",{className:"sketch-text left",children:[Object(c.jsx)("h3",{children:Object(c.jsx)("a",{href:t,target:"_blank",rel:"noreferrer",children:i})}),Object(c.jsx)("div",{className:"sketch-desc left",children:Object(c.jsx)("p",{children:s})})]})]}):"right"===a?Object(c.jsxs)("div",{className:"sketch-preview sketch-preview-right",children:[Object(c.jsxs)("div",{className:"sketch-text right",children:[Object(c.jsx)("h3",{children:Object(c.jsx)("a",{href:t,target:"_blank",rel:"noreferrer",children:i})}),Object(c.jsx)("div",{className:"sketch-desc right",children:Object(c.jsx)("p",{children:s})})]}),Object(c.jsx)("div",{className:"sketch-img",children:Object(c.jsx)("a",{href:t,target:"_blank",rel:"noreferrer",children:Object(c.jsx)("img",{src:n,alt:"glitch",width:"300"})})})]}):void 0},p=i.p+"static/media/circles.16ab0f8e.png",O=i.p+"static/media/shapes.c999aac4.png",g=i.p+"static/media/gridseq.f06fde13.png",v=function(e){Object(o.a)(i,e);var t=Object(j.a)(i);function i(){return Object(l.a)(this,i),t.apply(this,arguments)}return Object(h.a)(i,[{key:"render",value:function(){return Object(c.jsxs)("div",{className:"content",children:[Object(c.jsx)(m,{url:"https://m-m-black.github.io/circles/",title:"Circles",description:"Circles pulsate to create a musical meditation. The larger the circle, the slower the pulsation. Pitch is determined by the position of the circle. Inspired by the phase-based compositions of Steve Reich.",image:p,alignment:"left"}),Object(c.jsx)(m,{url:"https://m-m-black.github.io/shapes/",title:"Shapes",description:"Draw a shape to build a melody. Draw multiple shapes to create a forest of sound. Listen as the melodies interact, weaving through each other in surprising ways. Inspired by the music of Laurie Spiegel.",image:O,alignment:"right"}),Object(c.jsx)(m,{url:"https://m-m-black.github.io/gridseq/",title:"GridSeq",description:"A musical sequencer that operates in 2 dimensions. Rhythms propagate outwards (up, down, left, right) from active cells. Sounds are triggered from the intersections of these cells. Unpredictable rhythms may occur.",image:g,alignment:"left"})]})}}]),i}(n.a.Component),x=function(e){var t=e.text,i=e.alignment;return"left"===i?Object(c.jsx)("div",{className:"about-fragment",children:Object(c.jsx)("div",{className:"about-left",children:Object(c.jsx)("p",{children:t})})}):"right"===i?Object(c.jsx)("div",{className:"about-fragment",children:Object(c.jsx)("div",{className:"about-right",children:Object(c.jsx)("p",{children:t})})}):void 0},f=function(e){Object(o.a)(i,e);var t=Object(j.a)(i);function i(){return Object(l.a)(this,i),t.apply(this,arguments)}return Object(h.a)(i,[{key:"render",value:function(){return Object(c.jsxs)("div",{className:"content",children:[Object(c.jsx)(x,{text:"Hi, I\u2019m Morgan. I\u2019m a software developer and creative coder based in Melbourne, Australia.",alignment:"left"}),Object(c.jsx)(x,{text:"I built this site with React.js. The musical sketches featured were created with p5.js.",alignment:"right"}),Object(c.jsx)(x,{text:"My current interests and projects include algorithmic music composition, experimental musical instrument interface design, and web design/development.",alignment:"left"}),Object(c.jsx)(x,{text:"I\u2019m proficient in Java, JavaScript, HTML, CSS, React.js, p5.js, Processing, Haskell and TidalCycles.",alignment:"right"})]})}}]),i}(n.a.Component),k=i(2),S=function(e){Object(o.a)(i,e);var t=Object(j.a)(i);function i(){return Object(l.a)(this,i),t.apply(this,arguments)}return Object(h.a)(i,[{key:"render",value:function(){return Object(c.jsx)("div",{className:"app",children:Object(c.jsxs)(b.a,{basename:"/portfolio",children:[Object(c.jsx)(u,{}),Object(c.jsxs)(k.c,{children:[Object(c.jsx)(k.a,{path:"/",exact:!0,component:v}),Object(c.jsx)(k.a,{path:"/about",component:f})]})]})})}}]),i}(n.a.Component);i(32),i(33);r.a.render(Object(c.jsx)(S,{}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.d6d9b48d.chunk.js.map