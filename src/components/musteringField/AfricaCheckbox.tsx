import {useLayer} from "../LayersFoundation/layerCheckbox.tsx";
import {LayerCheckbox} from "../LayersFoundation/useLayer.tsx";
import {Dispatch, SetStateAction} from "react";
import {Layer} from "ol/layer";
import {Map, Feature} from "ol";

//-------------------------------------------------------

//export to checkbox
export type AfricaCountries = {
    geounit: string;
    pop_est: number;
}

//export to useXXXXXX
export type AfricaFeature = {
    getProperties(): CountriesProps;
} & Feature;

interface CountriesProps {
    geounit: AfricaCountries[];
    pop_est: number;
}

//-------------------------------------------------------



const AfricaCheckbox = ({ map, setLayers }: {
    map: Map; setLayers: Dispatch<SetStateAction<Layer[]>> }) => (
    <LayerCheckbox<AfricaFeature>
        map={map}
        setLayers={setLayers}
        useLayer={useLayer}
        url="./africa.json"
        label="countries"
    />
);

export default AfricaCheckbox;