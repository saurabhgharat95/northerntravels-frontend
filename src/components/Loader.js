import { ColorRing } from "../components/CommonImport";

const Loader = (props) => {
  return (
    <>
      {props.isLoading ? (
        <div className="loader">
          <div className="text-center">
            <h4 style={{ textAlign: "center" }}>Please wait...</h4>
          </div>
          <img src="/images/loader2.gif" />
        
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Loader;
