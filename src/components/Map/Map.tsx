import React from "react";
import { fillChildNodes, fillParentNode, handleClick } from "./service/service";

interface Props {
  name: string;
  map: any;
}

const Map: React.FC<Props> = ({ map, name }) => {
  const ImportedMapRef = React.useRef();
  const [loading, setLoading] = React.useState(() => false);
  const [_, setRef] = React.useState(null);

  React.useEffect((): void => {
    setLoading(true);
    const importMap = async (): Promise<void> => {
      try {
        ImportedMapRef.current = (
          await import(`../../lib/images/${name}.svg`)
        ).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importMap();
  }, []);

  const onClickKey = async (e, node): Promise<void | boolean> => {
    return await handleClick(name, { ...map }, e, node);
  };

  const onRefChange = React.useCallback(
    (node) => {
      if (!map || map === {}) return;
      setRef(node); // e.g. change ref state to trigger re-render
      if (node === null) {
        // node is null, if DOM node of ref had been unmounted before
      } else {
        // ref value exists
        fillChildNodes(map, node, true);
        fillParentNode(map, node, true);

        const nodeList = node.querySelectorAll(".node--child");
        nodeList.forEach((btn) => {
          btn.addEventListener("click", (e) => onClickKey(e, node));
        });
      }
    },
    [map]
  );

  if (!loading && ImportedMapRef.current) {
    const { current: ImportedMap } = ImportedMapRef;
    return (
      <>
        <div
          ref={onRefChange}
          style={{ backgroundColor: "white", margin: "20px" }}
        >
          <ImportedMap />
        </div>
      </>
    );
  }

  return null;
};

export default Map;
