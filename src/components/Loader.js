import { ColorRing } from "../components/CommonImport";

const Loader = (props) => {
  return (
    <>
      {props.isLoading ? (
        <div className="loader">
          <div className="text-center">
            <h4
              style={{
                textAlign: "center",
                marginTop: "10%",
                zIndex: "1000",
                position: "absolute",
                marginLeft: "-3%",
              }}
            >
              Please wait...
            </h4>
          </div>
          {/* <img src="/images/loader2.gif" /> */}
          <img src="/images/travel-loader-blue.gif" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Loader;
