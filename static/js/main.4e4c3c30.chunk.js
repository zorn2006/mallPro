(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{142:function(e,t,a){"use strict";a.r(t);a(73),a(98);var s=a(0),n=a.n(s),r=a(33),o=a.n(r),c=a(7),i=a.n(c),l=a(34),u=a.n(l),d=a(23),p=a(65),f=a(66),b=a(67),h=a(70),m=a(68),M=a(71),A=a(8),g=(a(124),a(69)),v=a.n(g),_=function(e){var t=e.activeModal,a=e.currentTitle,s=e.currentCaption,r=e.actionFlag,o=e.onCloseModal,c=e.onAction,i=e.currentButtonText;return n.a.createElement(A.ModalRoot,{activeModal:t},n.a.createElement(A.ModalCard,{id:"MY_MODAL",onClose:function(){return o()},title:a,caption:s,actions:[{title:i,type:"primary",action:function(){return c(r)}}]}))},w={group_id:185199781},G={access_token:"9b1957fb4a56d227f2d894046db9b8aa12b7dafbbf6f606c0f7af580dcc06cf12862881c158bc4cf82e09"},V={access_token:"59f1b2e059f1b2e059f1b2e0c5599da582559f159f1b2e004b9e79590e7db44bab8b30c"},R={v:"5.101"},k=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).handleQRResult=function(){var e=Object(p.a)(u.a.mark(function e(t){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.a.get("https://reqres.in/api/users",{qr:t,user:a.state.fetchedUser});case 3:i.a.send("VKWebAppCallAPIMethod",{method:"messages.isMessagesFromGroupAllowed",request_id:"messages.isMessagesFromGroupAllowed",params:Object(d.a)({request_id:"messages.isMessagesFromGroupAllowed",user_id:a.state.fetchedUser.id},G,R,w)}),a.setAreaVal("passed data posting"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),a.setAreaVal(e.t0);case 10:case"end":return e.stop()}},e,null,[[0,7]])}));return function(t){return e.apply(this,arguments)}}(),a.setAreaVal=function(e){a.setState({areaVal:a.state.areaVal+" "+JSON.stringify(e)})},a.activateModal=function(){a.setState({activeModal:"MY_MODAL"})},a.closeModal=function(){a.setState({activeModal:null})},a.joinToGroup=function(){i.a.send("VKWebAppJoinGroup",w)},a.openQRScanner=function(){i.a.send("VKWebAppOpenQR")},a.handleModalAction=function(e){({joinGroup:function(){return a.joinToGroup()},qrSuccess:function(){return a.openQRScanner()}})[e](),a.closeModal()},a.activateJoinGroupModal=function(){a.setState({currentTitle:"\u0412\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435 \u0432 \u0433\u0440\u0443\u043f\u043f\u0443",currentCaption:"\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u0441\u0442\u0440\u0443\u043f\u0438\u0442\u044c \u0432 \u0433\u0440\u0443\u043f\u043f\u0443",currentButtonText:"\u0412\u0441\u0442\u0443\u043f\u0438\u0442\u044c",actionFlag:"joinGroup"}),a.activateModal()},a.QRSuccessModal=function(){a.setState({currentTitle:"\u0427\u0435\u043a \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d",currentCaption:"\u0412 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u043c\u044b \u0432\u044b\u043f\u043e\u043b\u043d\u0438\u043c \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0443 \u0438 \u043d\u0430\u0447\u0438\u0441\u043b\u0438\u043c \u0431\u0430\u043b\u044b",currentButtonText:"\u0421\u043a\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0435\u0449\u0435",actionFlag:"qrSuccess"}),a.activateModal()},a.state={activePanel:"home",fetchedUser:null,activeModal:null,currentTitle:"",currentCaption:"",actionFlag:"",areaVal:""},a}return Object(M.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){},2e3),i.a.subscribe(function(t){var a=t.detail;switch(console.log(a),e.setAreaVal(a),a.type){case"VKWebAppGetUserInfoResult":e.setState({fetchedUser:a.data}),i.a.send("VKWebAppCallAPIMethod",{method:"groups.isMember",request_id:"groups.isMember",params:Object(d.a)({user_id:a.data.id},w,V,R)});break;case"VKWebAppAllowMessagesFromGroupResult":"messages.isMessagesFromGroupAllowed"===a.data.request_id&&a.data.result&&e.QRSuccessModal();break;case"VKWebAppJoinGroupResult":a.data.result&&e.openQRScanner();break;case"VKWebAppOpenQRResult":e.handleQRResult(a.data.qr_reult);break;case"VKWebAppCallAPIMethodResult":"groups.isMember"===a.data.request_id&&0===a.data.response&&e.activateJoinGroupModal(),"groups.isMember"===a.data.request_id&&1===a.data.response&&e.openQRScanner(),"messages.isMessagesFromGroupAllowed"===a.data.request_id&&1===a.data.response.is_allowed&&e.QRSuccessModal(),"messages.isMessagesFromGroupAllowed"===a.data.request_id&&0===a.data.response.is_allowed&&i.a.send("VKWebAppAllowMessagesFromGroup",Object(d.a)({key:"dBuBKe1kFcdemzB",request_id:"messages.isMessagesFromGroupAllowed"},w));break;default:console.log("default")}}),i.a.send("VKWebAppGetUserInfo",{})}},{key:"render",value:function(){return n.a.createElement(A.View,{activePanel:this.state.activePanel},n.a.createElement(A.Panel,{id:"home"},n.a.createElement(A.PanelHeader,null,"Scanner"),this.state.fetchedUser&&n.a.createElement(A.Group,{title:"Welcome"},n.a.createElement(A.ListItem,{before:this.state.fetchedUser.photo_200?n.a.createElement(A.Avatar,{src:this.state.fetchedUser.photo_200}):null,description:this.state.fetchedUser.city&&this.state.fetchedUser.city.title?this.state.fetchedUser.city.title:""},"".concat(this.state.fetchedUser.first_name," ").concat(this.state.fetchedUser.last_name))),n.a.createElement(_,{activeModal:this.state.activeModal,currentTitle:this.state.currentTitle,currentCaption:this.state.currentCaption,actionFlag:this.state.actionFlag,currentButtonText:this.state.currentButtonText,onCloseModal:this.closeModal,onAction:this.handleModalAction})))}}]),t}(n.a.Component);i.a.send("VKWebAppInit",{}),console.log("kek",i.a.send("VKWebAppGetUserInfo",{})),o.a.render(n.a.createElement(k,null),document.getElementById("root"))},72:function(e,t,a){e.exports=a(142)}},[[72,1,2]]]);
//# sourceMappingURL=main.4e4c3c30.chunk.js.map