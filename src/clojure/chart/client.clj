(ns chart.client
(:require
  [goog.string :as gstring]
  [goog.string.format]
  [csasync.proc :as asp]
  [chart.controls :as ctl]
  [carr.move :as mov]
  [cognitect.transit :as t]
  [ajax.core :refer (GET)]))

(def PORT 4444)
(def CHR-URL (str "http://localhost:" PORT "/chart/"))
(def INS-URL (str "http://localhost:" PORT "/instructions/"))
(def CMD-URL (str "http://localhost:" PORT "/command/"))
(def INS-TIO 1000)
(def CHART (volatile! {}))
(def VEHICLES (volatile! {}))
(def MOV-TIO 200)
(def URL-ICO {"INTERSECT" 	(str "http://localhost:" PORT "/img/redpln32.png")
 "DESCEND" 	(str "http://localhost:" PORT "/img/greenpln32.png")
 "CLIMB" 	(str "http://localhost:" PORT "/img/bluepln32.png")
 "LEVEL" 	(str "http://localhost:" PORT "/img/purplepln32.png")
 "GROUND" 	(str "http://localhost:" PORT "/img/greypln32.png")})
(defn read-transit [x]
  (t/read (t/reader :json) x))

(defn move-vehicle [id]
  (when-let [vmp (@VEHICLES id)]
  (mov/move vmp)
  (let [mp @vmp
         mrk (:marker mp)
         [lat lon] (:coord mp)
         pos (js/L.LatLng. lat lon)]
    (.setLatLng mrk pos))
  (vswap! VEHICLES assoc id vmp)))

(defn delete-vehicle [id]
  (when-let [veh (@VEHICLES id)]
  (asp/stop-process (:movst @veh))
  (.removeLayer @CHART (:marker @veh))
  (vswap! VEHICLES dissoc id)))

(defn clear-vehicles []
  (doseq [veh (vals @VEHICLES)]
  (asp/stop-process (:movst @veh))
  (.removeLayer @CHART (:marker @veh)))
(vreset! VEHICLES {}))

(defn error-handler [response]
  (let [{:keys [status status-text]} response]
  (println (str "AJAX ERROR: " status " " status-text))))

(defn info [id]
  (GET (str CMD-URL "info?id=" id)
  {:handler (fn [response])
   :error-handler error-handler}))

(defn create-update-marker [mrk mp]
  (if mrk
  (.removeLayer @CHART mrk))
(let [[lat lon] (:coord mp)
       pos (js/L.LatLng. lat lon)
       ico (js/L.icon #js{:iconUrl (URL-ICO (:status mp)) 
                                  :iconSize #js[32, 32]})
       opt #js{:icon ico 
                   :draggable true}
       mrk (-> js/L (.rotatedMarker pos opt))]
    (.on mrk "click"
         (fn [e]
           (info (ffirst (filter #(= (:marker @(second %)) (.-target e)) 
                                      (seq @VEHICLES))))))
    (.addTo mrk @CHART)
    (set! (.. mrk -options -angle) (:course mp))
    mrk))

(defn create-update-vehicle [id mp]
  (delete-vehicle id)
(let [ms (volatile! "START")
       mp (assoc mp :marker (create-update-marker nil mp)
                              :step-hrs (double (/ MOV-TIO 3600000))
	      :movst ms
                              :mover (asp/start-process ms #(move-vehicle id) MOV-TIO))
         carr (volatile! mp)]
    (mov/set-turn-point carr)
    (vswap! VEHICLES assoc id carr)))

(defn popup
  ([id html time]
  (let [vmp (@VEHICLES id)
         [lat lon] (:coord @vmp)]
    (popup lat lon html time)))
([lat lon html time]
  (let [pop (-> js/L (.popup {:maxWidth 600 :maxHeight 800 })
                (.setLatLng (array lat lon))
                (.setContent html))]
    (.addLayer @CHART pop)
    (if (> time 0)
        (asp/delayer #(.removeLayer @CHART pop)
                            time)))))

(defn instructions-handler [response]
  (doseq [{:keys [instruct] :as ins} (read-transit response)]
  ;;(println [:INSTRUCT ins])
  (condp = instruct
    :create-update (let [{:keys [id vehicle]} ins]
              (create-update-vehicle id vehicle))
    :delete (let [{:keys [id]} ins]
              (delete-vehicle id))
    :clear (clear-vehicles)
    :popup (let [{:keys [id lat lon html time]} ins]
             (cond
               id (popup id html time)
               (and lat lon) (popup lat lon html time)))
    (println (str "Unknown instruction: " [instruct ins])))))

(defn receive-instructions []
  (GET INS-URL {:handler instructions-handler
                       :error-handler error-handler}))

(defn watch-visible []
  (let [bnd (.getBounds @CHART)]
  (str "watch-visible?n=" (.getNorth bnd)
                             "&s=" (.getSouth bnd)
                             "&w=" (.getWest bnd)
                             "&e=" (.getEast bnd))))

(defn command [cmd]
  (GET (str CMD-URL
  (condp = cmd
    "watch-visible" (watch-visible)
    cmd))
  {:handler (fn [response])
   :error-handler error-handler}))

(defn init-chart []
  (println :INIT-CHART)
(let [m (-> js/L
              (.map "map")
              (.setView (array 50.04, 8.55) 10)) ;; Frankfurt
        tile1 (-> js/L (.tileLayer "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                   #js{:maxZoom 16
                                       :attribution "Ru, OpenStreetMap &copy;"}))
        tile2 (-> js/L (.tileLayer "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                   #js{:maxZoom 20
                                       :subdomains #js["mt0" "mt1" "mt2" "mt3"]
                                       :attribution "Ru, Google &copy;"}))
        tile3 (-> js/L (.tileLayer "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                   #js{:maxZoom 20
                                       :subdomains #js["mt0" "mt1" "mt2" "mt3"]
                                       :attribution "Ru, Google &copy;"}))
        tile4 (-> js/L (.tileLayer "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                                   #js{:maxZoom 20
                                       :subdomains #js["mt0" "mt1" "mt2" "mt3"]
                                       :attribution "Ru, Google &copy;"}))
        tile5 (-> js/L (.tileLayer "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                                   #js{:maxZoom 20
                                       :subdomains #js["mt0" "mt1" "mt2" "mt3"]
                                       :attribution "Ru, Google &copy;"}))
        base (clj->js {"OpenStreetMap" tile1
                       "Google Satellite" tile2
                       "Google Streets" tile3
                       "Google Hybrid" tile4
                       "Google Terrain" tile5})
        ctrl (-> js/L (.control.layers base nil))]
  (.addTo tile1 m)
  (.addTo ctrl m)
  (.on m "mousemove"
         (fn [e] (ctl/mouse-move (.. e -latlng -lat) (.. e -latlng -lng))))
  (vreset! CHART m)))

(defn on-load-chart []
  (enable-console-print!)
(init-chart)
(asp/repeater receive-instructions INS-TIO)
(ctl/show-chart-controls))

