// Compiled by ClojureScript 1.9.293 {}
goog.provide('czm.core');
goog.require('cljs.core');
goog.require('calc.dynamic');
czm.core.TERR_PROV = (new Cesium.CesiumTerrainProvider(({"url": "//assets.agi.com/stk-terrain/world", "requestWaterMask": false, "requestVertexNormals": false})));
czm.core.VIEWER = (new Cesium.Viewer("cesiumContainer",({"animation": false})));
czm.core.CZM_SRC = (new Cesium.CzmlDataSource());
czm.core.CAMERA = cljs.core.volatile_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"view","view",1247994814),"FORWARD",new cljs.core.Keyword(null,"pitch","pitch",1495126700),(0),new cljs.core.Keyword(null,"roll","roll",11266999),(0)], null));
czm.core.norm_crs = (function czm$core$norm_crs(x){
if((x > (360))){
return (x - (360));
} else {
if((x < (0))){
return (x + (360));
} else {
return x;

}
}
});
czm.core.cz_processor = (function czm$core$cz_processor(e){
var data = e.data;
var data__$1 = JSON.parse(data);
return czm.core.CZM_SRC.process(data__$1);
});
czm.core.fly_control = (function czm$core$fly_control(lat,lon,alt,hea,pit,rol,per){
var dest = Cesium.Cartesian3.fromDegrees(lon,lat,alt);
return czm.core.VIEWER.camera.flyTo(({"destination": dest, "orientation": ({"heading": Cesium.Math.toRadians(hea), "pitch": Cesium.Math.toRadians(pit), "roll": Cesium.Math.toRadians(rol)}), "duration": per, "easingFunction": ((function (dest){
return (function (time){
return time;
});})(dest))
}));
});
czm.core.fly_to = (function czm$core$fly_to(lat,lon,alt,crs,per){
var pitch = (function (){var pred__22003 = cljs.core._EQ_;
var expr__22004 = new cljs.core.Keyword(null,"view","view",1247994814).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,czm.core.CAMERA));
if(cljs.core.truth_(pred__22003.call(null,"UP",expr__22004))){
return (90);
} else {
if(cljs.core.truth_(pred__22003.call(null,"DOWN",expr__22004))){
return (-90);
} else {
return new cljs.core.Keyword(null,"pitch","pitch",1495126700).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,czm.core.CAMERA));
}
}
})();
var roll = new cljs.core.Keyword(null,"roll","roll",11266999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,czm.core.CAMERA));
var head = calc.dynamic.norm_crs.call(null,(function (){var pred__22006 = cljs.core._EQ_;
var expr__22007 = new cljs.core.Keyword(null,"view","view",1247994814).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,czm.core.CAMERA));
if(cljs.core.truth_(pred__22006.call(null,"BACKWARD",expr__22007))){
return (crs + (180));
} else {
if(cljs.core.truth_(pred__22006.call(null,"RIGHT",expr__22007))){
return (crs + (90));
} else {
if(cljs.core.truth_(pred__22006.call(null,"LEFT",expr__22007))){
return (crs - (90));
} else {
if(cljs.core.truth_(pred__22006.call(null,"FORWARD-RIGHT",expr__22007))){
return (crs + (45));
} else {
if(cljs.core.truth_(pred__22006.call(null,"FORWARD-LEFT",expr__22007))){
return (crs - (45));
} else {
if(cljs.core.truth_(pred__22006.call(null,"BACKWARD-RIGHT",expr__22007))){
return (crs + (135));
} else {
if(cljs.core.truth_(pred__22006.call(null,"BACKWARD-LEFT",expr__22007))){
return (crs - (135));
} else {
return crs;
}
}
}
}
}
}
}
})());
return czm.core.fly_control.call(null,lat,lon,alt,head,pitch,roll,per);
});
czm.core.camera = (function czm$core$camera(key,val){
return cljs.core._vreset_BANG_.call(null,czm.core.CAMERA,cljs.core.assoc.call(null,cljs.core._deref.call(null,czm.core.CAMERA),key,val));
});
czm.core.init_3D_view = (function czm$core$init_3D_view(base_url,terra){
if(cljs.core._EQ_.call(null,terra,new cljs.core.Keyword(null,"terrain","terrain",704966005))){
czm.core.VIEWER.terrainProvider = czm.core.TERR_PROV;
} else {
}

czm.core.VIEWER.dataSources.add(czm.core.CZM_SRC);

(new EventSource([cljs.core.str(base_url),cljs.core.str("czml/")].join(''))).addEventListener("czml",czm.core.cz_processor,false);

return cljs.core.println.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"INIT-3D-VIEW","INIT-3D-VIEW",-1398074686),new cljs.core.Keyword(null,"BASE","BASE",146158779),base_url,new cljs.core.Keyword(null,"TERRA","TERRA",2001561299),terra], null));
});

//# sourceMappingURL=core.js.map