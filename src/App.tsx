import "./App.css";
import "ol/ol.css";
import { Map, View } from "ol";
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import {Layer} from "ol/layer";
useGeographic();


import KommuneCheckbox from "./components/musteringField/KommuneCheckbox.tsx";
import AfricaCheckbox from "./components/musteringField/AfricaCheckbox.tsx";


function App() {
    const [layers, setLayers] = useState<Layer[]>([
        new TileLayer({ source: new OSM() }),
    ]);
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

    useEffect(() => {
        map.setLayers(layers);
    }, [layers]);


  return (
    <>
      <header>
        <h3>Map In Progress</h3>
      </header>
      <nav>
        <a href={"#"} onClick={handleZoomToUser}>
          Zoom to my location{" "}
        </a>

        <a href={"#"} onClick={(e) => handleZoom
        (e, [15,65], 5)}> Show Norway</a>

          <a href={"#"} onClick={(e) => handleZoom
          (e, [8, 9], 4)} > Show Africa </a>

            <KommuneCheckbox map={map} setLayers={setLayers}/>
            <AfricaCheckbox map={map} setLayers={setLayers}/>

      </nav>

      <div className={"map"} ref={mapRef}></div>
    </>
  );
}

export default App;
