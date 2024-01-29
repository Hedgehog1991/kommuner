import {useLayer} from "../LayersFoundation/layerCheckbox.tsx";
import {LayerCheckbox} from "../LayersFoundation/useLayer.tsx";
import {Dispatch, SetStateAction} from "react";
import {Layer} from "ol/layer";
import {Map, Feature} from "ol";

//----------------------------------------------------------------------

//export to Checkbox
export type KommuneNavn = {
    sprak: "nor" | "fkv" | "sma" | "sme" | "smj";
    navn: string;
};

//export to useXXXXXX
export type KommuneFeature = {
    getProperties(): KommuneProps;
} & Feature;
interface KommuneProps {
    kommunenummer: string;
    navn: KommuneNavn[];
}
//----------------------------------------------------------------------

//Checkbox function sent to App
const KommuneCheckbox = ({ map, setLayers }: {
    map: Map; setLayers: Dispatch<SetStateAction<Layer[]>> }) => (
    <LayerCheckbox<KommuneFeature>
        map={map}
        setLayers={setLayers}
        useLayer={useLayer}
        url="./kommuner.json"
        label="kommuner"
    />
);
export default KommuneCheckbox