(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{265:function(e,t,a){e.exports=a(573)},270:function(e,t,a){},282:function(e,t){},284:function(e,t,a){var n={"./N3Lexer":112,"./N3Lexer.js":112,"./N3Parser":113,"./N3Parser.js":113,"./N3Store":161,"./N3Store.js":161,"./N3StreamParser":162,"./N3StreamParser.js":162,"./N3StreamWriter":168,"./N3StreamWriter.js":168,"./N3Util":114,"./N3Util.js":114,"./N3Writer":117,"./N3Writer.js":117};function i(e){var t=o(e);return a(t)}function o(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=o,e.exports=i,i.id=284},287:function(e,t){},289:function(e,t){},344:function(e,t){},345:function(e,t){},347:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=347},395:function(e,t){},397:function(e,t){},398:function(e,t){},404:function(e,t){},407:function(e,t){},427:function(e,t){},430:function(e,t){},447:function(e,t){},450:function(e,t){},471:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=471},498:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=498},548:function(e,t,a){},549:function(e,t,a){},573:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(51),r=a.n(o),s=(a(270),a(52)),l=a.n(s),c=a(149),d=a(31),u=a(32),m=a(34),h=a(33),p=a(35),g=a(61),f=a(60),y=a(25),v=a.n(y),E=a(1),b=a.n(E),w=a(18),k=a(69),N=a.n(k),C=function(e){return i.a.createElement("label",{htmlFor:"profilePictureUpload"},i.a.createElement("img",{src:e.picture,width:"100%",height:"100%",alt:"This is the ProfilePicture"}),i.a.createElement("input",{id:"profilePictureUpload",name:"profilePictureUpload",type:"file",style:{display:"none"},onChange:e.onChange,accept:"image/*"}))},I=a(44),q=a.n(I),j=a(19),O=a.n(j),F=a(21),S=a.n(F),R=function(e){var t=e.editMode?i.a.createElement(q.a,{placeholder:e.name,onChange:e.onChange,onBlur:e.onBlur,defaultValue:e.name}):i.a.createElement("p",{onClick:e.onClick},e.name);return i.a.createElement(O.a,{style:{border:"solid #FFF 5px",borderRadius:"10",width:"100%"}},i.a.createElement(S.a,{md:"8"},i.a.createElement(O.a,{style:{width:"100%"}},t)))},M=function(e){var t=e.editMode?i.a.createElement(q.a,{placeholder:e.bio,onChange:e.onChange,onBlur:e.onBlur,defaultValue:e.bio}):i.a.createElement("p",{onClick:e.onClick},e.bio);return i.a.createElement(O.a,{style:{border:"solid #FFF 5px",borderRadius:"10",width:"100%"}},i.a.createElement(S.a,{md:"8"},i.a.createElement(O.a,{style:{width:"100%"}},t)))},A=function(e){var t=e.email[0].split(":")[1],a=e.editMode?i.a.createElement(q.a,{placeholder:t,id:e.email[1],onChange:e.onChange,onBlur:e.onBlur,defaultValue:t}):i.a.createElement("p",{onClick:e.onClick},t);return i.a.createElement(O.a,{style:{border:"solid #FFF 5px",borderRadius:"10",width:"100%"}},i.a.createElement(S.a,{md:"8"},i.a.createElement(O.a,{style:{width:"100%"}},a)))},x=function(e){var t=e.telephone[0].split(":")[1],a=e.editMode?i.a.createElement(q.a,{placeholder:t,id:e.telephone[1],onChange:e.onChange,onBlur:e.onBlur,defaultValue:t}):i.a.createElement("p",{onClick:e.onClick},t);return i.a.createElement(O.a,{style:{border:"solid #FFF 5px",borderRadius:"10",width:"100%"}},i.a.createElement(S.a,{md:"8"},i.a.createElement(O.a,{style:{width:"100%"}},a)))},B=function(e){var t=e.editMode?i.a.createElement(q.a,{placeholder:e.job,onChange:e.onChange,onBlur:e.onBlur,defaultValue:e.job}):i.a.createElement("p",{onClick:e.onClick},e.job);return i.a.createElement(O.a,{style:{border:"solid #FFF 5px",borderRadius:"10",width:"100%"}},i.a.createElement(S.a,{md:"8"},i.a.createElement(O.a,{style:{width:"100%"}},t)))},T=new b.a.Namespace("http://xmlns.com/foaf/0.1/"),U=new b.a.Namespace("http://www.w3.org/2006/vcard/ns#"),P=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).fetchUser=function(){v.a.trackSession(function(e){if(e){var t=e.webId,n=b.a.graph();new b.a.Fetcher(n).load(t).then(function(){var e=n.any(b.a.sym(t),T("name")),i=e?e.value:void 0,o=[];n.each(b.a.sym(t),U("hasEmail")).forEach(function(e){n.each(b.a.sym(e),U("value")).forEach(function(t){o.push([t.value,e.value])})});var r=n.any(b.a.sym(t),U("hasPhoto")),s=r?r.value:"",l=n.any(b.a.sym(t),U("role")),c=l?l.value:"",d=n.any(b.a.sym(t),U("note")),u=d?d.value:void 0,m=[];n.each(b.a.sym(t),U("hasTelephone")).forEach(function(e){n.each(b.a.sym(e),U("value")).forEach(function(t){m.push([t.value,e.value])})}),a.setState({webId:t,name:i,picture:s,emails:o,job:c,bio:u,telephones:m,newName:i,editMode:!1})})}else console.log("You are not logged in")})},a.setProfilePicture=function(e){var t=e.target.files[0],n=b.a.graph(),i=new b.a.Fetcher(n),o=a.props.webId,r=a.state.picture,s=new FileReader;s.onload=function(){var e=this.result,a=encodeURIComponent(t.name),s=o.replace("card#me",a);i.webOperation("PUT",s,{data:e,contentType:"image"}).then(function(e){if(201===e.status){var t=new b.a.UpdateManager(n),a=r?b.a.st(b.a.sym(o),U("hasPhoto"),b.a.sym(r),b.a.sym(o).doc()):[],i=b.a.st(b.a.sym(o),U("hasPhoto"),b.a.sym(s),b.a.sym(o).doc());t.update(a,i,function(e,t,a){t?console.log("Changes have been applied, reload page to see them"):alert(a)})}})},s.readAsArrayBuffer(t)},a.state={webId:void 0,name:"",picture:"",emails:[],job:"",bio:"",telephones:[],newName:"",editName:!1,newBio:"",editBio:!1,newEmail:"",editEmail:!1,newTelephone:"",editTelephone:!1,newJob:"",editJob:!1},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"applyNameChanges",value:function(){var e,t,a=this,n=b.a.graph(),i=new b.a.UpdateManager(n);e=b.a.st(b.a.sym(this.props.webId),T("name"),b.a.lit(this.state.name),b.a.sym(this.props.webId).doc()),t=b.a.st(b.a.sym(this.props.webId),T("name"),b.a.lit(this.state.newName),b.a.sym(this.props.webId).doc()),new Promise(function(n,o){i.update(e,t,function(e,t,a){t?(console.log("Changes have been applied!"),n()):o(a)}),a.setState({editName:!1})}).then(function(){a.fetchUser()})}},{key:"getNewName",value:function(e){this.setState({newName:e.target.value})}},{key:"toggleEditName",value:function(){this.setState({editName:!this.state.editName})}},{key:"applyBioChanges",value:function(){var e,t,a=this,n=b.a.graph(),i=new b.a.UpdateManager(n);e=b.a.st(b.a.sym(this.props.webId),U("note"),b.a.lit(this.state.bio),b.a.sym(this.props.webId).doc()),t=b.a.st(b.a.sym(this.props.webId),U("note"),b.a.lit(this.state.newBio),b.a.sym(this.props.webId).doc()),new Promise(function(n,o){i.update(e,t,function(e,t,a){t?(console.log("Changes have been applied!"),n()):o(a)}),a.setState({editBio:!1})}).then(function(){a.fetchUser()})}},{key:"getNewBio",value:function(e){this.setState({newBio:e.target.value})}},{key:"toggleEditBio",value:function(){this.setState({editBio:!this.state.editBio})}},{key:"applyEmailChanges",value:function(e){var t,a,n=this,i=e.target.placeholder,o=e.target.id,r=b.a.graph(),s=new b.a.UpdateManager(r);t=b.a.st(b.a.sym(o),U("value"),b.a.sym("mailto:"+i),b.a.sym(this.state.webId).doc()),a=b.a.st(b.a.sym(o),U("value"),b.a.sym("mailto:"+this.state.newEmail),b.a.sym(this.state.webId).doc()),new Promise(function(e,n){s.update(t,a,function(t,a,i){a?e():n(i)})}).then(function(){n.setState({editEmail:!1}),n.fetchUser()})}},{key:"getNewEmail",value:function(e){this.setState({newEmail:e.target.value})}},{key:"toggleEditEmail",value:function(){this.setState({editEmail:!this.state.editEmail})}},{key:"applyJobChanges",value:function(){var e,t,a=this,n=b.a.graph(),i=new b.a.UpdateManager(n);e=b.a.st(b.a.sym(this.props.webId),U("role"),b.a.lit(this.state.job),b.a.sym(this.props.webId).doc()),t=b.a.st(b.a.sym(this.props.webId),U("role"),b.a.lit(this.state.newJob),b.a.sym(this.props.webId).doc()),new Promise(function(a,n){i.update(e,t,function(e,t,i){t?a():n(i)})}).then(function(){a.setState({editJob:!1}),a.fetchUser()})}},{key:"getNewJob",value:function(e){this.setState({newJob:e.target.value})}},{key:"toggleEditJob",value:function(){this.setState({editJob:!this.state.editJob})}},{key:"applyTelephoneChanges",value:function(e){var t,a,n=this,i=e.target.placeholder,o=e.target.id,r=b.a.graph(),s=new b.a.UpdateManager(r);t=b.a.st(b.a.sym(o),U("value"),b.a.sym("tel:"+i),b.a.sym(this.state.webId).doc()),a=b.a.st(b.a.sym(o),U("value"),b.a.sym("tel:"+this.state.newTelephone),b.a.sym(this.state.webId).doc()),new Promise(function(e,n){s.update(t,a,function(t,a,i){a?e():n(i)})}).then(function(){n.setState({editTelephone:!1}),n.fetchUser()})}},{key:"getNewTelephone",value:function(e){this.setState({newTelephone:e.target.value})}},{key:"toggleEditTelephone",value:function(){this.setState({editTelephone:!this.state.editTelephone})}},{key:"componentDidMount",value:function(){this.fetchUser()}},{key:"render",value:function(){var e=this,t=this.state.name?i.a.createElement(R,{name:this.state.name,editMode:this.state.editName,onBlur:this.applyNameChanges.bind(this),onChange:this.getNewName.bind(this),onClick:this.toggleEditName.bind(this)}):i.a.createElement(R,{name:"You did not enter your name yet...",editMode:this.state.editName,onBlur:this.applyNameChanges.bind(this),onChange:this.getNewName.bind(this),onClick:this.toggleEditName.bind(this)}),a=this.state.job?i.a.createElement(B,{job:this.state.job,editMode:this.state.editJob,onBlur:this.applyJobChanges.bind(this),onChange:this.getNewJob.bind(this),onClick:this.toggleEditJob.bind(this)}):i.a.createElement(B,{job:"You did not enter your job yet...",editMode:this.state.editJob,onBlur:this.applyJobChanges.bind(this),onChange:this.getNewJob.bind(this),onClick:this.toggleEditJob.bind(this)}),n=this.state.bio?i.a.createElement(M,{bio:this.state.bio,editMode:this.state.editBio,onBlur:this.applyBioChanges.bind(this),onChange:this.getNewBio.bind(this),onClick:this.toggleEditBio.bind(this)}):i.a.createElement(M,{bio:"You do not have a bio yet...",editMode:this.state.editBio,onBlur:this.applyBioChanges.bind(this),onChange:this.getNewBio.bind(this),onClick:this.toggleEditBio.bind(this)}),o=this.state.emails.map(function(t,a){return i.a.createElement(A,{key:a,email:t,editMode:e.state.editEmail,onChange:e.getNewEmail.bind(e),onClick:e.toggleEditEmail.bind(e),onBlur:e.applyEmailChanges.bind(e)})}),r=this.state.telephones.map(function(t,a){return i.a.createElement(x,{key:a,telephone:t,editMode:e.state.editTelephone,onChange:e.getNewTelephone.bind(e),onClick:e.toggleEditTelephone.bind(e),onBlur:e.applyTelephoneChanges.bind(e)})});return i.a.createElement(N.a,null,this.state.webId?i.a.createElement("div",null,i.a.createElement(O.a,null,i.a.createElement(S.a,null,i.a.createElement(C,{picture:this.state.picture,onChange:this.setProfilePicture})),i.a.createElement(S.a,null,t,a,n,o,r)),i.a.createElement(O.a,null,i.a.createElement(w.a,{onClick:this.props.logout},"Logout"))):i.a.createElement("p",null,"You are not logged in..."))}}]),t}(i.a.Component),D=a(259),J=a.n(D),L=function(e){var t=e.friend;return i.a.createElement(w.c,null,i.a.createElement(J.a,{fluid:!0,width:"4%",src:t.picture}),i.a.createElement(w.e,{variant:"paragraph"},t.name))},H=new b.a.Namespace("http://xmlns.com/foaf/0.1/"),Y=new b.a.Namespace("http://www.w3.org/2006/vcard/ns#"),W=new b.a.Namespace("http://www.w3.org/ns/auth/acl#"),_=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).state={webId:void 0,friendToAdd:"",canAddFriend:!1,friends:[]},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"fetchFriends",value:function(){var e=this,t=b.a.graph(),a=new b.a.Fetcher(t),n=this.state.webId,i=b.a.graph(),o=new b.a.Fetcher(i),r=n.replace("card#me","card.acl#viewer");o.load(r),a.load(n).then(function(o){var s=t.each(b.a.sym(n),H("knows")).map(function(e){return a.load(e.value).then(function(){console.log("Fetched "+e.value+"'s Profile");var a=t.any(b.a.sym(e.value),H("name")),n=t.any(b.a.sym(e.value),Y("hasPhoto"));n=n?n.value:"";var o=i.statementsMatching(r,W("agent"),b.a.sym(e.value)).length>0;return{name:a.value,webId:e.value,access:o,picture:n}})});Promise.all(s).then(function(t){e.setState({friends:t})})})}},{key:"changeFriendToAdd",value:function(e){var t=this,a=new XMLHttpRequest,n=e.target.value;a.onreadystatechange=function(){a.readyState===XMLHttpRequest.DONE&&(200===a.status?t.setState({friendToAdd:n,canAddFriend:!0}):t.setState({canAddFriend:!1}))},new RegExp(/(\w+(:\/\/){1})(\w+\.)(\w+\.)(\w+\/)+/g).test(e.target.value)&&(a.open("GET",n),a.send())}},{key:"addFriend",value:function(){var e=this.state.webId,t=this.state.friendToAdd;console.log(t);var a=b.a.graph(),n=new b.a.UpdateManager(a),i=b.a.st(b.a.sym(e),H("knows"),b.a.sym(t),b.a.sym(e).doc());n.update([],i,function(e,t,a){e?console.log("Changes have been applied, reload page to see them"):alert(a)})}},{key:"componentDidMount",value:function(){var e=this;v.a.trackSession(function(t){t&&(e.setState({webId:t.webId}),e.fetchFriends())})}},{key:"render",value:function(){var e=this.state.canAddFriend?i.a.createElement("div",null,i.a.createElement(w.d,{description:"Enter a friends webId",onInput:this.changeFriendToAdd.bind(this)}),i.a.createElement(w.a,{onClick:this.addFriend.bind(this)},"Add Friend")):i.a.createElement("div",null,i.a.createElement(w.d,{type:"text",description:"Enter a friends webId",onInput:this.changeFriendToAdd.bind(this)}),i.a.createElement(w.a,{disabled:!0},"Add Friend")),t=this.state.friends.map(function(e,t){return i.a.createElement(L,{friend:e,key:t})});return i.a.createElement(N.a,null,i.a.createElement(w.b,null,t),this.state.webId?e:i.a.createElement("p",null,"You are not logged in..."))}}]),t}(i.a.Component),V=a(150),X=a.n(V),G=a(260),z=a.n(G),$=new b.a.Namespace("http://xmlns.com/foaf/0.1/"),K=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).state={webId:e.webId,friendToAdd:"",canAddFriend:!1},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"changeFriendToAdd",value:function(e){var t=this,a=new XMLHttpRequest,n=e.target.value;a.onreadystatechange=function(){a.readyState===XMLHttpRequest.DONE&&(200===a.status?t.setState({friendToAdd:n,canAddFriend:!0}):t.setState({canAddFriend:!1}))},new RegExp(/(\w+(:\/\/){1})(\w+\.)(\w+\.)(\w+\/)+/g).test(e.target.value)&&(a.open("GET",n),a.send())}},{key:"addFriend",value:function(){var e=this.props.webId,t=this.state.friendToAdd;console.log(t);var a=b.a.graph(),n=new b.a.UpdateManager(a),i=b.a.st(b.a.sym(e),$("knows"),b.a.sym(t),b.a.sym(e).doc());n.update([],i,function(e,t,a){e?console.log("Changes have been applied, reload page to see them"):alert(a)})}},{key:"render",value:function(){return i.a.createElement("div",{style:{padding:"3%"}},i.a.createElement(X.a,{bg:"light",variant:"light",fixed:"top"},i.a.createElement(X.a.Brand,null,i.a.createElement("img",{src:"favicon.ico",width:"30",height:"30",alt:"Solid logo"}),i.a.createElement("span",{style:{marginLeft:"5%"}},"Solid Web")),i.a.createElement(z.a,{className:"mr-auto"},i.a.createElement(g.b,{to:"/",style:{color:"#000",marginLeft:"10%"}},"Overview"),i.a.createElement(g.b,{to:"/profile",style:{color:"#000",marginLeft:"10%"}},"Profile"),i.a.createElement(g.b,{to:"/contacts",style:{color:"#000",marginLeft:"10%"}},"Contacts"),i.a.createElement(g.b,{to:"/health",style:{color:"#000",marginLeft:"10%"}},"Health Data")),this.props.webId?"":i.a.createElement(w.a,{onClick:this.props.login},"Login")))}}]),t}(i.a.Component),Q=a(39),Z=(a(548),a(549),a(574)),ee=a(575),te=function(e){var t=e.request,a=t[0],n=t[1],o=t[2],r=t[3],s=t[4],l=t[5],c=t[11];return i.a.createElement("div",{className:"requestcard"},i.a.createElement("div",{className:"requestcard-header"},i.a.createElement("img",{className:"requestcard-header-avatar",src:o,alt:"avatar"}),i.a.createElement("strong",null,a)," wants to: ","Accepted"==c?i.a.createElement(w.e,{style:{color:"green",marginLeft:"20%"}},"Accepted"):""),r.map(function(t,a){return i.a.createElement("div",{className:"requestcard-request",key:a},i.a.createElement(Z.a,null,t),i.a.createElement(Z.a,null,i.a.createElement("p",{style:{color:"#00F"},onClick:e.onToggle,index:e.index},"More Information")),"Accepted"==c?i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"6"},i.a.createElement(w.a,{onClick:e.onRevoke,variant:"outlined",sender:n,notification:l,id:s},"Revoke"))):i.a.createElement("div",null,i.a.createElement(w.a,{className:"request\u0192card-request-button",variant:"outlined",sender:n,notification:l,id:s,onClick:e.onAccept},"Accept"),i.a.createElement(w.a,{className:"requestcard-request-button",variant:"outlined",sender:n,notification:l,id:s,onClick:e.onDeny},"Deny")))}))},ae=a(71),ne=a.n(ae),ie=a(263),oe=a.n(ie),re=a(576),se=function(e){var t=e.request,a=t[0],n=t[1],o=(t[2],t[3][0]),r=(t[4],t[5],t[6]),s=t[7],l=t[8],c=t[9],d=t[10],u=t[12],m=t[13],h=c?i.a.createElement("p",{style:{color:"green"}},"Has provided a risk assesment"):i.a.createElement("p",{style:{color:"red"}},"Has not provided a risk assesment"),p=d?i.a.createElement("p",{style:{color:"green"}},"Has provided a linked data profile"):i.a.createElement("p",{style:{color:"red"}},"Has not provided an identity"),g=""!==u&&""!==m?i.a.createElement("p",{style:{color:"green"}},"Has provided a expiring date to permisions"):i.a.createElement("p",{style:{color:"red"}},"Permission has no expiration");return i.a.createElement(ne.a,Object.assign({},e,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0}),i.a.createElement(ne.a.Header,{closeButton:!0},i.a.createElement(ne.a.Title,{id:"contained-modal-title-vcenter"},a+" wants to "+o)),i.a.createElement(ne.a.Body,null,i.a.createElement(re.a,null,i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:"5",style:{padding:"5%",backgroundColor:"rgb(248, 248, 248)",borderRadius:"8px",marginRight:"10px"}},i.a.createElement(ee.a,null,i.a.createElement("h4",{style:{color:"#3256D7"}},"General Information")),i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:"5"},"Request from:"),i.a.createElement(Z.a,{lg:"5"},n),i.a.createElement(Z.a,{lg:"1"})),i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:"5"},"Date of Request:"),i.a.createElement(Z.a,{lg:"5"},u),i.a.createElement(Z.a,{lg:"1"})),i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:"5"},"Expiration Date:"),i.a.createElement(Z.a,{lg:"5"},m),i.a.createElement(Z.a,{lg:"1"})),i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:"5"},"Type of Information:"),i.a.createElement(Z.a,{lg:"5"},r),i.a.createElement(Z.a,{lg:"1"})),i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:"5"},"Source:"),i.a.createElement(Z.a,{lg:"5"},n),i.a.createElement(Z.a,{lg:"1"})),i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:"5"},"Intent:"),i.a.createElement(Z.a,{lg:"5"},s),i.a.createElement(Z.a,{lg:"1"}))),i.a.createElement(Z.a,{lg:"5",style:{padding:"5%",backgroundColor:"rgb(248, 248, 248)",borderRadius:"8px",marginLeft:"10px"}},i.a.createElement(ee.a,null,i.a.createElement("h4",{style:{color:"#3256D7"}},"Possible Risks: ")),i.a.createElement(ee.a,null,i.a.createElement("p",{style:{color:"#333131"}},"By giving consent to this permission request I am aware that there might be:"," ")),l.map(function(e,t){return""!==e?i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:!0},i.a.createElement("li",null,e)),i.a.createElement(Z.a,{lg:"1"})):""}))),i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:!0,style:{padding:"5%",backgroundColor:"rgb(248, 248, 248)",borderRadius:"8px",marginTop:"10px"}},i.a.createElement(ee.a,null,i.a.createElement("h4",{style:{color:"#3256D7"}},"Evaluation: ")),i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:!0},h),i.a.createElement(Z.a,{lg:"1"})),i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:!0},p),i.a.createElement(Z.a,{lg:"1"})),i.a.createElement(ee.a,null,i.a.createElement(Z.a,{lg:"1"}),i.a.createElement(Z.a,{lg:!0},g),i.a.createElement(Z.a,{lg:"1"}))),i.a.createElement(Z.a,{lg:"1"})),i.a.createElement(ee.a,null))),i.a.createElement(ne.a.Footer,null,i.a.createElement(oe.a,{onClick:e.onHide},"Close")))},le=b.a.Namespace("http://www.w3.org/ns/ldp#"),ce=b.a.Namespace("http://www.w3.org/ns/auth/acl#"),de=b.a.Namespace("https://a-solid-web.github.io/permission-ontology/permissionrequests.rdf#"),ue=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).addRequest=a.addRequest.bind(Object(Q.a)(Object(Q.a)(a))),a.removeRequest=a.removeRequest.bind(Object(Q.a)(Object(Q.a)(a))),a.fetchNotificationAddresses=a.fetchNotificationAddresses.bind(Object(Q.a)(Object(Q.a)(a))),a.fetchNotification=a.fetchNotification.bind(Object(Q.a)(Object(Q.a)(a))),a.state={webId:a.props.webId,requests:[],currentRequest:0,showModal:!1},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"fetchNotificationAddresses",value:function(e){var t=this,a=b.a.graph(),n=new b.a.Fetcher(a),i=e.replace("profile/card#me","inbox");n.load(i).then(function(e){a.each(b.a.sym(i),le("contains")).forEach(function(e){var a=i+"/"+e.value.split("/")[3];t.fetchNotification(a)})})}},{key:"evaluateRisks",value:function(e){var t=!0;return e.forEach(function(e){""===e&&(t=!1)}),t}},{key:"fetchNotification",value:function(e){var t=this,a=b.a.graph();new b.a.Fetcher(a).load(e).then(function(n){var i=a.any(b.a.sym(e),de("requestFrom"));if(i){var o=a.any(b.a.sym(e),de("requestDataType")).value.split("#")[1],r=a.any(b.a.sym(e),de("requests")).value,s=a.any(b.a.sym(e),de("wasSentOn")),l=s?s.value:"",c=a.any(b.a.sym(e),de("expires")),d=c?c.value:"",u=a.any(b.a.sym(e),de("hasStatus")),m=u?u.value:"",h=a.any(b.a.sym(e),de("privacyRisklevel")),p=h?h.value:"",g=a.any(b.a.sym(e),de("financialRisklevel")),f=g?g.value:"",y=a.any(b.a.sym(e),de("legalRisklevel")),v=y?y.value:"",E=[p,f,v],w=t.evaluateRisks(E),k=a.any(b.a.sym(e),de("hasIntent")),N=k?k.value.split("#")[1]:"";if(N){var C=i.value.includes("profile/card#me");t.addRequest([i.value,i.value,"",["Access "+o+" ("+r+")"],r,e,o,N,[p,f,v],w,C,m,l,d])}}})}},{key:"acceptRequest",value:function(e){var t=this,a=e.target.id;console.log(a);var n=e.target.getAttribute("sender"),i=e.target.getAttribute("notification"),o=a+".acl",r=o+"#owner",s=o+"#viewer";console.log(r);var l=b.a.graph(),c=new b.a.Fetcher(l),d=new b.a.UpdateManager(l);c.load(o).then(function(e){var t=[b.a.st(b.a.sym(s),ce("agent"),b.a.sym(n),b.a.sym(s).doc())];d.update([],t,function(e,t,a){t?console.log("Added .acl triples"):console.log(a)})}).catch(function(e){var i=[b.a.st(b.a.sym(r),ce("agent"),b.a.sym(t.state.webId),b.a.sym(r).doc()),b.a.st(b.a.sym(r),ce("accessTo"),b.a.sym(a),b.a.sym(r).doc()),b.a.st(b.a.sym(r),ce("defaultForNew"),b.a.sym(a),b.a.sym(r).doc()),b.a.st(b.a.sym(r),ce("mode"),ce("Control"),b.a.sym(r).doc()),b.a.st(b.a.sym(r),ce("mode"),ce("Read"),b.a.sym(r).doc()),b.a.st(b.a.sym(r),ce("mode"),ce("Write"),b.a.sym(r).doc()),b.a.st(b.a.sym(s),ce("agent"),b.a.sym(n),b.a.sym(s).doc()),b.a.st(b.a.sym(s),ce("accessTo"),b.a.sym(a),b.a.sym(s).doc()),b.a.st(b.a.sym(s),ce("defaultForNew"),b.a.sym(a),b.a.sym(s).doc()),b.a.st(b.a.sym(s),ce("mode"),ce("Read"),b.a.sym(s).doc())];d.put(b.a.sym(o),i,"text/turtle",function(e,t,a){t?console.log("Added .acl triples"):console.log(a)})});var u=[b.a.st(b.a.sym(i),de("hasStatus"),b.a.lit(""),b.a.sym(i).doc())],m=[b.a.st(b.a.sym(i),de("hasStatus"),b.a.lit("Accepted"),b.a.sym(i).doc())];d.update(u,m,function(e,t,a){t?console.log("Added Accepted triple"):console.log(a),window.location="https://a-solid-web.github.io/profile-viewer-react/"})}},{key:"denyRequest",value:function(e){var t=e.target.getAttribute("notification"),a=b.a.graph(),n=(new b.a.Fetcher(a),new b.a.UpdateManager(a)),i=[b.a.st(b.a.sym(t),de("hasStatus"),b.a.lit(""),b.a.sym(t).doc())],o=[b.a.st(b.a.sym(t),de("hasStatus"),b.a.lit("Denied"),b.a.sym(t).doc())];n.update(i,o,function(e,t,a){t?window.location="https://a-solid-web.github.io/profile-viewer-react/":alert(a)})}},{key:"revokeRequest",value:function(e){var t=e.target.getAttribute("notification"),a=e.target.getAttribute("sender"),n=e.target.id+".acl"+"#viewer",i=b.a.graph(),o=(new b.a.Fetcher(i),new b.a.UpdateManager(i)),r=[b.a.st(b.a.sym(n),ce("agent"),b.a.sym(a),b.a.sym(n).doc())];o.update(r,[],function(e,t,a){t?console.log("Revoked access in .acl file"):console.log(a)});var s=[b.a.st(b.a.sym(t),de("hasStatus"),b.a.lit("Accepted"),b.a.sym(t).doc())],l=[b.a.st(b.a.sym(t),de("hasStatus"),b.a.lit(""),b.a.sym(t).doc())];o.update(s,l,function(e,t,a){t?window.location="https://a-solid-web.github.io/profile-viewer-react/":alert(a)})}},{key:"addNotification",value:function(e,t,a,n){this.state.requests.push()}},{key:"addRequest",value:function(e){var t=this.state.requests.slice();t.push(e),this.setState({requests:t})}},{key:"removeRequest",value:function(e){if(e===parseInt(e,10)){var t=this.state.requests.slice();t.splice(e,1),this.setState({requests:t})}else{var a=this.state.requests.slice().filter(function(t,a,n){return t!==e});this.setState({requests:a})}}},{key:"toggleModal",value:function(e){this.state.showModal||this.setState({showModal:!this.state.showModal,currentRequest:e.target.getAttribute("index")}),this.setState({showModal:!this.state.showModal})}},{key:"getRequests",value:function(){var e=this;return 0===this.state.requests.length?i.a.createElement("div",{className:"requestcard-request"},"Looks like you don't have any requests at the moment"):this.state.requests.map(function(t,a){return"Denied"!==t[11]?i.a.createElement(te,{key:a,index:a,request:t,onToggle:e.toggleModal.bind(e),onAccept:e.acceptRequest.bind(e),onDeny:e.denyRequest.bind(e),onRevoke:e.revokeRequest.bind(e)}):""})}},{key:"componentDidMount",value:function(){var e=this;v.a.trackSession(function(t){t?e.setState({webId:t.webId}):console.log("You are not logged in..."),e.fetchNotificationAddresses(e.state.webId)})}},{key:"render",value:function(){var e=this.getRequests();return i.a.createElement("div",{className:"grid-container",addrequest:this.addRequest,removerequest:this.removeRequest},i.a.createElement("div",{id:"toggle"},i.a.createElement("div",null,"Requests"),i.a.createElement("div",null,"Activity")),i.a.createElement("div",{className:"requestcards"},e),this.state.requests[this.state.currentRequest]?i.a.createElement(se,{show:this.state.showModal,onHide:this.toggleModal.bind(this),request:this.state.requests[this.state.currentRequest]}):"")}}]),t}(i.a.Component),me=function(e){return i.a.createElement(w.a,null,"Upload",i.a.createElement("input",{id:"upload",name:"upload",type:"file",onInput:e.onChange,style:{opacity:0}}))},he=b.a.Namespace("http://www.w3.org/ns/ldp#"),pe=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).state={webId:void 0,picture:void 0},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"uploadPic",value:function(e){var t=e.target.files[0],a=b.a.graph(),n=new b.a.Fetcher(a),i=this.state.webId,o=new FileReader;o.onload=function(){var e=this.result,a=encodeURIComponent(t.name),o=i.replace("/profile/card#me","/health/"+a);n.webOperation("PUT",o,{data:e,contentType:"image"})},o.readAsArrayBuffer(t),this.fetchPictures()}},{key:"fetchPictures",value:function(){var e=this,t=b.a.graph(),a=new b.a.Fetcher(t),n=this.state.webId.replace("profile/card#me","health/");a.load(n).then(function(a){var i=t.any(b.a.sym(n),he("contains"));e.setState({picture:i?i.value:""})})}},{key:"componentDidMount",value:function(){var e=this;v.a.trackSession(function(t){e.setState({webId:t.webId}),e.fetchPictures()})}},{key:"render",value:function(){var e=this.state.picture?i.a.createElement("img",{src:this.state.picture,alt:"Here is your medical data"}):"";return i.a.createElement(N.a,null,i.a.createElement(S.a,{lg:"1"}),i.a.createElement(S.a,{lg:"10"},i.a.createElement("div",{style:{margin:"5%"}},e),i.a.createElement(me,{onChange:this.uploadPic.bind(this)})),i.a.createElement(S.a,{lg:"1"}))}}]),t}(i.a.Component),ge=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).state={webId:void 0},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"fetchUser",value:function(){var e=this;v.a.trackSession(function(t){t?(console.log("You are logged in... Fetching your data now"),e.setState({webId:t.webId})):console.log("You are not logged in")})}},{key:"login",value:function(){var e=Object(c.a)(l.a.mark(function e(){var t;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.currentSession();case 2:if(t=e.sent){e.next=8;break}return e.next=6,v.a.login("https://solid.community");case 6:e.next=9;break;case 8:this.setState({webId:t.webID});case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"logout",value:function(){var e=Object(c.a)(l.a.mark(function e(){var t=this;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:v.a.logout().then(function(){t.setState({webId:void 0})});case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.fetchUser()}},{key:"render",value:function(){var e=this;return i.a.createElement(g.a,null,i.a.createElement("div",null,i.a.createElement(K,{login:this.login.bind(this),webId:this.state.webId}),i.a.createElement(f.c,null,i.a.createElement(f.a,{path:"/",render:function(){return i.a.createElement(ue,null)}}),i.a.createElement(f.a,{path:"/profile",render:function(){return i.a.createElement(P,{logout:e.logout.bind(e)})},exact:!0}),i.a.createElement(f.a,{path:"/health",render:function(){return i.a.createElement(pe,null)},exact:!0}),i.a.createElement(f.a,{path:"/contacts",render:function(){return i.a.createElement(_,null)},exact:!0}))))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(ge,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[265,1,2]]]);
//# sourceMappingURL=main.e4de1dd1.chunk.js.map