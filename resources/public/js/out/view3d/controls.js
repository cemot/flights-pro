// Compiled by ClojureScript 1.9.293 {}
goog.provide('view3d.controls');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('goog.string.format');
view3d.controls.format = (function view3d$controls$format(var_args){
var args__21507__auto__ = [];
var len__21500__auto___26427 = arguments.length;
var i__21501__auto___26428 = (0);
while(true){
if((i__21501__auto___26428 < len__21500__auto___26427)){
args__21507__auto__.push((arguments[i__21501__auto___26428]));

var G__26429 = (i__21501__auto___26428 + (1));
i__21501__auto___26428 = G__26429;
continue;
} else {
}
break;
}

var argseq__21508__auto__ = ((((1) < args__21507__auto__.length))?(new cljs.core.IndexedSeq(args__21507__auto__.slice((1)),(0),null)):null);
return view3d.controls.format.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__21508__auto__);
});

view3d.controls.format.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,args){
return cljs.core.apply.call(null,goog.string.format,fmt,args);
});

view3d.controls.format.cljs$lang$maxFixedArity = (1);

view3d.controls.format.cljs$lang$applyTo = (function (seq26425){
var G__26426 = cljs.core.first.call(null,seq26425);
var seq26425__$1 = cljs.core.next.call(null,seq26425);
return view3d.controls.format.cljs$core$IFn$_invoke$arity$variadic(G__26426,seq26425__$1);
});

view3d.controls.by_id = (function view3d$controls$by_id(id){
return document.getElementById(id);
});
view3d.controls.get_value = (function view3d$controls$get_value(id){
return view3d.controls.by_id.call(null,id).value;
});
view3d.controls.get_html = (function view3d$controls$get_html(id){
return view3d.controls.by_id.call(null,id).innerHTML;
});
view3d.controls.set_html_BANG_ = (function view3d$controls$set_html_BANG_(id,msg){
return view3d.controls.by_id.call(null,id).innerHTML = msg;
});
view3d.controls.left_controls = (function view3d$controls$left_controls(){
view3d.controls.set_html_BANG_.call(null,"camera","<h4>Camera</h4>");

view3d.controls.set_html_BANG_.call(null,"onboard","Onboard:");

view3d.controls.set_html_BANG_.call(null,"onboard-fld","<select onchange='javascript:view3d.client.onboard(this.value)' style='width:96px'>\n   <option value='callsign'>callsign</option>\n   <option value='manual'>manual</option>\n   <option value='select'>select</option>");

view3d.controls.set_html_BANG_.call(null,"view","View:");

view3d.controls.set_html_BANG_.call(null,"view-fld","<select onchange='javascript:view3d.client.view(this.value)' style='width:96px'>\n   <option value='FORWARD'>FORWARD</option>\n   <option value='BACKWARD'>BACKWARD</option>\n   <option value='RIGHT'>RIGHT</option>\n   <option value='LEFT'>LEFT</option>\n   <option value='UP'>UP</option>\n   <option value='DOWN'>DOWN</option>\n   <option value='FORWARD-RIGHT'>FORWARD-RIGHT</option>\n   <option value='FORWARD-LEFT'>FORWARD-LEFT</option>\n   <option value='BACKWARD-RIGHT'>BACKWARD-RIGHT</option>\n   <option value='BACKWARD-LEFT'>BACKWARD-LEFT</option>\n   </select>");

view3d.controls.set_html_BANG_.call(null,"pitch","Pitch:");

view3d.controls.set_html_BANG_.call(null,"pitch-fld","<input value='-20' style='width:90px'\n               onchange='javascript:view3d.client.pitch(this.value)'>");

view3d.controls.set_html_BANG_.call(null,"roll","Roll:");

return view3d.controls.set_html_BANG_.call(null,"roll-fld","<input value='0' style='width:90px'\n               onchange='javascript:view3d.client.roll(this.value)'>");
});
view3d.controls.right_controls = (function view3d$controls$right_controls(){
view3d.controls.set_html_BANG_.call(null,"autopilot","<h4>Autopilot</h4>");

view3d.controls.set_html_BANG_.call(null,"accel","accel");

view3d.controls.set_html_BANG_.call(null,"course","Course: 000");

view3d.controls.set_html_BANG_.call(null,"course-fld","<input value='180' style='width:38px' id='input-crs'\n                     onchange='javascript:view3d.client.course(this.value)'>");

view3d.controls.set_html_BANG_.call(null,"speed","Speed: 000");

view3d.controls.set_html_BANG_.call(null,"speed-fld","<input value='210' style='width:38px' id='input-spd'\n               onchange='javascript:view3d.client.speed(this.value)'>");

view3d.controls.set_html_BANG_.call(null,"speed-acl",[cljs.core.str("<select style='width:44px'\n                onchange='javascript:view3d.client.accel_speed(this.value)'>"),cljs.core.str(cljs.core.apply.call(null,cljs.core.str,(function (){var iter__21175__auto__ = (function view3d$controls$right_controls_$_iter__26438(s__26439){
return (new cljs.core.LazySeq(null,(function (){
var s__26439__$1 = s__26439;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__26439__$1);
if(temp__4657__auto__){
var s__26439__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__26439__$2)){
var c__21173__auto__ = cljs.core.chunk_first.call(null,s__26439__$2);
var size__21174__auto__ = cljs.core.count.call(null,c__21173__auto__);
var b__26441 = cljs.core.chunk_buffer.call(null,size__21174__auto__);
if((function (){var i__26440 = (0);
while(true){
if((i__26440 < size__21174__auto__)){
var n = cljs.core._nth.call(null,c__21173__auto__,i__26440);
cljs.core.chunk_append.call(null,b__26441,[cljs.core.str("<option value='"),cljs.core.str(n),cljs.core.str("'>"),cljs.core.str(n),cljs.core.str("</option>")].join(''));

var G__26446 = (i__26440 + (1));
i__26440 = G__26446;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26441),view3d$controls$right_controls_$_iter__26438.call(null,cljs.core.chunk_rest.call(null,s__26439__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26441),null);
}
} else {
var n = cljs.core.first.call(null,s__26439__$2);
return cljs.core.cons.call(null,[cljs.core.str("<option value='"),cljs.core.str(n),cljs.core.str("'>"),cljs.core.str(n),cljs.core.str("</option>")].join(''),view3d$controls$right_controls_$_iter__26438.call(null,cljs.core.rest.call(null,s__26439__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__21175__auto__.call(null,cljs.core.range.call(null,(1),(11)));
})()))].join(''));

view3d.controls.set_html_BANG_.call(null,"altitude","Altitude: 00000");

view3d.controls.set_html_BANG_.call(null,"altitude-fld","<input value='4000' style='width:38px' id='input-alt'\n               onchange='javascript:view3d.client.altitude(this.value)'>");

view3d.controls.set_html_BANG_.call(null,"altitude-acl",[cljs.core.str("<select style='width:44px'\n                onchange='javascript:view3d.client.accel_altitude(this.value)'>"),cljs.core.str(cljs.core.apply.call(null,cljs.core.str,(function (){var iter__21175__auto__ = (function view3d$controls$right_controls_$_iter__26442(s__26443){
return (new cljs.core.LazySeq(null,(function (){
var s__26443__$1 = s__26443;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__26443__$1);
if(temp__4657__auto__){
var s__26443__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__26443__$2)){
var c__21173__auto__ = cljs.core.chunk_first.call(null,s__26443__$2);
var size__21174__auto__ = cljs.core.count.call(null,c__21173__auto__);
var b__26445 = cljs.core.chunk_buffer.call(null,size__21174__auto__);
if((function (){var i__26444 = (0);
while(true){
if((i__26444 < size__21174__auto__)){
var n = cljs.core._nth.call(null,c__21173__auto__,i__26444);
cljs.core.chunk_append.call(null,b__26445,[cljs.core.str("<option value='"),cljs.core.str(n),cljs.core.str("'>"),cljs.core.str(n),cljs.core.str("</option>")].join(''));

var G__26447 = (i__26444 + (1));
i__26444 = G__26447;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26445),view3d$controls$right_controls_$_iter__26442.call(null,cljs.core.chunk_rest.call(null,s__26443__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26445),null);
}
} else {
var n = cljs.core.first.call(null,s__26443__$2);
return cljs.core.cons.call(null,[cljs.core.str("<option value='"),cljs.core.str(n),cljs.core.str("'>"),cljs.core.str(n),cljs.core.str("</option>")].join(''),view3d$controls$right_controls_$_iter__26442.call(null,cljs.core.rest.call(null,s__26443__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__21175__auto__.call(null,cljs.core.range.call(null,(1),(11)));
})()))].join(''));

view3d.controls.set_html_BANG_.call(null,"lat","Latitude: 00.0000");

view3d.controls.set_html_BANG_.call(null,"latitude-fld","<input value='40.8' style='width:84px' id='input-lat'\n               onchange='javascript:view3d.client.latitude(this.value)'>");

view3d.controls.set_html_BANG_.call(null,"lon","Longitude: 00.0000");

return view3d.controls.set_html_BANG_.call(null,"longitude-fld","<input value='-74.0' style='width:84px' id='input-lon'\n               onchange='javascript:view3d.client.longitude(this.value)'>");
});
view3d.controls.show_controls = (function view3d$controls$show_controls(){
view3d.controls.left_controls.call(null);

return view3d.controls.right_controls.call(null);
});
view3d.controls.show_flight_data = (function view3d$controls$show_flight_data(carr__$1){
var map__26450 = cljs.core.deref.call(null,carr__$1);
var map__26450__$1 = ((((!((map__26450 == null)))?((((map__26450.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__26450.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26450):map__26450);
var coord = cljs.core.get.call(null,map__26450__$1,new cljs.core.Keyword(null,"coord","coord",-1453656639));
var course = cljs.core.get.call(null,map__26450__$1,new cljs.core.Keyword(null,"course","course",1455432948));
var speed = cljs.core.get.call(null,map__26450__$1,new cljs.core.Keyword(null,"speed","speed",1257663751));
var altitude = cljs.core.get.call(null,map__26450__$1,new cljs.core.Keyword(null,"altitude","altitude",463588637));
var spd = (speed | (0));
view3d.controls.set_html_BANG_.call(null,"course",[cljs.core.str("Course: "),cljs.core.str(course)].join(''));

view3d.controls.set_html_BANG_.call(null,"speed",[cljs.core.str("Speed: "),cljs.core.str(spd)].join(''));

view3d.controls.set_html_BANG_.call(null,"altitude",[cljs.core.str("Altitude: "),cljs.core.str((((spd < (100)))?(0):(altitude | (0))))].join(''));

view3d.controls.set_html_BANG_.call(null,"lat",[cljs.core.str("Latitude: "),cljs.core.str(view3d.controls.format.call(null,"%.4f",cljs.core.first.call(null,coord)))].join(''));

return view3d.controls.set_html_BANG_.call(null,"lon",[cljs.core.str("Longitude: "),cljs.core.str(view3d.controls.format.call(null,"%.4f",cljs.core.second.call(null,coord)))].join(''));
});
view3d.controls.callsigns = (function view3d$controls$callsigns(list){
return view3d.controls.set_html_BANG_.call(null,"onboard-fld",[cljs.core.str("<select onchange='javascript:view3d.client.onboard(this.value)' style='width:96px'>"),cljs.core.str(((cljs.core.empty_QMARK_.call(null,list))?[cljs.core.str("<option value='callsign'>callsign</option>\n                   <option value='select'>select</option>")].join(''):[cljs.core.str("<option value='select'>select</option>"),cljs.core.str(cljs.core.apply.call(null,cljs.core.str,(function (){var iter__21175__auto__ = (function view3d$controls$callsigns_$_iter__26456(s__26457){
return (new cljs.core.LazySeq(null,(function (){
var s__26457__$1 = s__26457;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__26457__$1);
if(temp__4657__auto__){
var s__26457__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__26457__$2)){
var c__21173__auto__ = cljs.core.chunk_first.call(null,s__26457__$2);
var size__21174__auto__ = cljs.core.count.call(null,c__21173__auto__);
var b__26459 = cljs.core.chunk_buffer.call(null,size__21174__auto__);
if((function (){var i__26458 = (0);
while(true){
if((i__26458 < size__21174__auto__)){
var e = cljs.core._nth.call(null,c__21173__auto__,i__26458);
cljs.core.chunk_append.call(null,b__26459,[cljs.core.str("<option value='"),cljs.core.str(e),cljs.core.str("'>"),cljs.core.str(e),cljs.core.str("</option>")].join(''));

var G__26460 = (i__26458 + (1));
i__26458 = G__26460;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26459),view3d$controls$callsigns_$_iter__26456.call(null,cljs.core.chunk_rest.call(null,s__26457__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26459),null);
}
} else {
var e = cljs.core.first.call(null,s__26457__$2);
return cljs.core.cons.call(null,[cljs.core.str("<option value='"),cljs.core.str(e),cljs.core.str("'>"),cljs.core.str(e),cljs.core.str("</option>")].join(''),view3d$controls$callsigns_$_iter__26456.call(null,cljs.core.rest.call(null,s__26457__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__21175__auto__.call(null,list);
})()))].join(''))),cljs.core.str("</select>")].join(''));
});

//# sourceMappingURL=controls.js.map