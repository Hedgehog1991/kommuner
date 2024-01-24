import "./App.css";
import "ol/ol.css";
import { Map, View } from "ol";
import React, { MutableRefObject, useEffect, useMemo, useRef } from "react";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import {Style, Stroke} from 'ol/style';



useGeographic();

function App() {

  const view = useMemo(
    () =>
      new View({
        center: [9.5, 61, 7],
        zoom: 6.5,
      }),
    [],
  );


  const map = useMemo(
    () =>
      new Map({
        layers: [
          new TileLayer({ source: new OSM() }),

          new VectorLayer({
            source: new VectorSource({
              url: "./africa.json",
              format: new GeoJSON(),
            }),
              style: function (){
                return new Style({
                    stroke: new Stroke({
                        color: 'red',
                        width: 2,
                    })
                })
              }
          }),
          new VectorLayer({
            source: new VectorSource({
              url: "./kommuner.json",
              format: new GeoJSON(),
            }),
          }),
        ],
        view: view,
      }),
    [view],
  );

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  function handleZoomToUser(e: React.MouseEvent) {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition((pos) => {
      const { longitude, latitude } = pos.coords;
      const center = [longitude, latitude];
      map.getView().animate({ center, zoom: 14 });
    });
  }
    function handleZoom(e: React.MouseEvent, center: [number,number], zoom: number){
        e.preventDefault();
        map.getView().animate({
            center: center,
            zoom: zoom,
        })
    }



  return (
    <>
      <header>
        <h3>- Trail map app</h3>
      </header>
      <nav>
        <a href={"#"} onClick={handleZoomToUser}>
          Zoom to my location{" "}
        </a>
        <a href={"#"} onClick={(e) => handleZoom
        (e, [15,65], 5)}> Show all of Norway</a>

          <a href={"#"} onClick={(e) => handleZoom
          (e, [8, 9], 4)} > Show africa </a>

      </nav>
      <div className={"map"} ref={mapRef}></div>
    </>
  );
}

export default App;
