(ns wiki.gis
(:use
  protege.core
  geo.names)
(:import
  javax.swing.JOptionPane))

(def TIMEOUT 15000)
(defmacro with-timeout [msec & body]
  `(let [f# (future (do ~@body))
         v# (gensym)
         result# (deref f# ~msec v#)]
    (if (= v# result#)
      (do
        (println :FUTURE-CANCELLING)
        (future-cancel f#)
        (println :FUTURE-CANCELLED)
        nil)
      result#)))

(defn request-lang [sv]
  (let [spl (.split sv "-")]
  (aget spl 1)))

(defn article-from-map [mp typ]
  (if-let [ins (fifos typ "title" (mp "title"))]
  (delin ins))
(mti (assoc mp :DIRTYP typ :DEPTH 0)))

(defn bbx-of-list
  ;; crds = ([lat lon]..)
([crds title]
  ;; return instance of BBX class
  (if-let [wsen (bbx-of-list  crds)]
    (let [ins (crin "BBX")]
       (ssv ins "title" title)
       (ssvs ins "wsen" wsen)
       ins)))
([crds]
  ;; return [west south east north] or nil
  (try
    (letfn [(apl [mx fst]
	(float (apply mx (map fst crds))))]
      [(apl min second) (apl min first) (apl max second) (apl max first)])
  (catch Exception e
     (println [:bbx-of-list crds :exception e])
     nil))))

(defn submit-bbx
  ([hm inst]
  (let [mp (into {} hm)
         max (mp "max-responses")
         lang (request-lang (mp "language"))
         [west south east north] (seq (svs (mp "bbx") "wsen"))]
    (ssvs inst "responses" 
      (if-let [resp (with-timeout TIMEOUT
	   (call-wiki-bbx north west south east max lang))]
        (filter some? (map #(article-from-map % "WikiArticle") resp))
        [])) ))
([inst bbx-title bbx]
  (if-let [bbx-inst (fifos "BBX" "title" bbx-title)]
    (ssv inst "bbx" bbx-inst)
    (let [[w s e n] bbx]
      (ssv inst "bbx" (bbx-of-list [[n w] [s e]] bbx-title))))
  (submit-bbx (itm inst 0) inst)
  inst))

(defn submit-search
  ([hm inst]
  (let [mp (into {} hm)
         max (mp "max-responses")
         lang (request-lang (mp "language"))
         text (mp "text")]
    (ssvs inst "responses" 
      (if-let [resp (with-timeout TIMEOUT
	   (call-wiki-search text max lang))]
        (filter some? (map #(article-from-map % "WikiArticle") resp))
        [])) ))
([inst any txt]
  (ssv inst "text" txt)
  (ssvs inst "responses" 
    (if-let [resp (call-wiki-search txt 
	(sv inst "max-responses") 
	(request-lang (sv inst  "language")))]
      (filter some? (map #(article-from-map % "WikiArticle") resp))
      []))
  inst))

(defn get-bbx-center [bbx-ins]
  ;; returns [lat lon]
(let [[w s e n] (seq (svs bbx-ins "wsen"))]
  [(float (/ (+ s n) 2)) (float (/ (+ w e) 2))]))

(defn submit-nearby
  ([hm inst]
  (let [mp (into {} hm)
         max (mp "max-responses")
         lang (request-lang (mp "language"))
         radius-km (mp "radius-km")
         lat (mp "lat")
         lon (mp "lng")]
    (ssvs inst "responses" 
      (if-let [resp (with-timeout TIMEOUT
	   (call-wiki-nearby lat lon radius-km max lang))]
        (filter some? (map #(article-from-map % "WikiNearArticle") resp))
        [])) ))
([inst lat lon]
  (ssv inst "lat" lat)
  (ssv inst "lng" lon)
  (submit-nearby (itm inst 0) inst)
  inst))

(defn coords-from-instances [list slat slon]
  ;; Collect coords from list of instances for given slot names
(map #(map read-string [(sv % slat) (sv % slon)]) list))

(defn irss-bbx [url resp]
  (let [geos (filter #(and (get % "geo:lat") (get %"geo:long")) resp)
       inss (map #(map-into-inst % (crin "GeoRSSItem")) geos)
       crds (coords-from-instances inss "geo:lat" "geo:long")
       bbx (if (seq crds) (bbx-of-list crds url))]
  [inss bbx]))

(defn submit-rss
  ([hm inst]
  (let [mp (into {} hm)
         url (first (selection mp "feedURL"))]
    (if url
      (if-let [resp (with-timeout TIMEOUT
	   (call-geonames-rss url))]
          (let [[inss bbx] (irss-bbx url resp)]
             (ssvs inst "georss_items" inss)
             (ssv inst "bbx" bbx))) )))
([inst any url]
  (if-let [resp (call-geonames-rss url)]
    (let [[inss bbx] (irss-bbx url resp)]
      (ssvs inst "georss_items" inss)
      (ssv inst "bbx" bbx)
      inst))))

(defn open-site [hm inst]
  (let [mp (into {} hm)
       url (or (mp "wikipediaUrl") (mp "link"))]
  (if url
    (.browse (java.awt.Desktop/getDesktop) (java.net.URI. url)))))

(defn clear-articles [hm inst]
  (let [ans (JOptionPane/showConfirmDialog nil "Are you shure?")]
  (if (= ans (JOptionPane/YES_OPTION))
      (doall (map delin (cls-instances "WikiArticle"))) )))

(defn clear-rss [hm inst]
  (let [ans (JOptionPane/showConfirmDialog nil "Are you shure?")]
  (if (= ans (JOptionPane/YES_OPTION))
      (doall (map delin (cls-instances "GeoRSSItem"))) )))

