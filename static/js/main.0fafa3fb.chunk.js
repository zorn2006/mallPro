(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{142:function(e,t,a){"use strict";a.r(t);a(73),a(98);var s=a(0),n=a.n(s),o=a(33),r=a.n(o),c=a(7),l=a.n(c),i=a(34),u=a.n(i),d=a(65),p=a(23),f=a(66),b=a(67),h=a(70),M=a(68),m=a(71),g=a(8),A=(a(124),a(69)),R=a.n(A),v=function(e){var t=e.activeModal,a=e.currentTitle,s=e.currentCaption,o=e.actionFlag,r=e.onCloseModal,c=e.onAction,l=e.currentButtonText;return n.a.createElement(g.ModalRoot,{activeModal:t},n.a.createElement(g.ModalCard,{id:"MY_MODAL",onClose:function(){return r()},title:a,caption:s,actions:[{title:l,type:"primary",action:function(){return c(o)}}]}))},w={group_id:185199781},S={access_token:"9b1957fb4a56d227f2d894046db9b8aa12b7dafbbf6f606c0f7af580dcc06cf12862881c158bc4cf82e09"},_={access_token:"59f1b2e059f1b2e059f1b2e0c5599da582559f159f1b2e004b9e79590e7db44bab8b30c"},G={v:"5.101"},V=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(h.a)(this,Object(M.a)(t).call(this,e))).startScanFlow=function(){a.openQRScanner()},a.handleQRResult=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"1111111";a.setState({QRResult:e}),a.state.isMember?a.sendQRResult(a.state.QRResult):l.a.send("VKWebAppCallAPIMethod",{method:"groups.isMember",request_id:"groups.isMember",params:Object(p.a)({user_id:a.state.fetchedUser.id},w,_,G)})},a.sendQRResult=Object(d.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R.a.get("https://reqres.in/api/users",{qr:a.state.QRResult,user:a.state.fetchedUser});case 3:a.state.isMessagesAllowed?a.QRSuccessModal():l.a.send("VKWebAppCallAPIMethod",{method:"messages.isMessagesFromGroupAllowed",request_id:"messages.isMessagesFromGroupAllowed",params:Object(p.a)({request_id:"messages.isMessagesFromGroupAllowed",user_id:a.state.fetchedUser.id},S,G,w)}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}},e,null,[[0,6]])})),a.setAreaVal=function(e){a.setState({areaVal:a.state.areaVal+" "+JSON.stringify(e)})},a.activateModal=function(){a.setState({activeModal:"MY_MODAL"})},a.closeModal=function(){a.setState({activeModal:null})},a.joinToGroup=function(){l.a.send("VKWebAppJoinGroup",w)},a.openQRScanner=function(){setTimeout(function(){l.a.send("VKWebAppOpenQR")},300)},a.handleModalAction=function(e){a.closeModal(),{joinGroup:function(){return a.joinToGroup()},qrSuccess:function(){return a.openQRScanner()}}[e]()},a.activateJoinGroupModal=function(){a.setState({currentTitle:"\u0412\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435 \u0432 \u0433\u0440\u0443\u043f\u043f\u0443",currentCaption:"\u0414\u043b\u044f \u043d\u0430\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u044f \u0431\u0430\u043b\u043e\u0432 \u043f\u043e\u0434\u043f\u0438\u0448\u0438\u0442\u0435\u0441\u044c \u043d\u0430 \u0433\u0440\u0443\u043f\u043f\u0443 \u0438 \u0440\u0430\u0441\u0441\u044b\u043b\u043a\u0443",currentButtonText:"\u0412\u0441\u0442\u0443\u043f\u0438\u0442\u044c",actionFlag:"joinGroup"}),a.activateModal()},a.QRSuccessModal=function(){a.setState({currentTitle:"\u0427\u0435\u043a \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d",currentCaption:"\u0412 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u043c\u044b \u0432\u044b\u043f\u043e\u043b\u043d\u0438\u043c \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0443 \u0438 \u043d\u0430\u0447\u0438\u0441\u043b\u0438\u043c \u0431\u0430\u043b\u044b",currentButtonText:"\u0421\u043a\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0435\u0449\u0435",actionFlag:"qrSuccess"}),a.activateModal()},a.state={activePanel:"home",isMember:!1,isMessagesAllowed:!1,fetchedUser:null,activeModal:null,QRResult:null,currentTitle:"",currentCaption:"",actionFlag:"",areaVal:""},a}return Object(m.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this;l.a.subscribe(function(t){var a=t.detail;switch(e.setAreaVal(a),a.type){case"VKWebAppGetUserInfoResult":e.setState({fetchedUser:a.data});break;case"VKWebAppAllowMessagesFromGroupResult":"messages.isMessagesFromGroupAllowed"===a.data.request_id&&a.data.result&&(e.setState({isMessagesAllowed:!0}),e.QRSuccessModal());break;case"VKWebAppJoinGroupResult":a.data.result&&(console.log("VKWebAppJoinGroupResult"),e.sendQRResult());break;case"VKWebAppOpenQRResult":e.handleQRResult(a.data.qr_reult);break;case"VKWebAppCallAPIMethodResult":"groups.isMember"===a.data.request_id&&0===a.data.response&&e.activateJoinGroupModal(),"groups.isMember"===a.data.request_id&&1===a.data.response&&(e.setState({isMember:!0}),e.sendQRResult()),"messages.isMessagesFromGroupAllowed"===a.data.request_id&&1===a.data.response.is_allowed&&(e.setState({isMessagesAllowed:!0}),e.QRSuccessModal()),"messages.isMessagesFromGroupAllowed"===a.data.request_id&&0===a.data.response.is_allowed&&l.a.send("VKWebAppAllowMessagesFromGroup",Object(p.a)({request_id:"messages.isMessagesFromGroupAllowed"},w));break;default:console.log("default")}}),l.a.send("VKWebAppGetUserInfo",{})}},{key:"render",value:function(){return n.a.createElement(g.View,{activePanel:this.state.activePanel},n.a.createElement(g.Panel,{id:"home"},n.a.createElement(g.PanelHeader,null,"Scanner"),this.state.fetchedUser&&n.a.createElement(g.Group,{title:"Welcome"},n.a.createElement(g.ListItem,{before:this.state.fetchedUser.photo_200?n.a.createElement(g.Avatar,{src:this.state.fetchedUser.photo_200}):null,description:this.state.fetchedUser.city&&this.state.fetchedUser.city.title?this.state.fetchedUser.city.title:""},"".concat(this.state.fetchedUser.first_name," ").concat(this.state.fetchedUser.last_name))),n.a.createElement(g.Button,{onClick:this.startScanFlow,size:"xl",level:"primary"},"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0447\u0435\u043a"),n.a.createElement(v,{activeModal:this.state.activeModal,currentTitle:this.state.currentTitle,currentCaption:this.state.currentCaption,actionFlag:this.state.actionFlag,currentButtonText:this.state.currentButtonText,onCloseModal:this.closeModal,onAction:this.handleModalAction})))}}]),t}(n.a.Component);l.a.send("VKWebAppInit",{}),console.log("kek",l.a.send("VKWebAppGetUserInfo",{})),r.a.render(n.a.createElement(V,null),document.getElementById("root"))},72:function(e,t,a){e.exports=a(142)}},[[72,1,2]]]);
//# sourceMappingURL=main.0fafa3fb.chunk.js.map