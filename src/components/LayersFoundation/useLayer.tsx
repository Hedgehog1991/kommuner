import {Feature, Map} from "ol";
import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {Layer} from "ol/layer";
import {KommuneNavn} from "../musteringField/KommuneCheckbox.tsx";


export function LayerCheckbox<FeatureType>({
           map,
           setLayers,
           useLayer,
           url,
           label,
       }: {
    map: Map;
    setLayers: Dispatch<SetStateAction<Layer[]>>;
    useLayer: (show: boolean, map: Map, url: string) => { layer: Layer; clickedFeature: Feature<FeatureType> | undefined };
    url: string;
    label: string;
}) {

    const dialogRef = useRef() as MutableRefObject<HTMLDialogElement>
    const [checked, setChecked] = useState(false);
    const { layer, clickedFeature } = useLayer(checked, map, url);

    useEffect(() => {
        if (clickedFeature){
            dialogRef.current.showModal();
        }
    }, [clickedFeature]);

    useEffect(() => {
        if (checked) {
            setLayers((old) => [...old, layer]);
        }
        return () => {
            setLayers((old) => old.filter((l) => l !== layer));
        };
    }, [checked]);

    return (
        <div>
            <label>
                <input type={"checkbox"}
                       checked={checked}
                       onChange={(e) => setChecked(e.target.checked)}
                />
                {checked ? "Hide" : "Display"} {label}
            </label>
            <dialog ref={dialogRef}>
                <h2>
                    Info:
                </h2>
                <div>
                    {
                        clickedFeature && (
                            'navn' in clickedFeature.getProperties()
                                ? clickedFeature.getProperties().navn.find((n: KommuneNavn) => n.sprak === "nor")?.navn
                                : (
                                    'geounit' in clickedFeature.getProperties()
                                        ? (
                                            <>
                                                {clickedFeature.getProperties().pop_est}, {clickedFeature.getProperties().geounit}
                                            </>
                                        )
                                        : null
                                )
                        )
                    }
                </div>

                <div>
                    <button onClick={() => dialogRef.current.close()}>Close</button>
                </div>
            </dialog>
        </div>

    )
}
