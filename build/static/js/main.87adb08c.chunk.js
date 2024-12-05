(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{64:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a(1),s=a.n(n),r=a(33),i=a.n(r),l=a(7),o=a(4),d=Object(n.createContext)(),j=function(){var e=Object(n.useContext)(d),t=e.isAuthenticated,a=e.logout,s=e.user,r=Object(c.jsxs)(n.Fragment,{children:[Object(c.jsxs)("li",{children:["Hello, ",s&&s.name,"!"]}),Object(c.jsx)("li",{onClick:function(){a()},children:Object(c.jsx)(l.b,{to:"/signin",children:"Sign Out"})})]}),i=Object(c.jsxs)(n.Fragment,{children:[Object(c.jsx)("li",{children:Object(c.jsx)(l.b,{to:"/register",children:"Register"})}),Object(c.jsx)("li",{children:Object(c.jsx)(l.b,{to:"/signin",children:"Sign In"})})]});return Object(c.jsx)("nav",{children:Object(c.jsxs)("div",{className:"nav-wrapper",children:[Object(c.jsxs)("a",{href:"/",className:"brand-logo",children:[Object(c.jsx)("i",{className:"material-icons",children:"memory"}),"Memory"]}),Object(c.jsx)("ul",{id:"nav-mobile",className:"right",children:t?r:i})]})})},u=a(3),b=Object(n.createContext)(),O=function(){var e=Object(n.useContext)(b),t=Object(n.useContext)(d),a=e.games,s=e.updateCurrentLevel,r=e.updateCurrentTheme,i=e.getGames,o=Object(n.useState)(""),j=Object(u.a)(o,2),O=j[0],m=j[1];Object(n.useEffect)((function(){t.loadUser(),i()}),[]),Object(n.useEffect)((function(){window.M.AutoInit()}));var h=function(e){var t=e[0].filter((function(t){return t.gameLevel===e[1]})).map((function(e){return e.numOfMoves}));return t.length>0?Math.floor(t.reduce((function(e,t){return e+t}))/t.length):"No games yet played"},p=function(e){s(e.target.name)},x=function(e){r(e.target.name),m(e.target.name)};return!t.loading&&Object(c.jsx)("div",{className:"row container",children:Object(c.jsx)("div",{className:"col s12",children:Object(c.jsxs)("div",{className:"card blue-grey darken-1 large",children:[Object(c.jsxs)("div",{className:"card-content white-text",children:[Object(c.jsxs)("span",{className:"center card-title",children:["You have played ",a.length," ",1===a.length?"game":"games"," so far!"]}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),Object(c.jsx)("span",{className:"center card-title",children:"Your Average Number of Moves:"}),Object(c.jsx)("br",{}),Object(c.jsxs)("div",{className:"row col s12",children:[Object(c.jsx)("div",{className:"col s4 center",children:Object(c.jsx)("u",{children:"Beginner"})}),Object(c.jsx)("div",{className:"col s4 center",children:Object(c.jsx)("u",{children:"Intermediate"})}),Object(c.jsx)("div",{className:"col s4 center",children:Object(c.jsx)("u",{children:"Expert"})})]}),Object(c.jsxs)("div",{className:"row col s12",children:[Object(c.jsx)("div",{className:"col s4 center",children:Object(c.jsx)("p",{children:h([a,"beginner"])})}),Object(c.jsx)("div",{className:"col s4 center",children:Object(c.jsx)("p",{children:h([a,"intermediate"])})}),Object(c.jsx)("div",{className:"col s4 center",children:Object(c.jsx)("p",{children:h([a,"expert"])})})]}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),Object(c.jsx)("span",{className:"center card-title",children:"Start A New Game Below!"})]}),Object(c.jsxs)("div",{className:"center-align",children:[Object(c.jsx)("a",{className:"dropdown-trigger btn blue-grey darken-1",href:"#","data-target":"dropdown1",children:O.length>0?O:"Choose A Theme!"}),Object(c.jsxs)("ul",{id:"dropdown1",className:"dropdown-content",children:[Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:"#",onClick:x,name:"robots",className:"blue-grey-text text-darken-1",children:"Robots"})}),Object(c.jsx)("li",{className:"divider",tabIndex:"-1"}),Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:"#",onClick:x,name:"cats",className:"blue-grey-text text-darken-1",children:"Cats"})}),Object(c.jsx)("li",{className:"divider",tabIndex:"-1"}),Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:"#",onClick:x,name:"monsters",className:"blue-grey-text text-darken-1",children:"Monsters"})})]})]}),Object(c.jsxs)("div",{className:"col s12 card-action",children:[Object(c.jsx)("div",{className:"col s4 center",children:Object(c.jsx)(l.b,{to:"/game",className:"waves-effect waves-red btn-flat",name:"beginner",onClick:p,children:"Beginner"})}),Object(c.jsx)("div",{className:"col s4 center",children:Object(c.jsx)(l.b,{to:"/game",className:"waves-effect waves-red btn-flat",name:"intermediate",onClick:p,children:"Intermediate"})}),Object(c.jsx)("div",{className:"col s4 center",children:Object(c.jsx)(l.b,{to:"/game",className:"waves-effect waves-red btn-flat",name:"expert",onClick:p,children:"Expert"})})]})]})})})},m=a(16),h=a(2),p=function(e){var t=Object(n.useContext)(d),a=t.login,s=t.error,r=t.clearErrors,i=t.isAuthenticated,l=Object(n.useState)({email:"",password:""}),o=Object(u.a)(l,2),j=o[0],b=o[1],O=j.email,p=j.password;Object(n.useEffect)((function(){i&&e.history.push("/"),"invalid credentials"===s&&(alert(s),r())}),[s,i,e.history]);var x=function(e){b(Object(h.a)(Object(h.a)({},j),{},Object(m.a)({},e.target.id,e.target.value)))};return Object(c.jsx)("div",{className:"container form-container",children:Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)("form",{className:"col s6",autoComplete:"off",onSubmit:function(e){e.preventDefault(),a({email:O,password:p})},children:[Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)("div",{className:"input-field col s9 offset-s8",children:[Object(c.jsx)("input",{id:"email",type:"text",className:"validate",onChange:x,required:!0}),Object(c.jsx)("label",{htmlFor:"email",children:"Email"})]})}),Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)("div",{className:"input-field col s9 offset-s8",children:[Object(c.jsx)("input",{id:"password",type:"password",className:"validate",onChange:x,required:!0}),Object(c.jsx)("label",{htmlFor:"password",children:"Password"})]})}),Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)("button",{className:"btn waves-effect waves-light red lighten-2 col s5 offset-s10",type:"submit",name:"action",children:["Sign In",Object(c.jsx)("i",{className:"material-icons right",children:"send"})]})})]})})})},x=function(e){var t=Object(n.useContext)(d),a=t.register,s=t.error,r=t.clearErrors,i=t.isAuthenticated,l=Object(n.useState)({name:"",email:"",password:""}),o=Object(u.a)(l,2),j=o[0],b=o[1],O=j.name,p=j.email,x=j.password;Object(n.useEffect)((function(){i&&e.history.push("/"),"Email already exists"===s&&(alert(s),r())}),[s,i,e.history]);var f=function(e){b(Object(h.a)(Object(h.a)({},j),{},Object(m.a)({},e.target.id,e.target.value)))};return Object(c.jsx)("div",{className:"container form-container",children:Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)("form",{className:"col s6",onSubmit:function(e){e.preventDefault(),a({name:O,email:p,password:x})},children:[Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)("div",{className:"input-field col s9 offset-s8",children:[Object(c.jsx)("input",{id:"name",type:"text",className:"validate",onChange:f,required:!0}),Object(c.jsx)("label",{htmlFor:"user-name",children:"Username"})]})}),Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)("div",{className:"input-field col s9 offset-s8",children:[Object(c.jsx)("input",{id:"email",type:"email",className:"validate",onChange:f,required:!0}),Object(c.jsx)("label",{htmlFor:"email",children:"Email"})]})}),Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)("div",{className:"input-field col s9 offset-s8",children:[Object(c.jsx)("input",{id:"password",type:"password",className:"validate",onChange:f,required:!0}),Object(c.jsx)("label",{htmlFor:"password",children:"Password"})]})}),Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)("button",{className:"btn waves-effect waves-light red lighten-2 col s5 offset-s10",type:"submit",name:"action",children:["Register",Object(c.jsx)("i",{className:"material-icons right",children:"send"})]})})]})})})},f=a(13),v=function(e){var t=e.id,a=e.imageId,s=e.shownCards,r=e.cardClicked,i=e.source,l=Object(n.useState)(!1),o=Object(u.a)(l,2),d=o[0],j=o[1];Object(n.useEffect)((function(){var e=s.includes(t);j(e)}),[s]);return Object(c.jsx)("div",{id:t,imgid:a,className:"mem-card",style:{backgroundColor:d?"#D3D3D3":null,pointerEvents:d?"none":"auto"},onClick:function(e){r(e.target)},children:Object(c.jsx)("img",{id:t,imgid:a,alt:"card-figure",src:"https://robohash.org/".concat(a)+i,style:{visibility:d?"visible":"hidden"}})})},g=function(e){var t=e.updateActive,a=e.updateNumOfMoves,s=e.currentLevel,r=e.currentTheme,i=e.updateNewGame,l=Object(n.useState)([]),o=Object(u.a)(l,2),d=o[0],j=o[1],b=Object(n.useState)([]),O=Object(u.a)(b,2),m=O[0],h=O[1],p=Object(n.useState)([]),x=Object(u.a)(p,2),g=x[0],N=x[1],w=Object(n.useState)(!1),y=Object(u.a)(w,2),k=y[0],C=y[1],E=Object(n.useState)(1),S=Object(u.a)(E,2),A=S[0],R=S[1];Object(n.useEffect)((function(){var e;switch(s){case"beginner":e=12;break;case"intermediate":e=20;break;case"expert":e=30;break;default:e=12}for(var t=[],a=1;a<=e;a++){var c=void 0;c=a<=e/2?a:a-e/2,t.push({id:c})}t.sort((function(e,t){return.5-Math.random()})),j(t)}),[]);var T,I=0,L=0;switch(r){case"robots":T="?set=set1";break;case"cats":T="?set=set4";break;case"monsters":T="?set=set2";break;default:T="?set=set1"}var G=function(e){L=parseInt(e.getAttribute("imgid")),I=parseInt(e.id),0===g.length?(N((function(e){return[].concat(Object(f.a)(e),[L])})),h((function(e){return[].concat(Object(f.a)(e),[I])}))):(R(A+1),g.includes(L)?(h((function(e){return[].concat(Object(f.a)(e),[I])})),N([]),m.length===d.length-1&&(a(A),setTimeout((function(){i({gameLevel:s,numOfMoves:A,date:Date.now()}),t()}),1e3))):(C(!0),h((function(e){return[].concat(Object(f.a)(e),[I])})),N([]),setTimeout((function(){var e=Object(f.a)(m);e.splice(-1,1),h(e),C(!1)}),2e3)))},M=function(){console.log("nope!")};return Object(c.jsx)("div",{className:"mem-cards-container",style:{maxWidth:"beginner"===s?"500px":"intermediate"===s?"600px":"700px"},children:d.map((function(e,t){return Object(c.jsx)(v,{id:t,imageId:e.id,shownCards:m,cardClicked:k?M:G,source:T},t)}))})},N=function(){var e=Object(n.useContext)(b),t=Object(n.useContext)(d),a=e.currentLevel,s=e.currentTheme,r=e.addNewGame,i=Object(n.useState)(!0),o=Object(u.a)(i,2),j=o[0],O=o[1],m=Object(n.useState)(0),h=Object(u.a)(m,2),p=h[0],x=h[1],f=Object(n.useState)({gameLevel:"",numOfMoves:0,date:Date.now()}),v=Object(u.a)(f,2),N=v[0],w=v[1];Object(n.useEffect)((function(){t.loadUser()}),[]);return!t.loading&&Object(c.jsx)("div",{className:"game-board",children:j?Object(c.jsx)(g,{updateActive:function(){O(!j)},updateNumOfMoves:function(e){x(e)},currentLevel:a,currentTheme:s,updateNewGame:function(e){w(e)}}):Object(c.jsx)("div",{className:"row container",children:Object(c.jsx)("div",{className:"col s12",children:Object(c.jsx)("div",{className:"card blue-grey darken-1 small",children:Object(c.jsxs)("div",{className:"card-content white-text",children:[Object(c.jsx)("span",{className:"center card-title",children:"Congratulations!"}),Object(c.jsx)("br",{}),Object(c.jsxs)("span",{className:"center card-title",children:["You won in ",p," moves!"]}),Object(c.jsx)("br",{}),Object(c.jsx)("div",{className:"col s12 card-action",children:Object(c.jsx)("div",{className:"col s12 center",children:Object(c.jsx)(l.b,{to:"/",className:"waves-effect waves-red btn-flat",onClick:function(e){r(N)},children:"End Game"})})})]})})})})})},w=a(35),y=function(e){var t=e.component,a=Object(w.a)(e,["component"]),s=Object(n.useContext)(d),r=s.isAuthenticated,i=s.loading;return Object(c.jsx)(o.b,Object(h.a)(Object(h.a)({},a),{},{render:function(e){return r||i?Object(c.jsx)(t,Object(h.a)({},e)):Object(c.jsx)(o.a,{to:"/signin"})}}))},k=a(10),C=a.n(k),E=a(15),S=a(12),A=a.n(S),R="UPDATE_CURRENT_LEVEL",T="UPDATE_CURRENT_THEME",I="ADD_NEW_GAME",L="GAME_ERROR",G="REGISTER_SUCCESS",M="REGISTER_FAIL",_="USER_LOADED",D="AUTH_ERROR",U="LOGIN_SUCCESS",F="LOGIN_FAIL",P="LOGOUT",q="CLEAR_ERRORS",B="GET_GAMES",H=function(e,t){switch(t.type){case B:return Object(h.a)(Object(h.a)({},e),{},{games:t.payload});case R:return Object(h.a)(Object(h.a)({},e),{},{currentLevel:t.payload});case T:return Object(h.a)(Object(h.a)({},e),{},{currentTheme:t.payload});case I:return Object(h.a)(Object(h.a)({},e),{},{games:[].concat(Object(f.a)(e.games),[t.payload])});case L:return Object(h.a)(Object(h.a)({},e),{},{error:t.payload});default:return e}},Y=function(e){var t=Object(n.useReducer)(H,{games:[],currentLevel:"beginner",currentTheme:"robots",error:null}),a=Object(u.a)(t,2),s=a[0],r=a[1],i=function(){var e=Object(E.a)(C.a.mark((function e(){var t;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,A.a.get("/api/history");case 3:t=e.sent,r({type:B,payload:t.data}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),r({type:L,payload:e.t0.response.msg});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),l=function(){var e=Object(E.a)(C.a.mark((function e(t){var a,c;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={header:{"Content-type":"application/json"}},e.prev=1,e.next=4,A.a.post("/api/history",t,a);case 4:c=e.sent,r({type:I,payload:c.data}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),r({type:L,payload:e.t0.response.msg});case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return Object(c.jsx)(b.Provider,{value:{games:s.games,currentLevel:s.currentLevel,currentTheme:s.currentTheme,error:s.error,updateCurrentLevel:function(e){r({type:R,payload:e})},updateCurrentTheme:function(e){r({type:T,payload:e})},addNewGame:l,getGames:i},children:e.children})},J=function(e,t){switch(t.type){case _:return Object(h.a)(Object(h.a)({},e),{},{isAuthenticated:!0,loading:!1,user:t.payload});case G:case U:return localStorage.setItem("token",t.payload.token),Object(h.a)(Object(h.a)(Object(h.a)({},e),t.payload),{},{isAuthenticated:!0,loading:!1});case M:case D:case F:case P:return localStorage.removeItem("token"),Object(h.a)(Object(h.a)({},e),{},{token:null,isAuthenticated:!1,loading:!1,user:null,error:t.payload});case q:return Object(h.a)(Object(h.a)({},e),{},{error:null});default:return e}},W=function(e){e?A.a.defaults.headers.common["x-auth-token"]=e:delete A.a.defaults.headers.common["x-auth-token"]},V=function(e){var t={token:localStorage.getItem("token"),isAuthenticated:null,loading:!0,user:null,error:null},a=Object(n.useReducer)(J,t),s=Object(u.a)(a,2),r=s[0],i=s[1],l=function(){var e=Object(E.a)(C.a.mark((function e(){var t;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return localStorage.token&&W(localStorage.token),e.prev=1,e.next=4,A.a.get("/api/auth");case 4:t=e.sent,i({type:_,payload:t.data}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),i({type:D,payload:e.t0.response.data.msg});case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(E.a)(C.a.mark((function e(t){var a,c;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={header:{"Content-Type":"application/json"}},e.prev=1,e.next=4,A.a.post("/api/users",t,a);case 4:c=e.sent,i({type:G,payload:c.data}),l(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),i({type:M,payload:e.t0.response.data.msg});case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),j=function(){var e=Object(E.a)(C.a.mark((function e(t){var a,c;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={header:{"Content-Type":"application/json"}},e.prev=1,e.next=4,A.a.post("/api/auth",t,a);case 4:c=e.sent,i({type:U,payload:c.data}),l(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),i({type:F,payload:e.t0.response.data.msg});case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();return Object(c.jsx)(d.Provider,{value:{token:r.token,isAuthenticated:r.isAuthenticated,loading:r.loading,user:r.user,error:r.error,register:o,clearErrors:function(){i({type:q})},loadUser:l,login:j,logout:function(){i({type:P})}},children:e.children})};a(64);localStorage.token&&W(localStorage.token);var z=function(){return Object(c.jsx)(V,{children:Object(c.jsx)(Y,{children:Object(c.jsx)(l.a,{children:Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(j,{}),Object(c.jsx)("div",{className:"Routes",children:Object(c.jsxs)(o.d,{children:[Object(c.jsx)(y,{exact:!0,path:"/",component:O}),Object(c.jsx)(o.b,{exact:!0,path:"/signin",component:p}),Object(c.jsx)(o.b,{exact:!0,path:"/register",component:x}),Object(c.jsx)(y,{exact:!0,path:"/game",component:N})]})})]})})})})};i.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(z,{})}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.87adb08c.chunk.js.map