(function(e){function t(t){for(var i,r,n=t[0],d=t[1],c=t[2],u=0,v=[];u<n.length;u++)r=n[u],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&v.push(a[r][0]),a[r]=0;for(i in d)Object.prototype.hasOwnProperty.call(d,i)&&(e[i]=d[i]);l&&l(t);while(v.length)v.shift()();return s.push.apply(s,c||[]),o()}function o(){for(var e,t=0;t<s.length;t++){for(var o=s[t],i=!0,n=1;n<o.length;n++){var d=o[n];0!==a[d]&&(i=!1)}i&&(s.splice(t--,1),e=r(r.s=o[0]))}return e}var i={},a={app:0},s=[];function r(t){if(i[t])return i[t].exports;var o=i[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=i,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(o,i,function(t){return e[t]}.bind(null,i));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/video-journal/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],d=n.push.bind(n);n.push=t,n=n.slice();for(var c=0;c<n.length;c++)t(n[c]);var l=d;s.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"03f1":function(e,t,o){"use strict";o("c03f")},"0972":function(e,t,o){"use strict";o("d353")},1151:function(e,t,o){"use strict";o("8569")},1631:function(e,t,o){"use strict";o("315e")},"315e":function(e,t,o){},"56d7":function(e,t,o){"use strict";o.r(t);var i=o("2b0e"),a=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("video-header",{on:{"handle-navigation":e.handleShowHideCapture}}),t("video-player",{attrs:{isNavigationOpen:e.showCapture}}),t("video-footer")],1)},s=[],r=function(){var e=this,t=e._self._c;return t("header",{staticClass:"block-header"},[t("span",{staticClass:"brand"},[t("header-emoji-select",{on:{"emoji-selected":e.handleEmojiSelect}}),t("span",{staticClass:"brand-name"},[e._v("Video Journal")])],1),t("span",{staticClass:"navigation"},[t("button",{on:{click:e.handleNavigationClick}},[e._v("capturer")])])])},n=[],d=function(){var e=this,t=e._self._c;return t("div",[t("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedEmoji,expression:"selectedEmoji"}],on:{change:[function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedEmoji=t.target.multiple?o:o[0]},e.handleEmojiSelect]}},[t("option",{attrs:{value:"😢"}},[e._v("😢")]),t("option",{attrs:{value:"😔"}},[e._v("😔")]),t("option",{attrs:{value:"😐"}},[e._v("😐")]),t("option",{attrs:{value:"😀"}},[e._v("😀")]),t("option",{attrs:{value:"🤩"}},[e._v("🤩")])])])},c=[],l={computed:{selectedEmoji:{get(){return this.$store.state.selectedEmoji},set(e){this.$store.commit("SET_EMOJI",e)}}},methods:{handleEmojiSelect(e){const t=e.target.value;this.$emit("emoji-selected",t)}}},u=l,v=(o("1631"),o("0c7c")),p=Object(v["a"])(u,d,c,!1,null,null,null),h=p.exports,m={name:"video-header",components:{HeaderEmojiSelect:h},methods:{handleNavigationClick(){this.$emit("handle-navigation")}}},f=m,g=(o("8e68"),Object(v["a"])(f,r,n,!1,null,null,null)),b=g.exports,_=function(){var e=this,t=e._self._c;return t("section",{staticClass:"view-player"},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.isNavigationOpen,expression:"isNavigationOpen"}],staticClass:"camera__wrapper"},[t("div",{staticClass:"controlers"},[t("div",{staticClass:"camera-view"},[t("canvas",{ref:"canvas",staticClass:"player"}),t("video",{ref:"player",staticClass:"canvas",attrs:{muted:"muted"},domProps:{muted:!0}}),t("audio",{ref:"audio",staticClass:"audio"})])]),t("div",{staticClass:"buttons-group"},[t("button",{staticClass:"button button--record",class:e.rec_button,on:{click:e.handleVideoRecording}},[e._v(" Rec ")]),t("button",{staticClass:"button button--pause",class:e.pause_button,on:{click:e.handleRecordingPause}},[e._v(" | | ")])])]),t("recorded-videos-list",{directives:[{name:"show",rawName:"v-show",value:!e.isNavigationOpen,expression:"!isNavigationOpen"}],attrs:{videos:e.savedVideos},on:{"remove-video-id":e.deleteVideo}})],1)},w=[],y=(o("14d9"),{audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},video:{facingMode:"user",width:512,height:512,frameRate:25}}),j=function(){var e=this,t=e._self._c;return t("section",{staticClass:"recorded-videos"},e._l(e.videos,(function(o){return t("div",{key:o.id,staticClass:"player"},[t("video-reader",{attrs:{"video-id":o.id,"video-source":o.blob}}),t("delete-video-options",{attrs:{"video-id":o.id},on:{"remove-video-id":e.passVideoId}})],1)})),0)},C=[],O=function(){var e=this,t=e._self._c;return t("div",{staticClass:"delete__control"},[t("button",{staticClass:"delete",on:{click:function(t){return e.warnBeforeVideoRemove(e.videoId)}}},[e._v("🗑️")]),e.warnPopUp?t("div",{staticClass:"warn popup"},[t("button",{staticClass:"button button--delete",on:{click:function(t){return e.removeSavedVideoFromId()}}},[e._v(" Supprimer ")]),t("button",{staticClass:"button button--cancel",on:{click:function(t){return e.warnBeforeVideoRemove()}}},[e._v(" annuler ")])]):e._e()])},R=[];const V={data(){return{db_name:"videojournal",db_version:1}},methods:{async getIndexedDB(){return new Promise((e,t)=>{let o=window.indexedDB.open(this.db_name,this.db_version);o.onerror=e=>{console.log("Error Opening the indexed Database",e),t("Error")},o.onsuccess=t=>{e(t.target.result)},o.onupgradeneeded=e=>{console.log("On Upgrade Needed");let t=e.target.result;t.createObjectStore("videos",{autoIncrement:!0,keyPath:"id"})}})},async getVideosFromDb(){return new Promise(e=>{let t=this.db.transaction(["videos"],"readonly");t.oncomplete=()=>{e(i)};let o=t.objectStore("videos"),i=[];o.openCursor().onsuccess=e=>{let t=e.target.result;t&&(i.push(t.value),t.continue())}})},async addVideo(e,t){this.addDisabled=!0;let o={name:e,date:new Date,blob:t};console.log("about to add "+JSON.stringify(o)),await this.addVideoToDb(o),this.savedVideos=await this.getVideosFromDb(),this.addDisabled=!1},async addVideoToDb(e){return new Promise(t=>{let o=this.db.transaction(["videos"],"readwrite");o.oncomplete=()=>{t()};let i=o.objectStore("videos");i.add(e)})},async deleteVideo(e){console.log("get deleting video:",e),await this.deleteVideoFromDb(e),this.savedVideos=await this.getVideosFromDb()},async deleteVideoFromDb(e){return console.log("ask deleting video:",e),new Promise(t=>{let o=this.db.transaction(["videos"],"readwrite");o.oncomplete=()=>{t()};let i=o.objectStore("videos");i.delete(e)})}}};var S={name:"delete-video-options",data(){return{warnPopUp:!1}},props:{videoId:{type:Number,required:!0}},mixins:[V],methods:{warnBeforeVideoRemove(e){console.log("VIDEO ID:",e),this.warnPopUp?this.warnPopUp=!1:this.warnPopUp=!0},removeSavedVideoFromId(){console.log("DELETE VIDEO ID:",this.videoId),this.$emit("remove-video-id",this.videoId),this.warnPopUp=!1}}},D=S,x=(o("1151"),Object(v["a"])(D,O,R,!1,null,null,null)),E=x.exports,I=function(){var e=this,t=e._self._c;return t("video",{ref:"video"+e.videoId,class:"video"+e.videoId,attrs:{controls:""}},[t("source",{attrs:{src:e.getBlobUrl(e.videoSource),type:"video/webm"}})])},k=[],P=(o("88a7"),o("271a"),o("5494"),{name:"video-reader",props:{videoId:{type:Number,required:!0},videoSource:{type:Blob,required:!0}},methods:{getBlobUrl(e){const t=URL.createObjectURL(e);return t}}}),T=P,$=Object(v["a"])(T,I,k,!1,null,null,null),N=$.exports,F={name:"recorded-videos-list",components:{DeleteVideoOptions:E,VideoReader:N},props:{videos:{type:Array,default:()=>{}}},methods:{passVideoId(e){this.$emit("remove-video-id",e)}}},U=F,B=(o("0972"),Object(v["a"])(U,j,C,!1,null,null,null)),M=B.exports,A={name:"video-player",props:{isNavigationOpen:{type:Boolean,default:void 0}},mixins:[V],components:{RecordedVideosList:M},watch:{isNavigationOpen(){this.isNavigationOpen?setInterval(this.videoPlayerInit(),2e3):this.videoPlayerStop()}},data(){return{videoConstraints:y,playerStyle:"",rec_button:"",pause_button:"",showButton:"record",mediaRecorder:"",recordedChunks:[],savedVideos:[],db:"",deviceInfos:{enumarateDevices:{},supportedConstraints:{}}}},async created(){this.db=await this.getIndexedDB(),this.savedVideos=await this.getVideosFromDb()},methods:{videoPlayerInit(){const e=this.$refs.player,t=this.$refs.canvas,o=this.$refs.audio,i=t.captureStream(25),a={mineType:"video/webm; codecs=vp9"};this.mediaRecorder=new MediaRecorder(i,a),navigator.mediaDevices.enumerateDevices().then(e=>{this.deviceInfos.enumarateDevices=e}),this.deviceInfos.supportedConstraints=navigator.mediaDevices.getSupportedConstraints();const s=this;navigator.mediaDevices&&navigator.mediaDevices.getUserMedia(this.videoConstraints).then((function(t){e.srcObject=t,o.srcObject=t,e.onloadedmetadata=()=>{e.play(),s.streamOnCanvas()}})).catch((function(e){console.error(e.name+": "+e.message)}))},streamOnCanvas(){const e=this.$refs.player,t=this.$refs.canvas,o=t.getContext("2d");o.willReadFrequently=!0;const i=e.videoWidth,a=e.videoHeight;return t.width=i,t.height=a,setInterval(()=>{o.drawImage(this.$refs.player,0,0,i,a);let e=o.getImageData(0,0,i,a);o.putImageData(e,0,0),this.addTextToCanvas(this.$store.state.selectedEmoji+" Video Journal")},40)},addTextToCanvas(e){const t=this.$refs.canvas,o=t.getContext("2d"),i=new Intl.DateTimeFormat("fr-FR",{dateStyle:"short",timeStyle:"short"}).format(new Date);o.fillStyle="#4dba87",o.fillRect(0,0,520,40),o.textAlign="left",o.font="Bold 16px Monospace",o.fillStyle="rgba(255, 255, 255, 1)",o.fillText(e,16,25),o.textAlign="right",o.fillStyle="rgba(255, 255, 255, 1)",o.fillText(i,500,25)},videoPlayerStop(){const e=this.$refs.player,t=e.srcObject,o=t.getTracks();o.forEach((function(e){e.stop()})),e.srcObject=null},startRecord(){"inactive"===this.mediaRecorder.state&&(this.mediaRecorder.ondataavailable=this.saveVideoChunks,this.rec_button="button--record__recording",this.mediaRecorder.stream.addTrack(this.$refs.audio.srcObject.getAudioTracks()[0]),this.mediaRecorder.start())},stopRecord(){"recording"===this.mediaRecorder.state&&(this.mediaRecorder.stop(),this.rec_button="",this.recordedChunks=[])},pauseRecord(){"recording"===this.mediaRecorder.state&&(this.pause_button="button--pause__active",this.rec_button="button--record__recording paused",this.mediaRecorder.pause())},resumeRecord(){"paused"===this.mediaRecorder.state&&(this.rec_button="button--record__recording",this.pause_button="",this.mediaRecorder.resume())},saveVideoChunks(e){e.data.size>0&&(this.recordedChunks.push(e.data),this.saveVideo())},saveVideo(){const e=new Date,t=e.getDate(),o=e.getMonth()+1,i=e.getFullYear(),a=e.getHours(),s=e.getMinutes(),r=e.getSeconds(),n=new Blob(this.recordedChunks,{type:"video/webm"}),d=`video_journal_${o}_${t}_${i}_${a}h_${s}m_${r}s_.mp4`;this.addVideo(d,n)},handleVideoRecording(){const e=this.mediaRecorder.state;"recording"===e?this.stopRecord():this.startRecord()},handleRecordingPause(){const e=this.mediaRecorder.state;"paused"===e?this.resumeRecord():this.pauseRecord()}}},J=A,q=(o("efed"),Object(v["a"])(J,_,w,!1,null,null,null)),H=q.exports,L=function(){var e=this,t=e._self._c;return t("footer",{staticClass:"block-footer"},[e._v(" © "+e._s((new Date).getFullYear())+" - video journal - storage used: "+e._s(e.dataUsed.toFixed(2))+"% ")])},Y=[],z={name:"video-footer",data(){return{dataUsed:0,dataRemaning:0}},mounted(){this.getAvailbleDataStorage()},methods:{async getAvailbleDataStorage(){if(navigator.storage&&navigator.storage.estimate){const e=await navigator.storage.estimate(),t=e.usage/e.quota*100;this.dataUsed=t;const o=e.quota-e.usage;this.dataRemaning=o}}}},G=z,W=(o("e777"),Object(v["a"])(G,L,Y,!1,null,null,null)),K=W.exports,Q={name:"App",components:{VideoHeader:b,VideoPlayer:H,VideoFooter:K},data(){return{showCapture:!1}},methods:{handleShowHideCapture(){console.log("CAPTURED EVENT"),this.showCapture=!this.showCapture}}},X=Q,Z=(o("03f1"),Object(v["a"])(X,a,s,!1,null,null,null)),ee=Z.exports,te=o("2f62");i["a"].use(te["a"]);const oe=new te["a"].Store({state:{selectedEmoji:"😀"},getters:{getEmoji(e){return e.selectedEmoji}},mutations:{SET_EMOJI(e,t){e.selectedEmoji=t}},actions:{setEmoji({commit:e},t){e("SET_EMOJI",t)}}});var ie=oe,ae=o("9483");Object(ae["a"])("/video-journal/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),i["a"].config.productionTip=!1,new i["a"]({el:"#app",store:ie,render:e=>e(ee)})},"848a":function(e,t,o){},8569:function(e,t,o){},"8e68":function(e,t,o){"use strict";o("848a")},a068:function(e,t,o){},c03f:function(e,t,o){},cacf:function(e,t,o){},d353:function(e,t,o){},e777:function(e,t,o){"use strict";o("cacf")},efed:function(e,t,o){"use strict";o("a068")}});
//# sourceMappingURL=app.a615a267.js.map