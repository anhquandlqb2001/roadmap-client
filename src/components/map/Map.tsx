import React, { useEffect, useRef } from "react";
import { fillMap, applyHandleClick, findOwnerMapIDIfExist } from "./service";

interface MapProps extends React.SVGProps<SVGSVGElement> {
  id: string;
  user: any;
  map: any;
}

const Map: React.FC<MapProps> = ({
  user,
  map,
  id,
  ...rest
}): JSX.Element | null => {
  const ImportedMapRef = React.useRef<
    React.FC<React.SVGProps<SVGSVGElement>>
  >();
  const [loading, setLoading] = React.useState(false);
  const svgRef = useRef(null);
  
  React.useEffect((): void => {
    setLoading(true);
    const importAttributes = async (): Promise<void> => {
      try {
        ImportedMapRef.current = (await import(`./img/${id}.svg`)).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importAttributes();
  }, [id]);

  useEffect(() => {
    if (user.user && ImportedMapRef.current && svgRef.current) {
      const mapId = findOwnerMapIDIfExist(user?.map, id);
      if (mapId) {
        fillMap(map, svgRef); // neu da dang nhap thi fillmap
      }
    }
    if (ImportedMapRef.current && svgRef.current) {
      applyHandleClick({ref: svgRef, user, mapId: id, map})
    }
  }, [svgRef.current, map.current]);

  if (!loading && ImportedMapRef.current) {
    const { current: ImportedMap } = ImportedMapRef;

    return (
      <>
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 556.7 681.5"
          // style={{"en"}}
          xmlSpace="preserve"
          ref={svgRef}
        >
          <ImportedMap {...rest} />
        </svg>
      </>
    );
  }

  return null;
};

export default Map;
