import React, { useEffect, useRef, useState } from "react";
import { fillMap, applyHandleClick, findOwnerMapIDIfExist, isObjEmpty } from "./service";

interface MapProps extends React.SVGProps<SVGSVGElement> {
  id: string;
  user: any;
  map: any;
  userHasStartedMap: boolean;
}

const Map: React.FC<MapProps> = ({
  user,
  map,
  id,
  userHasStartedMap,
  ...rest
}): JSX.Element | null => {
  const ImportedMapRef = React.useRef<
    React.FC<React.SVGProps<SVGSVGElement>>
  >();
  const [loading, setLoading] = React.useState(false);

  const svgRef = useRef(null);

  React.useEffect((): void => {
    setLoading(true);
    const importMap = async (): Promise<void> => {
      try {
        ImportedMapRef.current = (await import(`./img/${id}.svg`)).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importMap();
  }, [id]);

  useEffect(() => {
    if (ImportedMapRef.current && svgRef.current) {
      if (!isObjEmpty(map)) {
        userHasStartedMap && fillMap(map, svgRef);
        applyHandleClick({ ref: svgRef, user, mapId: id, map, userHasStartedMap });
      }
    }
  }, [svgRef.current, map.current]);

  if (!loading && ImportedMapRef.current) {
    const { current: ImportedMap } = ImportedMapRef;

    return (
      <>
        <div ref={svgRef}>
          <ImportedMap {...rest} />
        </div>
      </>
    );
  }
  return null;
};

export default Map;
