import { useEffect, useState, useRef } from "react";
import {
  axios,
  SimpleReactValidator,
  toast,
  ToastContainer,
  ShimmerBadge,
} from "../components/CommonImport";
import { BASE_URL, FETCH_BEFORE_MARKUP_AMT_API } from "../utils/constants";
import "react-toastify/dist/ReactToastify.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuotationFormData } from "../utils/store";
import { toTitleCase } from "../utils/helpers";
const MarkupForm = ({ onValidationStatusChange }) => {
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes
  const colorIndex = [
    "primary",
    "secondary",
    "success",
    "warning",
    "info",
    "danger",
  ];
  const [markupObject, setMarkupObject] = useState({
    quotBeforeMarkup: 0,
    quotMarkup: "",
    quotAfterMarkup: 0,
    quotCompanyName: "",
    quotCorporateOffice: "",
    quotRegionalOffice: "",
    quotCompanyHotline: "",
    quotCompanyEmail: "",
    quotCompanyWebsite: "",
    quotLogo: "",
    quotCompanyLogo: "",
  });
  const [markupAmtObject, setMarkupAmtObject] = useState(null);
  const [ppAmtObj, setPPAmtObj] = useState({
    itineraryPPAmt: 0,
    addOnPPAMt: 0,
    markupPPAmt: 0,
  });
  const [itineraryQuotAmt, setItineraryQuotAmt] = useState(0);
  const [logoImage, setLogoImage] = useState("");
  const [, setForceUpdate] = useState(0);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  const handleCloseModal = () => {
    var modal = document.getElementById("imageModal");

    if (modal) {
      var modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };
  const openImageModal = (imageURL) => {
    setLogoImage(imageURL);
  };

  //redux
  const dispatch = useDispatch();
  const quotFormData = useSelector((state) => state.form.quotationFormData);

  const fetchBeforeMarkupAmt = async () => {
    try {
      let url = FETCH_BEFORE_MARKUP_AMT_API;
      let body = {
        id: quotFormData.quotId,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          let quotPackageArr = response.data.data.mergedPackagesArr;

          let amtObj = response.data.data;
          let itineraryQuotAmt = amtObj.itineraryQuotAmt;
          setMarkupAmtObject(quotPackageArr);
          setItineraryQuotAmt(itineraryQuotAmt);
          setPPAmtObj((prevState) => ({
            ...prevState,
            itineraryPPAmt: amtObj.itineraryPPAmt,
            addOnPPAMt: amtObj.addOnPPAMt,
          }));
          quotPackageArr.forEach((pckg) => {
            calculatePackageAmt(pckg, amtObj.itineraryPPAmt, amtObj.addOnPPAMt);
          });
          dispatch(
            setQuotationFormData("itineraryPPAmt", amtObj.itineraryPPAmt)
          );
          dispatch(setQuotationFormData("addOnPPAMt", amtObj.addOnPPAMt));
          dispatch(setQuotationFormData("quotAccData", quotPackageArr));
        }
      }
    } catch (e) {}
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    try {
      if (file) {
        
        // if (file.size > MAX_FILE_SIZE) {
        //   toast.error(
        //     "File size exceeds 1 MB limit. Please choose a smaller file.",
        //     {
        //       position: "top-right",
        //     }
        //   );

        //   dispatch(setQuotationFormData("quotLogo", ""));

        //   return;
        // } else {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target.result) {
            dispatch(setQuotationFormData("quotLogo", e.target.result));
          }
        };

        reader.readAsDataURL(file);
      }
      // }
    } catch (e) {
      
    }
  };
  const handleCompanyFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // if (file.size > MAX_FILE_SIZE) {
      //   toast.error(
      //     "File size exceeds 1 MB limit. Please choose a smaller file.",
      //     {
      //       position: "top-right",
      //     }
      //   );
      //   dispatch(setQuotationFormData("quotCompanyLogo", ""));
      //   return;
      // } else {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target.result) {
          dispatch(setQuotationFormData("quotCompanyLogo", e.target.result));
        }
      };

      reader.readAsDataURL(file);
    }
    // }
  };
  const calculateAfterMarkup = (beforeMarkup, markup) => {
    try {
      const before = parseFloat(beforeMarkup) || 0;
      const mark = parseFloat(markup) || 0;

      if (isNaN(before) || isNaN(mark)) {
        toast.error("Invalid input format. Please enter valid numbers", {
          position: "top-right",
        });
      }

      return (before + mark).toFixed(2);
    } catch (e) {
      setError(e.message);
      return "";
    }
  };
  const calculatePackageAmt = (pckg, itineraryPPAmt, addOnPPAMt) => {
    // console.log("pckg", pckg);
    let roomsReqd =
      Number(quotFormData.quotRoomsReqd) -
      (quotFormData.quotSingleOccupy ? quotFormData.quotSingleOccupy : 0);
    let totalDoubleRoomPeople = Number(quotFormData.quotTotalPeoples)-Number(quotFormData.quotTotalExtraBeds)-Number(quotFormData.quotChildBtwn8And9)-Number(quotFormData.quotBlw5)-Number(quotFormData.quotSingleOccupy)

    let hotelRoomPPFinalAmt =
      Number(pckg.hotelRoomPPAmt) +
      Number(itineraryPPAmt)  +
      Number(addOnPPAMt)  +
      (pckg.hotelRoomMarkupAmt ? Number(pckg.hotelRoomMarkupAmt) : 0);

    let hotelRoomFinalAmt = hotelRoomPPFinalAmt * (totalDoubleRoomPeople) ;

    // console.log(
    //   "h1",
    //   pckg.hotelRoomPPAmt,
    //   hotelRoomPPFinalAmt,
    //   hotelRoomFinalAmt
    // );

    let extraBedPPFinalAmt =
      Number(pckg.extraBedPPAmt) +
      Number(itineraryPPAmt)  +
      Number(addOnPPAMt)  +
      (pckg.extraBedMarkupAmt ? Number(pckg.extraBedMarkupAmt) : 0);
    let extraBedFinalAmt = extraBedPPFinalAmt * quotFormData.quotTotalExtraBeds;

    let cnbPPFinalAmt =
      Number(pckg.cnbPPAmt) +
      Number(itineraryPPAmt)  +
      Number(addOnPPAMt)  +
      (pckg.cnbMarkupAmt ? Number(pckg.cnbMarkupAmt) : 0);

    let cnbFinalAmt = cnbPPFinalAmt * quotFormData.quotChildBtwn8And9;

    let cmpPPFinalAmt =
      Number(pckg.cmpPPAmt) +
      Number(itineraryPPAmt)  +
      Number(addOnPPAMt) *  +
      (pckg.cmpMarkupAmt ? Number(pckg.cmpMarkupAmt) : 0);

    let cmpFinalAmt = cmpPPFinalAmt * quotFormData.quotBlw5;

    let singleOccupyPPFinalAmt =
      Number(pckg.singleOccupyPPAmt) +
      Number(itineraryPPAmt)  +
      Number(addOnPPAMt)  +
      (pckg.singleOccupyMarkupAmt ? Number(pckg.singleOccupyMarkupAmt) : 0);

    let singleOccupyFinalAmt =
      singleOccupyPPFinalAmt * quotFormData.quotSingleOccupy;

    let totalPckgAmt =
      hotelRoomFinalAmt +
      extraBedFinalAmt +
      cnbFinalAmt +
      cmpFinalAmt +
      singleOccupyFinalAmt;

    // console.log("hotelRoomFinalAmt", hotelRoomPPFinalAmt, hotelRoomFinalAmt);
    // console.log("extraBedFinalAmt", extraBedPPFinalAmt, extraBedFinalAmt);
    // console.log("cnbFinalAmt", cnbPPFinalAmt, cnbFinalAmt);
    // console.log("cmpFinalAmt", cmpPPFinalAmt, cmpFinalAmt);
    // console.log(
    //   "singleOccupyFinalAmt",
    //   singleOccupyPPFinalAmt,
    //   singleOccupyFinalAmt
    // );
    pckg.totalPckgAmt = totalPckgAmt.toFixed(2);
  };
  // const calculatePackageAmt = (pckg, itineraryPPAmt, addOnPPAMt) => {
  //   console.log("pckg", pckg);
  //   let roomsReqd =
  //     Number(quotFormData.quotRoomsReqd) -
  //     (quotFormData.quotSingleOccupy ? quotFormData.quotSingleOccupy : 0);

  //   let hotelRoomPPFinalAmt =
  //     Number(pckg.hotelRoomPPAmt) +
  //     Number(itineraryPPAmt) * Number(pckg.noOfHotels) +
  //     Number(addOnPPAMt) * Number(pckg.noOfHotels) +
  //     (pckg.hotelRoomMarkupAmt ? Number(pckg.hotelRoomMarkupAmt) : 0);

  //   let hotelRoomFinalAmt = hotelRoomPPFinalAmt * 2 * roomsReqd;

  //   console.log(
  //     "h1",
  //     pckg.hotelRoomPPAmt,
  //     hotelRoomPPFinalAmt,
  //     hotelRoomFinalAmt
  //   );

  //   let extraBedPPFinalAmt =
  //     Number(pckg.extraBedPPAmt) +
  //     Number(itineraryPPAmt) * Number(pckg.noOfHotels) +
  //     Number(addOnPPAMt) * Number(pckg.noOfHotels) +
  //     (pckg.extraBedMarkupAmt ? Number(pckg.extraBedMarkupAmt) : 0);
  //   let extraBedFinalAmt = extraBedPPFinalAmt * quotFormData.quotTotalExtraBeds;

  //   let cnbPPFinalAmt =
  //     Number(pckg.cnbPPAmt) +
  //     Number(itineraryPPAmt) * Number(pckg.noOfHotels) +
  //     Number(addOnPPAMt) * Number(pckg.noOfHotels) +
  //     (pckg.cnbMarkupAmt ? Number(pckg.cnbMarkupAmt) : 0);

  //   let cnbFinalAmt = cnbPPFinalAmt * quotFormData.quotChildBtwn8And9;

  //   let cmpPPFinalAmt =
  //     Number(pckg.cmpPPAmt) +
  //     Number(itineraryPPAmt) * Number(pckg.noOfHotels) +
  //     Number(addOnPPAMt) * Number(pckg.noOfHotels) +
  //     (pckg.cmpMarkupAmt ? Number(pckg.cmpMarkupAmt) : 0);

  //   let cmpFinalAmt = cmpPPFinalAmt * quotFormData.quotBlw5;

  //   let singleOccupyPPFinalAmt =
  //     Number(pckg.singleOccupyPPAmt) +
  //     Number(itineraryPPAmt) * Number(pckg.noOfHotels) +
  //     Number(addOnPPAMt) * Number(pckg.noOfHotels) +
  //     (pckg.singleOccupyMarkupAmt ? Number(pckg.singleOccupyMarkupAmt) : 0);

  //   let singleOccupyFinalAmt =
  //     singleOccupyPPFinalAmt * quotFormData.quotSingleOccupy;

  //   let totalPckgAmt =
  //     hotelRoomFinalAmt +
  //     extraBedFinalAmt +
  //     cnbFinalAmt +
  //     cmpFinalAmt +
  //     singleOccupyFinalAmt;

  //   console.log("hotelRoomFinalAmt", hotelRoomPPFinalAmt, hotelRoomFinalAmt);
  //   console.log("extraBedFinalAmt", extraBedPPFinalAmt, extraBedFinalAmt);
  //   console.log("cnbFinalAmt", cnbPPFinalAmt, cnbFinalAmt);
  //   console.log("cmpFinalAmt", cmpPPFinalAmt, cmpFinalAmt);
  //   console.log(
  //     "singleOccupyFinalAmt",
  //     singleOccupyPPFinalAmt,
  //     singleOccupyFinalAmt
  //   );
  //   pckg.totalPckgAmt = totalPckgAmt.toFixed(2);
  // };
  const validateForm = () => {
    const isValid = simpleValidator.current.allValid();
    if (isValid) {
      onValidationStatusChange(isValid, 5);
    } else {
      simpleValidator.current.showMessages();
      setForceUpdate((v) => ++v);
    }
    return isValid;
  };
  useEffect(() => {
    validateForm();
  }, [markupObject]);
  useEffect(() => {
    const afterMarkup = calculateAfterMarkup(
      markupObject.quotBeforeMarkup,
      markupObject.quotMarkup
    );
    setMarkupObject((prevState) => ({
      ...prevState,
      quotAfterMarkup: afterMarkup,
    }));
    dispatch(setQuotationFormData("quotAfterMarkup", afterMarkup));
  }, [markupObject.quotMarkup]);

  useEffect(() => {
    fetchBeforeMarkupAmt();
  }, []);

  useEffect(() => {
    if (quotFormData) {
      setMarkupObject((prevState) => ({
        ...prevState,
        quotBeforeMarkup: quotFormData.quotBeforeMarkup,
        quotMarkup: quotFormData.quotMarkup,
        quotAfterMarkup: quotFormData.quotAfterMarkup,
        quotCompanyName: quotFormData.quotCompanyName,
        quotCorporateOffice: quotFormData.quotCorporateOffice,
        quotRegionalOffice: quotFormData.quotRegionalOffice,
        quotCompanyHotline: quotFormData.quotCompanyHotline,
        quotCompanyEmail: quotFormData.quotCompanyEmail,
        quotCompanyWebsite: quotFormData.quotCompanyWebsite,
        quotLogo: quotFormData.quotLogo,
        quotCompanyLogo: quotFormData.quotCompanyLogo,
      }));
    }
  }, [quotFormData]);

  return (
    <>
      <section
        id="steps-uid-0-p-0"
        role="tabpanel"
        aria-labelledby="steps-uid-0-h-0"
        className="body current"
        aria-hidden="false"
        style={{ left: "0px" }}
      >
        <h4 className="form-heading">Markup</h4>

        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card border border-secondary">
              <div className="card-body">
                <div className="media">
                  <ion-icon
                    style={{ marginTop: "5px" }}
                    color="warning"
                    name="information-circle"
                    size="large"
                  ></ion-icon>
                  <div className="media-body ml-2">
                    <p className="card-text" style={{ marginBottom: 0 }}>
                      CNB : <b> Children with No Bed</b>
                    </p>
                    <p className="card-text">
                      CMP : <b> Complementary</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card border border-primary">
              <div className="card-body ">
                <div className="row">
                  <div className="col-md-1 pr-0">
                    <ion-icon
                      style={{ marginTop: "5px" }}
                      color="primary"
                      name="information-circle"
                      size="large"
                    ></ion-icon>
                  </div>
                  <div className="col-md-11 ">
                    <div className="row">
                      <p
                        className="col-md-7 card-text "
                        style={{ marginBottom: 0 }}
                      >
                        Total No. of Single Occupancy :{" "}
                        <b>
                          {" "}
                          {quotFormData.quotSingleOccupy
                            ? quotFormData.quotSingleOccupy
                            : 0}
                        </b>
                      </p>
                      <p
                        className="col-md-5 card-text "
                        style={{ marginBottom: 0 }}
                      >
                        Total Extra Beds :{" "}
                        <b>
                          {" "}
                          {quotFormData.quotTotalExtraBeds
                            ? quotFormData.quotTotalExtraBeds
                            : 0}
                        </b>
                      </p>
                      <p
                        className="col-md-7 card-text "
                        style={{ marginBottom: 0 }}
                      >
                        Total No. of CNB :{" "}
                        <b>
                          {" "}
                          {quotFormData.quotChildBtwn8And9
                            ? quotFormData.quotChildBtwn8And9
                            : 0}
                        </b>
                      </p>
                      <p
                        className="col-md-5 card-text "
                        style={{ marginBottom: 0 }}
                      >
                        Total No. of CMP :{" "}
                        <b>
                          {" "}
                          {quotFormData.quotBlw5 ? quotFormData.quotBlw5 : 0}
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-4">
            <label>Vehicle Per Person (Rs.)</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter Vehicle Per Person Amount (Rs.)"
              readOnly
              value={ppAmtObj.itineraryPPAmt}
            />
          </div>
          <div className="col-sm-4">
            <label>Add On Per Person (Rs.)</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter Add On Per Person (Rs.)"
              readOnly
              value={ppAmtObj.addOnPPAMt}
            />
          </div>
        </div>
        {!markupAmtObject && (
          <>
            <div className="package-div mb-4">
              <div className="form-group row">
                <div className="col-sm-4">
                  {" "}
                  <ShimmerBadge width={100} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={100} />
                  <ShimmerBadge width={250} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={100} />
                  <ShimmerBadge width={300} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4">
                  <ShimmerBadge width={200} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={100} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={150} />
                  <ShimmerBadge width={300} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4">
                  <ShimmerBadge width={150} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={100} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={150} />
                  <ShimmerBadge width={300} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4">
                  <ShimmerBadge width={175} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={100} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={150} />
                  <ShimmerBadge width={300} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4">
                  <ShimmerBadge width={120} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={100} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={150} />
                  <ShimmerBadge width={300} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4">
                  <ShimmerBadge width={200} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={100} />
                  <ShimmerBadge width={300} />
                </div>
                <div className="col-sm-4">
                  <ShimmerBadge width={150} />
                  <ShimmerBadge width={300} />
                </div>
              </div>

              <div className="form-group row">
                <div class="col-md-8"></div>
                <div className="col-sm-4 ">
                  <ShimmerBadge width={200} />
                  <ShimmerBadge width={100} />
                </div>
              </div>
            </div>
          </>
        )}
        {markupAmtObject &&
          markupAmtObject.length > 0 &&
          markupAmtObject.map((pckg, index) => (
            <>
              <div className="package-div mb-4">
                <div className="form-group row">
                  <div className="col-sm-4">
                    <label>Package Name</label>
                    <br></br>
                    <p
                      className={`pckg-name text-${
                        colorIndex[index] ? colorIndex[index] : "primary"
                      } mr-2`}
                    >
                      {toTitleCase(pckg.packageName)}
                    </p>
                  </div>
                  <div className="col-sm-4">
                    <label>Before Markup (Rs.) </label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Before Markup (Rs.)"
                      value={pckg.charges + itineraryQuotAmt}
                      disabled
                      onChange={(event) => {
                        const newValue = event.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          setMarkupObject((prevState) => ({
                            ...prevState,
                            quotBeforeMarkup: event.target.value,
                          }));
                          dispatch(
                            setQuotationFormData(
                              "quotBeforeMarkup",
                              event.target.value
                            )
                          );
                        }
                      }}
                      onBlur={() => {
                        simpleValidator.current.showMessageFor(
                          "quotBeforeMarkup"
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-4">
                    <label>Double Sharing per person (Rs.) </label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Before Markup (Rs.)"
                      value={pckg.hotelRoomPPAmt+Number(ppAmtObj.itineraryPPAmt) +
                      Number(ppAmtObj.addOnPPAMt)}
                      disabled
                    />
                  </div>
                  <div className="col-sm-4">
                    <label>Markup per person(Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Markup (Rs.)"
                      value={pckg.hotelRoomMarkupAmt}
                      onChange={(event) => {
                        const newValue = event.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          const newFormValues = [...markupAmtObject];
                          newFormValues[index].hotelRoomMarkupAmt = newValue
                            ? newValue
                            : "";
                          dispatch(
                            setQuotationFormData("quotAccData", newFormValues)
                          );
                          calculatePackageAmt(
                            pckg,
                            ppAmtObj.itineraryPPAmt,
                            ppAmtObj.addOnPPAMt
                          );
                        }
                      }}
                      onBlur={() => {
                        simpleValidator.current.showMessageFor(
                          "hotelRoomMarkupAmt"
                        );
                      }}
                    />
                    <>
                      {simpleValidator.current.message(
                        "hotelRoomMarkupAmt",
                        pckg.hotelRoomMarkupAmt,
                        ["required"],
                        {
                          messages: {
                            required: "Please enter markup",
                          },
                        }
                      )}
                    </>
                  </div>
                  <div className="col-sm-4">
                    <label>Amount Per Person (Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Amount Per Person (Rs.)"
                      readOnly
                      value={Number(pckg.hotelRoomPPAmt) !=0 ?(
                        Number(pckg.hotelRoomPPAmt) +
                        Number(
                          pckg.hotelRoomMarkupAmt ? pckg.hotelRoomMarkupAmt : 0
                        ) +Number(ppAmtObj.itineraryPPAmt) +
                        Number(ppAmtObj.addOnPPAMt)
                        
                      ).toFixed(2):0}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-4">
                    <label>Single occupancy (Rs.) </label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Single occupancy (Rs.)"
                      value={pckg.singleOccupyPPAmt !=0 ? pckg.singleOccupyPPAmt+Number(ppAmtObj.itineraryPPAmt) +
                        Number(ppAmtObj.addOnPPAMt):0 }
                      disabled
                    />
                  </div>
                  <div className="col-sm-4">
                    <label>Markup per person(Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Markup (Rs.)"
                      value={pckg.singleOccupyMarkupAmt}
                      onChange={(event) => {
                        const newValue = event.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          const newFormValues = [...markupAmtObject];
                          newFormValues[index].singleOccupyMarkupAmt = newValue
                            ? newValue
                            : "";
                          dispatch(
                            setQuotationFormData("quotAccData", newFormValues)
                          );
                          calculatePackageAmt(
                            pckg,
                            ppAmtObj.itineraryPPAmt,
                            ppAmtObj.addOnPPAMt
                          );
                        }
                      }}
                      onBlur={() => {
                        simpleValidator.current.showMessageFor(
                          "singleOccupyMarkupAmt"
                        );
                      }}
                    />
                    <>
                      {simpleValidator.current.message(
                        "singleOccupyMarkupAmt",
                        pckg.singleOccupyMarkupAmt,
                        ["required"],
                        {
                          messages: {
                            required: "Please enter markup",
                          },
                        }
                      )}
                    </>
                  </div>
                  <div className="col-sm-4">
                    <label>Amount Per Person (Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Markup (Rs.)"
                      readOnly
                      value={Number(pckg.singleOccupyPPAmt)!=0 ?(
                        Number(pckg.singleOccupyPPAmt) +
                        Number(
                          pckg.singleOccupyMarkupAmt
                            ? pckg.singleOccupyMarkupAmt
                            : 0
                        ) +Number(ppAmtObj.itineraryPPAmt) +
                        Number(ppAmtObj.addOnPPAMt)
                        
                      ).toFixed(2):0}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-4">
                    <label>Extra bed per person (Rs.) </label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Extra bed per person Amount (Rs.)"
                      value={pckg.extraBedPPAmt!=0 ? pckg.extraBedPPAmt+Number(ppAmtObj.itineraryPPAmt) +
                        Number(ppAmtObj.addOnPPAMt):0}
                      disabled
                    />
                  </div>
                  <div className="col-sm-4">
                    <label>Markup per person(Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Markup (Rs.)"
                      value={pckg.extraBedMarkupAmt}
                      onChange={(event) => {
                        const newValue = event.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          const newFormValues = [...markupAmtObject];
                          newFormValues[index].extraBedMarkupAmt = newValue
                            ? newValue
                            : "";
                          dispatch(
                            setQuotationFormData("quotAccData", newFormValues)
                          );
                          calculatePackageAmt(
                            pckg,
                            ppAmtObj.itineraryPPAmt,
                            ppAmtObj.addOnPPAMt
                          );
                        }
                      }}
                      onBlur={() => {
                        simpleValidator.current.showMessageFor(
                          "extraBedMarkupAmt"
                        );
                      }}
                    />
                    <>
                      {simpleValidator.current.message(
                        "extraBedMarkupAmt",
                        pckg.extraBedMarkupAmt,
                        ["required"],
                        {
                          messages: {
                            required: "Please enter markup",
                          },
                        }
                      )}
                    </>
                  </div>
                  <div className="col-sm-4">
                    <label>Amount Per Person (Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Markup (Rs.)"
                      readOnly
                      value={Number(pckg.extraBedPPAmt)!=0 ?(
                        Number(pckg.extraBedPPAmt) +
                        Number(
                          pckg.extraBedMarkupAmt ? pckg.extraBedMarkupAmt : 0
                        ) +Number(ppAmtObj.itineraryPPAmt) +
                        Number(ppAmtObj.addOnPPAMt)
                      ).toFixed(2):0}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-4">
                    <label>CNB per person (Rs.) </label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Before Markup (Rs.)"
                      value={pckg.cnbPPAmt!=0  ?pckg.cnbPPAmt+
                        Number(ppAmtObj.itineraryPPAmt)  +
                        Number(ppAmtObj.addOnPPAMt) :0}
                      disabled
                    />
                  </div>
                  <div className="col-sm-4">
                    <label>Markup per person(Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Markup (Rs.)"
                      value={pckg.cnbMarkupAmt}
                      onChange={(event) => {
                        const newValue = event.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          const newFormValues = [...markupAmtObject];
                          newFormValues[index].cnbMarkupAmt = newValue
                            ? newValue
                            : "";
                          dispatch(
                            setQuotationFormData("quotAccData", newFormValues)
                          );
                          calculatePackageAmt(
                            pckg,
                            ppAmtObj.itineraryPPAmt,
                            ppAmtObj.addOnPPAMt
                          );
                        }
                      }}
                      onBlur={() => {
                        simpleValidator.current.showMessageFor("cnbMarkupAmt");
                      }}
                    />
                    <>
                      {simpleValidator.current.message(
                        "cnbMarkupAmt",
                        pckg.cnbMarkupAmt,
                        ["required"],
                        {
                          messages: {
                            required: "Please enter markup",
                          },
                        }
                      )}
                    </>
                  </div>
                  <div className="col-sm-4">
                    <label>Amount Per Person (Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Markup (Rs.)"
                      readOnly
                      value={Number(pckg.cnbPPAmt) !=0 ?(
                        Number(pckg.cnbPPAmt) +
                        Number(pckg.cnbMarkupAmt ? pckg.cnbMarkupAmt : 0) +
                        Number(ppAmtObj.itineraryPPAmt) +
                        Number(ppAmtObj.addOnPPAMt) 
                      ).toFixed(2):0}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-4">
                    <label>CMP per person (Rs.) </label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter CMP per person Amount (Rs.)"
                      value={pckg.cmpPPAmt!=0 ? pckg.cmpPPAmt+
                        Number(ppAmtObj.itineraryPPAmt)  +
                        Number(ppAmtObj.addOnPPAMt):0 }
                      disabled
                    />
                  </div>
                  <div className="col-sm-4">
                    <label>Markup per person(Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Markup (Rs.)"
                      value={pckg.cmpMarkupAmt}
                      onChange={(event) => {
                        const newValue = event.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          const newFormValues = [...markupAmtObject];
                          newFormValues[index].cmpMarkupAmt = newValue
                            ? newValue
                            : "";
                          dispatch(
                            setQuotationFormData("quotAccData", newFormValues)
                          );
                          calculatePackageAmt(
                            pckg,
                            ppAmtObj.itineraryPPAmt,
                            ppAmtObj.addOnPPAMt
                          );
                        }
                      }}
                      onBlur={() => {
                        simpleValidator.current.showMessageFor("cmpMarkupAmt");
                      }}
                    />
                    <>
                      {simpleValidator.current.message(
                        "cmpMarkupAmt",
                        pckg.cmpMarkupAmt,
                        ["required"],
                        {
                          messages: {
                            required: "Please enter markup",
                          },
                        }
                      )}
                    </>
                  </div>
                  <div className="col-sm-4">
                    <label>Amount Per Person (Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Markup (Rs.)"
                      readOnly
                      value={Number(pckg.cmpPPAmt) !=0?(
                        Number(pckg.cmpPPAmt) +
                        Number(pckg.cmpMarkupAmt ? pckg.cmpMarkupAmt : 0) +
                        Number(ppAmtObj.itineraryPPAmt) +
                        Number(ppAmtObj.addOnPPAMt) 
                      ).toFixed(2):0}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div class="col-md-8"></div>
                  <div className="col-sm-4 ">
                    <label>Total Package Amount (Rs.)</label>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      className="form-control"
                      placeholder="Enter Markup (Rs.)"
                      readOnly
                      value={Number(pckg.totalPckgAmt)}
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Logo</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
            {markupObject.quotLogo && (
              <>
                {!markupObject.quotLogo.includes("base64") && (
                  <>
                    <br></br>
                    <img
                      style={{ width: "100px" }}
                      src={
                        BASE_URL +
                        "/uploads/logos/" +
                        markupObject.quotLogo +
                        ".jpeg"
                      }
                    />
                    <span
                      className="badge  badge-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#imageModal"
                      onClick={() =>
                        openImageModal(
                          BASE_URL +
                            "/uploads/logos/" +
                            markupObject.quotLogo +
                            ".jpeg"
                        )
                      }
                    >
                      View Image
                    </span>
                  </>
                )}
                {markupObject.quotLogo.includes("base64") && (
                  <>
                    <br></br>
                    <img
                      style={{ width: "100px" }}
                      src={markupObject.quotLogo}
                    />
                  </>
                )}
              </>
            )}

            {/* <p className="text-primary">Upload a logo (max 1 MB)</p> */}
          </div>
          <div className="col-sm-6">
            <label>Company Logo </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleCompanyFileChange}
            />
            {markupObject.quotCompanyLogo && (
              <>
                {!markupObject.quotCompanyLogo.includes("base64") && (
                  <>
                    <br></br>
                    <img
                      style={{ width: "100px" }}
                      src={
                        BASE_URL +
                        "/uploads/company_logos/" +
                        markupObject.quotCompanyLogo 
                        +
                        ".jpeg"
                      }
                    />
                    <span
                      className="badge  badge-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#imageModal"
                      onClick={() =>
                        openImageModal(
                          BASE_URL +
                            "/uploads/company_logos/" +
                            markupObject.quotCompanyLogo 
                            +
                            ".jpeg"
                        )
                      }
                    >
                      View Image
                    </span>
                  </>
                )}
              
                {markupObject.quotCompanyLogo.includes("base64") && (
                  <>
                    <br></br>
                    <img
                      style={{ width: "100px" }}
                      src={markupObject.quotCompanyLogo}
                    />
                  </>
                )}
              </>
            )}

            {/* <p className="text-primary">Upload company logo (max 1 MB)</p> */}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6 mb-3">
            <label>Company Name </label>
            <input
              type="text"
              className="form-control"
              value={markupObject.quotCompanyName}
              onChange={(e) => {
                setMarkupObject((prevState) => ({
                  ...prevState,
                  quotCompanyName: e.target.value,
                }));
                dispatch(
                  setQuotationFormData("quotCompanyName", e.target.value)
                );
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotCompanyName");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "quotCompanyName",
                  markupObject.quotCompanyName,
                  ["required", { regex: /^[a-zA-Z0-9\s&.,'()-]+$/ }],
                  {
                    messages: {
                      required: "Please enter company name",
                      regex: "Enter valid company name",
                    },
                  }
                )}
            </>
          </div>
          <div className="col-sm-6 mb-3">
            <label>Corporate Office Address</label>
            <input
              type="text"
              className="form-control"
              value={markupObject.quotCorporateOffice}
              onChange={(e) => {
                setMarkupObject((prevState) => ({
                  ...prevState,
                  quotCorporateOffice: e.target.value,
                }));
                dispatch(
                  setQuotationFormData("quotCorporateOffice", e.target.value)
                );
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotCorporateOffice");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "quotCorporateOffice",
                  markupObject.quotCorporateOffice,
                  ["required", { regex: /^[a-zA-Z0-9\s,.()-]+$/ }],
                  {
                    messages: {
                      required: "Please enter corporate office",
                      regex: "Enter valid corporate office",
                    },
                  }
                )}
            </>
          </div>

          <div className="col-sm-6  mb-3">
            <label>Regional Office Address</label>
            <input
              type="text"
              value={markupObject.quotRegionalOffice}
              onChange={(e) => {
                setMarkupObject((prevState) => ({
                  ...prevState,
                  quotRegionalOffice: e.target.value,
                }));
                dispatch(
                  setQuotationFormData("quotRegionalOffice", e.target.value)
                );
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotRegionalOffice");
              }}
              className="form-control"
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "quotRegionalOffice",
                  markupObject.quotRegionalOffice,
                  ["required", { regex: /^[a-zA-Z0-9\s,.()-]+$/ }],
                  {
                    messages: {
                      required: "Please enter regional office",
                      regex: "Enter valid regional office",
                    },
                  }
                )}
            </>
          </div>
          <div className="col-sm-6  mb-3">
            <label>Hotline </label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              maxLength={10}
              value={markupObject.quotCompanyHotline}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setMarkupObject((prevState) => ({
                    ...prevState,
                    quotCompanyHotline: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData(
                      "quotCompanyHotline",
                      event.target.value
                    )
                  );
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotCompanyHotline");
              }}
            />

            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "quotCompanyHotline",
                  markupObject.quotCompanyHotline,
                  ["required"],
                  {
                    messages: {
                      required: "Please enter company hotline number ",
                    },
                  }
                )}
            </>
          </div>
          <div className="col-sm-6  mb-3">
            <label>Email </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              value={markupObject.quotCompanyEmail}
              onChange={(e) => {
                setMarkupObject((prevState) => ({
                  ...prevState,
                  quotCompanyEmail: e.target.value,
                }));
                dispatch(
                  setQuotationFormData("quotCompanyEmail", e.target.value)
                );
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotCompanyEmail");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "quotCompanyEmail",
                  markupObject.quotCompanyEmail,
                  ["required", "email"],
                  {
                    messages: {
                      required: "Please enter company email",
                      email: "Enter valid company email",
                    },
                  }
                )}
            </>
          </div>
          <div className="col-sm-6  mb-3">
            <label>Website</label>

            <input
              type="text"
              className="form-control"
              value={markupObject.quotCompanyWebsite}
              onChange={(e) => {
                setMarkupObject((prevState) => ({
                  ...prevState,
                  quotCompanyWebsite: e.target.value,
                }));
                dispatch(
                  setQuotationFormData("quotCompanyWebsite", e.target.value)
                );
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotCompanyWebsite");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "quotCompanyWebsite",
                  markupObject.quotCompanyWebsite,
                  [
                    "required",
                    {
                      regex:
                        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,}(\/.*)?$/,
                    },
                  ],
                  {
                    messages: {
                      required: "Please enter company website ",
                      regex: "Enter valid company website",
                    },
                  }
                )}
            </>
          </div>
        </div>

        <div className="form-group row"></div>

        <div className="form-group row"></div>

        <div className="form-group row"></div>
        {/* <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        /> */}
        <div
          className="modal fade"
          id="imageModal"
          tabIndex="-1"
          style={{ display: "none" }}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Image
                </h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={logoImage} style={{ width: "200px" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MarkupForm;
