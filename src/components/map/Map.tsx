import React from "react";
import useCurrent from "../../lib/util/useCurrent";
import ReactMap from "./5fb12e6e581d3b79b1362e13";
import { isObjEmpty, findOwnerMapIDIfExist, fillMap } from "./service";

interface MapProps extends React.SVGProps<SVGSVGElement> {
  id: string;
  user: any,
  map: any
}

const Map: React.FC<MapProps> = ({ user, map, id, ...rest }): JSX.Element | null => {
  const ImportedMapRef = React.useRef<
    React.FC<React.SVGProps<SVGSVGElement> & { cb: any }>
  >();
  const [loading, setLoading] = React.useState(false);
  
  const cb = (ref) => {
    fillMap(map)
  }

  React.useEffect((): void => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        ImportedMapRef.current = (await import(`./${id}.tsx`)).default;
      } catch (err) {
        // Your own error handling logic, throwing error for the sake of
        // simplicity
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [id]);
  
  if (!loading && ImportedMapRef.current) {
    const { current: ImportedMap } = ImportedMapRef;
    return <ImportedMap cb={user.user !== null ? cb : () => {}} {...rest} />;
  }

  return null;
};

export default Map;
