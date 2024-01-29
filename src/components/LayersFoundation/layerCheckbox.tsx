import {Feature, Map, MapBrowserEvent} from "ol";
import { useEffect, useMemo, useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import {Stroke, Style} from "ol/style";


export function useLayer<FeatureType>(
    show: boolean,
    map: Map,
    url: string
){
    const [clickedFeature, setClickedFeature] = useState<Feature<FeatureType> | undefined>();

    const layer = useMemo(() =>{
        return new VectorLayer(
            {
                source: new VectorSource({
                    url: url,
                    format: new GeoJSON(),
                }),
                style: function (){
                    return new Style({
                        stroke: new Stroke({
                            color: 'teal',
                            width: 2,
                        })
                    })
                }
            });
    }, []);

    function handleClick(e: MapBrowserEvent<MouseEvent>){
        const clickedFeatures = layer
            .getSource()?.getFeaturesAtCoordinate(e.coordinate);

        setClickedFeature(
            clickedFeatures?.length ? (clickedFeatures[0] as Feature<FeatureType>)
                : undefined,
        );
    }

    useEffect(() => {
        if (show) {
            map.on("click", handleClick);
        }
        return () => {
            map.un("click", handleClick);
        };
    }, [show]);
    return {layer, clickedFeature};
}
