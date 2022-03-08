(window.webpackJsonp=window.webpackJsonp||[]).push([[18,7,17],{452:function(e,t,r){"use strict";var n=r(2),o=(r(43),r(57),r(219),r(11),r(5),r(13),r(52),r(136),r(10),r(12),r(17),r(18),r(14)),c=r(137),l=r(217);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function m(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var e=this,t=function(input){return input.$watch("hasError",(function(t){e.$set(e.errorBag,input._uid,t)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(input._uid)||(r.valid=t(input)))})):r.valid=t(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var e=this.inputs.find((function(i){return i._uid===input._uid}));if(e){var t=this.watchers.find((function(i){return i._uid===e._uid}));t&&(t.valid(),t.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==e._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:m({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},483:function(e,t,r){"use strict";r.r(t);var n=r(30),o=(r(113),r(114)),c=r.n(o),l={name:"create-role",data:function(){return{role:{name:""},valid:!0}},watch:{},mounted:function(){},methods:{createRole:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=3,c.a.post("http://127.0.0.1:8000/api/admin/roles",e.role,r).then((function(e){console.log(e)})).catch((function(e){console.log(e)}));case 3:case"end":return t.stop()}}),t)})))()},validate:function(){this.$refs.form.validate()}}},d=r(97),m=r(135),v=r.n(m),f=r(424),h=r(208),x=r(112),_=r(452),k=r(484),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",{staticStyle:{padding:"20px"},attrs:{elevation:"24",shaped:""}},[r("v-card-title",[e._v("Dodaj Ulogu")]),e._v(" "),r("v-form",{ref:"form",attrs:{enctype:"multipart/form-data","lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.createRole.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{name:"role",label:"Ime Uloge",required:""},model:{value:e.role.name,callback:function(t){e.$set(e.role,"name",t)},expression:"role.name"}}),e._v(" "),r("v-btn",{staticClass:"mr-4",attrs:{disabled:!e.valid,color:"success",type:"submit"},on:{click:e.validate}},[e._v("\n      Potvrdi\n    ")])],1)],1)}),[],!1,null,"4db6cb26",null);t.default=component.exports;v()(component,{VBtn:f.a,VCard:h.a,VCardTitle:x.d,VForm:_.a,VTextField:k.a})},490:function(e,t,r){var content=r(565);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(25).default)("00e4a2aa",content,!0,{sourceMap:!1})},498:function(e,t,r){"use strict";r.r(t);var n=r(30),o=(r(113),r(29),r(220),r(114),r(92));Object(o.d)("eager");var c={components:{ValidationObserver:o.a,ValidationProvider:o.b},name:"roles-table",data:function(){return{dialog:!1,dialogDelete:!1,headers:[{text:"Uloga",value:"name",align:"start"},{text:"Korisnika",value:"amount"},{text:"Actions",value:"actions",sortable:!1}],items:[],editedIndex:-1,editedName:"",editedItem:{name:"",amount:0},defaultItem:{name:"",amount:0},snackbar:!1,timeout:2e3,message:"",color:""}},mounted:function(){this.getRoles()},computed:{formTitle:function(){return-1===this.editedIndex?"Dodaj ulogu":"Uredi ulogu"}},watch:{dialog:function(e){e||this.close()},dialogDelete:function(e){e||this.closeDelete()}},methods:{getRoles:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.items=[],r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=4,e.$axios.$get("/admin/roles",r).then((function(t){for(var r=t,i=0;i<r.length;i++){var n={name:r[i].name,amount:0};e.items.push(n)}})).catch((function(e){console.log(e)}));case 4:return t.next=6,e.$axios.$get("/admin/users",r).then((function(t){console.log(t);for(var r=t[0],i=0;i<r.length;i++)for(var n=0;n<e.items.length;n++)r[i].role.name===e.items[n].name&&e.items[n].amount++})).catch((function(e){console.log(e)}));case 6:case"end":return t.stop()}}),t)})))()},deleteItem:function(e){this.editedIndex=this.items.indexOf(e),this.editedItem=Object.assign({},e),this.dialogDelete=!0},deleteItemConfirm:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=3,e.$axios.$delete("/admin/roles/"+e.items[e.editedIndex].name,r).then((function(t){console.log(t),e.message=t.message,e.color="success",e.snackbar=!0,e.getRoles()})).catch((function(t){console.log(t),e.message=t.message,e.color="error",e.snackbar=!0}));case 3:e.items.splice(e.editedIndex,1),e.closeDelete();case 5:case"end":return t.stop()}}),t)})))()},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},closeDelete:function(){var e=this;this.dialogDelete=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},save:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=3,e.$axios.$post("/admin/roles",e.editedItem,r).then((function(t){e.editedIndex>-1?Object.assign(e.items[e.editedIndex],e.editedItem):e.items.push(e.editedItem),e.message=t.message,e.color="success",e.snackbar=!0,e.getRoles(),console.log(t)})).catch((function(t){e.message=t.message,e.color="error",e.snackbar=!0,console.log(t)}));case 3:e.close();case 4:case"end":return t.stop()}}),t)})))()},editItem:function(e){this.editedIndex=this.items.indexOf(e),this.editedName=e.name,this.editedItem=Object.assign({},e),this.dialog=!0},update:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=3,e.$axios.$put("/admin/roles/"+e.editedName,e.editedItem,r).then((function(t){console.log(t),e.editedIndex>-1?Object.assign(e.items[e.editedIndex],e.editedItem):e.items.push(e.editedItem),e.message=t.message,e.color="success",e.snackbar=!0})).catch((function(t){console.log(t),e.message=t.message,e.color="success",e.snackbar=!0}));case 3:e.close();case 4:case"end":return t.stop()}}),t)})))()}}},l=r(97),d=r(135),m=r.n(d),v=r(424),f=r(208),h=r(112),x=r(438),_=r(445),k=r(583),I=r(581),w=r(427),V=r(423),O=r(442),y=r(453),$=r(443),j=r(484),D=r(73),R=r(450),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.items,"items-per-page":5},scopedSlots:e._u([{key:"top",fn:function(){return[r("v-toolbar",{attrs:{flat:""}},[r("v-toolbar-title",[e._v("Uloge")]),e._v(" "),r("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e._v(" "),r("v-spacer"),e._v(" "),r("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[r("v-btn",e._g(e._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",o,!1),n),[e._v("\n              Nova Uloga\n            ")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),r("v-card",[r("v-card-title",[r("span",{staticClass:"text-h5"},[e._v(e._s(e.formTitle))])]),e._v(" "),r("v-card-text",[r("v-container",[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("ValidationObserver",{ref:"observer"},[r("ValidationProvider",{attrs:{name:"name",rules:"required|max:100"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[r("v-text-field",{attrs:{counter:100,"error-messages":n,required:"",label:"Ime Uloge"},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})]}}])})],1)],1)],1)],1)],1),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v("\n                Odustani\n              ")]),e._v(" "),"Dodaj ulogu"===e.formTitle?r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.save}},[e._v("\n                Spremi\n              ")]):e._e(),e._v(" "),"Uredi ulogu"===e.formTitle?r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.update}},[e._v("\n                Spremi\n              ")]):e._e()],1)],1)],1),e._v(" "),r("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[r("v-card",[r("v-card-title",{staticClass:"text-h5"},[e._v("Are you sure you want to delete this item?")]),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),e._v(" "),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("OK")]),e._v(" "),r("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var n=t.item;return[r("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(n)}}},[e._v("\n        mdi-pencil\n      ")]),e._v(" "),r("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(n)}}},[e._v("\n        mdi-delete\n      ")])]}},{key:"no-data",fn:function(){return[r("v-btn",{attrs:{color:"primary"},on:{click:e.getRoles}},[e._v("\n        Reset\n      ")])]},proxy:!0}])}),e._v(" "),r("v-snackbar",{attrs:{outlined:"","multi-line":"",color:e.color,timeout:e.timeout,"content-class":"text-center"},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n    "+e._s(e.message)+"\n  ")])],1)}),[],!1,null,"0608bacd",null);t.default=component.exports;m()(component,{VBtn:v.a,VCard:f.a,VCardActions:h.a,VCardText:h.c,VCardTitle:h.d,VCol:x.a,VContainer:_.a,VDataTable:k.a,VDialog:I.a,VDivider:w.a,VIcon:V.a,VRow:O.a,VSnackbar:y.a,VSpacer:$.a,VTextField:j.a,VToolbar:D.a,VToolbarTitle:R.a})},499:function(e,t,r){"use strict";r.r(t);var n=r(30),o=(r(113),r(29),r(220),r(58),r(114),r(92));Object(o.d)("eager");var c={name:"users-table",components:{ValidationObserver:o.a,ValidationProvider:o.b},data:function(){return{dialog:!1,dialogDelete:!1,search:"",headers:[{text:"Korisnik",value:"name",align:"start"},{text:"E-Mail",value:"email"},{text:"Uloga",value:"role"},{text:"Kreiran",value:"created_at"},{text:"Podešen",value:"updated_at"},{text:"Akcije",value:"actions",sortable:!1}],roles:[],roles_ids:[],roles_names:[],selected_role:"",items:[],editedIndex:-1,editedEmail:"",editedItem:{name:"",email:"",password:"",password_confirmation:"",role_id:0},defaultItem:{name:"",email:"",password:"",password_confirmation:"",role_id:3},snackbar:!1,timeout:2e3,message:"",color:""}},mounted:function(){this.getUsers(),this.getRoles()},computed:{formTitle:function(){return-1===this.editedIndex?"Dodaj Korisnika":"Uredi Korisnika"}},watch:{dialog:function(e){e||this.close()},dialogDelete:function(e){e||this.closeDelete()},selected_role:function(e,t){console.log(e);for(var i=0;i<this.roles.length;i++)this.roles[i].name===e&&(this.editedItem.role_id=this.roles[i].id)}},methods:{getRoles:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.roles=[],e.roles_names=[],e.roles_ids=[],r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=6,e.$axios.$get("/admin/roles",r).then((function(t){var r=t;console.log(r);for(var i=0;i<r.length;i++)e.roles.push(r[i]),e.roles_names.push(r[i].name),e.roles_ids.push(r[i].id)})).catch((function(e){console.log(e)}));case 6:case"end":return t.stop()}}),t)})))()},getUsers:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.items=[],r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=4,e.$axios.$get("/admin/users",r).then((function(t){console.log(t);for(var r=t[0],i=0;i<r.length;i++){var n=new Date(r[i].created_at),o=new Date(r[i].updated_at),c={name:r[i].name,email:r[i].email,role:r[i].role.name,created_at:n.toLocaleDateString("hr-HR"),updated_at:o.toLocaleDateString("hr-HR")};e.items.push(c)}})).catch((function(e){console.log(e)}));case 4:case"end":return t.stop()}}),t)})))()},deleteItem:function(e){this.editedIndex=this.items.indexOf(e),this.editedItem=Object.assign({},e),this.dialogDelete=!0},deleteItemConfirm:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=3,e.$axios.$delete("/admin/users/"+e.items[e.editedIndex].email,r).then((function(t){e.message=t.message,e.color="success",e.snackbar=!0,e.getUsers(),e.getRoles()})).catch((function(t){e.message=t.message,e.color="error",e.snackbar=!0,console.log(t)}));case 3:e.items.splice(e.editedIndex,1),e.closeDelete();case 5:case"end":return t.stop()}}),t)})))()},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},closeDelete:function(){var e=this;this.dialogDelete=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},save:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=3,e.$axios.$post("/admin/register",e.editedItem,r).then((function(t){console.log(t),e.message="Uspiješna registracija novog korisnika",e.color="success",e.snackbar=!0,e.editedIndex>-1?Object.assign(e.items[e.editedIndex],e.editedItem):e.items.push(e.editedItem),e.getUsers(),e.getRoles()})).catch((function(t){for(var r in console.log(t.response),e.errors=t.response.errors,console.log(e.errors),e.errors)e.errors[r][0]=e.errors[r][0].charAt(0).toUpperCase()+e.errors[r][0].slice(1);for(var n in e.errors)e.$refs.observer.errors[n].push(e.errors[n][0]);e.message="Registracija neuspješna",e.color="error",e.snackbar=!0}));case 3:e.close();case 4:case"end":return t.stop()}}),t)})))()},editItem:function(e){this.editedIndex=this.items.indexOf(e),this.editedEmail=e.email,this.editedItem=Object.assign({},e),this.dialog=!0},update:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=3,e.$axios.$put("/admin/users/"+e.editedEmail,e.editedItem,r).then((function(t){console.log(t),e.editedIndex>-1?Object.assign(e.items[e.editedIndex],e.editedItem):e.items.push(e.editedItem),e.message=t.message,e.color="success",e.snackbar=!0,e.getUsers(),e.getRoles()})).catch((function(t){console.log(t),e.message=t.message,e.color="error",e.snackbar=!0}));case 3:e.close();case 4:case"end":return t.stop()}}),t)})))()}}},l=r(97),d=r(135),m=r.n(d),v=r(424),f=r(208),h=r(112),x=r(438),_=r(445),k=r(583),I=r(581),w=r(427),V=r(423),O=r(442),y=r(501),$=r(453),j=r(443),D=r(484),R=r(73),C=r(450),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.items,"items-per-page":5,search:e.search},scopedSlots:e._u([{key:"top",fn:function(){return[r("v-toolbar",{attrs:{flat:""}},[r("v-toolbar-title",[e._v("\n          Korisnici\n        ")]),e._v(" "),r("v-spacer"),e._v(" "),r("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Pretraži","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),r("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e._v(" "),r("v-spacer"),e._v(" "),r("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[r("v-btn",e._g(e._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",o,!1),n),[e._v("\n              Novi Korisnik\n            ")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),r("v-card",[r("v-card-title",[r("span",{staticClass:"text-h5"},[e._v(e._s(e.formTitle))])]),e._v(" "),r("v-card-text",[r("v-container",[r("v-row",[r("v-col",{attrs:{cols:"12",sm:"6",md:"12"}},[r("ValidationObserver",{ref:"observer"},[r("ValidationProvider",{attrs:{name:"Ime i prezime",rules:"required|max:100"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[r("v-text-field",{attrs:{counter:100,"error-messages":n,label:"Ime i Prezime",required:""},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})]}}])}),e._v(" "),r("ValidationProvider",{attrs:{name:"email",rules:"required|email"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[r("v-text-field",{attrs:{type:"email","error-messages":n,label:"E-mail",required:""},model:{value:e.editedItem.email,callback:function(t){e.$set(e.editedItem,"email",t)},expression:"editedItem.email"}})]}}])}),e._v(" "),r("ValidationProvider",{attrs:{name:"Zaporka",rules:"min:6|required|confirmed:confirmation"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[r("v-text-field",{attrs:{type:"password","error-messages":n,label:"Zaporka"},model:{value:e.editedItem.password,callback:function(t){e.$set(e.editedItem,"password",t)},expression:"editedItem.password"}})]}}])}),e._v(" "),r("ValidationProvider",{attrs:{rules:"min:6|required",name:"Potvrda zaporke",vid:"confirmation"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[r("v-text-field",{attrs:{type:"password","error-messages":n,label:"Potvrda zaporke"},model:{value:e.editedItem.password_confirmation,callback:function(t){e.$set(e.editedItem,"password_confirmation",t)},expression:"editedItem.password_confirmation"}})]}}])}),e._v(" "),r("ValidationProvider",{attrs:{name:"Uloga"}},[r("v-select",{attrs:{items:e.roles_names,label:"Uloga"},model:{value:e.selected_role,callback:function(t){e.selected_role=t},expression:"selected_role"}})],1)],1)],1)],1)],1)],1),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v("\n                Odustani\n              ")]),e._v(" "),"Dodaj Korisnika"===e.formTitle?r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.save}},[e._v("\n                Spremi\n              ")]):e._e(),e._v(" "),"Uredi Korisnika"===e.formTitle?r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.update}},[e._v("\n                Spremi\n              ")]):e._e()],1)],1)],1),e._v(" "),r("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[r("v-card",[r("v-card-title",{staticClass:"text-h5"},[e._v("Jeste li sigurni da želite pobristavi ovog korisnika?")]),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Poništi")]),e._v(" "),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("Potvrdi")]),e._v(" "),r("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var n=t.item;return[r("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(n)}}},[e._v("\n        mdi-pencil\n      ")]),e._v(" "),r("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(n)}}},[e._v("\n        mdi-delete\n      ")])]}},{key:"no-data",fn:function(){return[r("v-btn",{attrs:{color:"primary"},on:{click:e.getRoles}},[e._v("\n        Reset\n      ")])]},proxy:!0}])}),e._v(" "),r("v-snackbar",{attrs:{outlined:"","multi-line":"",color:e.color,timeout:e.timeout,"content-class":"text-center"},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n    "+e._s(e.message)+"\n  ")])],1)}),[],!1,null,"c203b0fe",null);t.default=component.exports;m()(component,{VBtn:v.a,VCard:f.a,VCardActions:h.a,VCardText:h.c,VCardTitle:h.d,VCol:x.a,VContainer:_.a,VDataTable:k.a,VDialog:I.a,VDivider:w.a,VIcon:V.a,VRow:O.a,VSelect:y.a,VSnackbar:$.a,VSpacer:j.a,VTextField:D.a,VToolbar:R.a,VToolbarTitle:C.a})},500:function(e,t,r){"use strict";r.r(t);var n=r(30),o=(r(29),r(12),r(67),r(220),r(113),r(114),r(92));Object(o.d)("eager");var c={name:"jobs-table",components:{ValidationObserver:o.a,ValidationProvider:o.b},data:function(){return{dialog:!1,dialogDelete:!1,search:"",headers:[{text:"Posao",value:"name",align:"start"},{text:"ID",value:"id",align:" d-none"},{text:"Opis",value:"description",width:"20%"},{text:"Korisnik",value:"user"},{text:"Actions",value:"actions",sortable:!1}],items:[],editedIndex:-1,editedName:"",editedItem:{name:"",description:"",selection:[]},defaultItem:{name:"",description:"",user:""},snackbar:!1,timeout:2e3,message:"",color:"",services:[]}},mounted:function(){this.getJobs(),this.getServices()},computed:{formTitle:function(){return-1===this.editedIndex?"Dodaj posao":"Uredi posao"}},watch:{dialog:function(e){e||this.close()},dialogDelete:function(e){e||this.closeDelete()}},methods:{getServices:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("/services",e.config).then((function(t){e.services=t,console.log("Servisi: "),console.log(e.services)})).catch((function(e){console.log(e)}));case 2:case"end":return t.stop()}}),t)})))()},getJobs:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,i,o,c,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=3,e.$axios.$get("/jobs",r).then((function(e){n=e,console.log(e)})).catch((function(e){console.log(e)}));case 3:i=0;case 4:if(!(i<n.length)){t.next=14;break}return o=void 0,c=n[i].user_id,t.next=9,e.$axios.$get("/user/"+c,r).then((function(e){o=e.name})).catch((function(e){console.log(e)}));case 9:l={name:n[i].name,ID:n[i].id,description:n[i].description,user:o},e.items.push(l);case 11:i++,t.next=4;break;case 14:case"end":return t.stop()}}),t)})))()},deleteItem:function(e){this.editedIndex=this.items.indexOf(e),this.editedItem=Object.assign({},e),this.dialogDelete=!0},deleteItemConfirm:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=3,e.$axios.$delete("/admin/job/"+e.items[e.editedIndex].ID,r).then((function(t){console.log(t),e.message=t.message,e.color="success",e.snackbar=!0,e.getJobs()})).catch((function(t){console.log(t),e.message=t.message,e.color="error",e.snackbar=!0}));case 3:e.items.splice(e.editedIndex,1),e.closeDelete();case 5:case"end":return t.stop()}}),t)})))()},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},closeDelete:function(){var e=this;this.dialogDelete=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},editItem:function(e){this.editedIndex=this.items.indexOf(e),this.editedName=e.name,this.editedItem=Object.assign({},e),this.dialog=!0},update:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{Authorization:e.$auth.strategy.token.get()}},t.next=3,e.$axios.$put("/admin/job/"+e.editedItem.ID,e.editedItem,r).then((function(t){console.log("Posa update: "),console.log(t),e.editedIndex>-1?Object.assign(e.items[e.editedIndex],e.editedItem):e.items.push(e.editedItem),e.message=t.message,e.color="success",e.snackbar=!0})).catch((function(t){console.log(t),e.message=t.message,e.color="error",e.snackbar=!0}));case 3:e.close();case 4:case"end":return t.stop()}}),t)})))()}}},l=r(97),d=r(135),m=r.n(d),v=r(424),f=r(208),h=r(112),x=r(438),_=r(445),k=r(583),I=r(581),w=r(427),V=r(423),O=r(442),y=r(453),$=r(443),j=r(484),D=r(73),R=r(450),C=r(594),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-data-table",{staticClass:"elevation-1 my-table",attrs:{headers:e.headers,items:e.items,"items-per-page":5,search:e.search},scopedSlots:e._u([{key:"top",fn:function(){return[r("v-toolbar",{attrs:{flat:""}},[r("v-toolbar-title",[e._v("Poslovi")]),e._v(" "),r("v-spacer"),e._v(" "),r("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Pretraži","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),r("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e._v(" "),r("v-spacer"),e._v(" "),r("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[r("v-card",[r("v-card-title",[r("span",{staticClass:"text-h5"},[e._v(e._s(e.formTitle))])]),e._v(" "),r("v-card-text",[r("v-container",[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("ValidationObserver",{ref:"observer"},[r("ValidationProvider",{attrs:{name:"name",rules:"required|max:100"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[r("v-text-field",{attrs:{counter:100,"error-messages":n,label:"Ime Posla"},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})]}}])}),e._v(" "),r("ValidationProvider",{attrs:{name:"Opis posla",rules:"required|max:1000"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[r("v-text-field",{attrs:{counter:1e3,"error-messages":n,label:"Opis posla"},model:{value:e.editedItem.description,callback:function(t){e.$set(e.editedItem,"description",t)},expression:"editedItem.description"}})]}}])})],1),e._v(" "),r("v-treeview",{attrs:{items:e.services,selectable:"","selection-type":"independent","selected-color":"primary",hoverable:"","item-key":"id","open-on-click":""},model:{value:e.editedItem.selection,callback:function(t){e.$set(e.editedItem,"selection",t)},expression:"editedItem.selection"}})],1)],1)],1)],1),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v("\n                Odustani\n              ")]),e._v(" "),"Uredi posao"===e.formTitle?r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.update}},[e._v("\n                Spremi\n              ")]):e._e()],1)],1)],1),e._v(" "),r("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[r("v-card",[r("v-card-title",{staticClass:"text-h5"},[e._v("Jeste li sigurni da želite pobrisati ovaj posao?")]),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),e._v(" "),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("OK")]),e._v(" "),r("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var n=t.item;return[r("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(n)}}},[e._v("\n        mdi-pencil\n      ")]),e._v(" "),r("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(n)}}},[e._v("\n        mdi-delete\n      ")])]}},{key:"no-data",fn:function(){return[r("v-btn",{attrs:{color:"primary"},on:{click:e.getJobs}},[e._v("\n        Reset\n      ")])]},proxy:!0}])}),e._v(" "),r("v-snackbar",{attrs:{outlined:"","multi-line":"",color:e.color,timeout:e.timeout,"content-class":"text-center"},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n    "+e._s(e.message)+"\n  ")])],1)}),[],!1,null,"7e96aef7",null);t.default=component.exports;m()(component,{VBtn:v.a,VCard:f.a,VCardActions:h.a,VCardText:h.c,VCardTitle:h.d,VCol:x.a,VContainer:_.a,VDataTable:k.a,VDialog:I.a,VDivider:w.a,VIcon:V.a,VRow:O.a,VSnackbar:y.a,VSpacer:$.a,VTextField:j.a,VToolbar:D.a,VToolbarTitle:R.a,VTreeview:C.a})},564:function(e,t,r){"use strict";r(490)},565:function(e,t,r){var n=r(24)(!1);n.push([e.i,"td[data-v-57ca02ca]{background-color:#3f51b5}",""]),e.exports=n},592:function(e,t,r){"use strict";r.r(t);var n=r(483),o=r(498),c=r(499),l={name:"manager",components:{JobsTable:r(500).default,UsersTable:c.default,RolesTable:o.default,CreateRole:n.default,Create:n.default},middleware:function(e){var t=e.redirect;1===e.$auth.$state.user.role_id||t("/")}},d=(r(564),r(97)),m=r(135),v=r.n(m),f=r(445),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("users-table"),e._v(" "),r("roles-table"),e._v(" "),r("jobs-table")],1)}),[],!1,null,"57ca02ca",null);t.default=component.exports;v()(component,{VContainer:f.a})}}]);