import { ColorRing } from "../components/CommonImport";

const Loader = (props) => {
  return (
    <>
      {props.isLoading ? (
        <div className="loader">
          <div className="text-center">
            <h4 style={{ textAlign: "center" }}>Please wait...</h4>
          </div>
          <ColorRing
            visible={props.isLoading}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#fbaa31", "#21add4", "#0a5cae", "#0273bc", "#a4bc3d"]}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Loader;
