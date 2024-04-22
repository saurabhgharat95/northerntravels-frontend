import { useEffect, useState, useRef } from "react";
import {
  axios,
  SimpleReactValidator,
  toast,
  ToastContainer,
} from "../components/CommonImport";
import { FETCH_BEFORE_MARKUP_AMT_API } from "../utils/constants";
import "react-toastify/dist/ReactToastify.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuotationFormData } from "../utils/store";

const MarkupForm = () => {
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes
  const logofileInputRef = useRef(null);
  const companyLogofileInputRef = useRef(null);
  const [markupObject, setMarkupObject] = useState({
    quotBeforeMarkup: "",
    quotMarkup: "",
    quotAfterMarkup: "",
    quotCompanyName: "",
    quotCorporateOffice: "",
    quotRegionalOffice: "",
    quotCompanyHotline: "",
    quotCompanyEmail: "",
    quotCompanyWebsite: "",
    quotLogo: "",
    quotCompanyLogo: "",
  });

  const [, setForceUpdate] = useState(0);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );

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
          let markup = response.data.data;

          setMarkupObject((prevState) => ({
            ...prevState,
            quotBeforeMarkup: markup.itineraryQuotAmt,
          }));
          dispatch(
            setQuotationFormData("quotBeforeMarkup", markup.itineraryQuotAmt)
          );
        }
      }
    } catch (e) {}
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    try {
      if (file) {
        console.log('filesize',file.size)
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
            if( e.target.result){
              dispatch(setQuotationFormData("quotLogo", e.target.result));
            }
          };

          reader.readAsDataURL(file);
        }
      // }
    } catch (e) {
      console.log("err", e);
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
          if( e.target.result){
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
  }, [markupObject.quotBeforeMarkup, markupObject.quotMarkup]);

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
        <h3>Markup</h3>
        <br></br>
        <br></br>
        <br></br>

        <div className="form-group row">
          <div className="col-sm-4">
            <label>Before Markup (Rs.)</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter Before Markup (Rs.)"
              value={markupObject.quotBeforeMarkup}
              disabled
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setMarkupObject((prevState) => ({
                    ...prevState,
                    quotBeforeMarkup: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData("quotBeforeMarkup", event.target.value)
                  );
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotBeforeMarkup");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotBeforeMarkup",
                markupObject.quotBeforeMarkup,
                ["required"],
                {
                  messages: {
                    required: "Please enter before markup amount",
                  },
                }
              )}
            </>
          </div>
          <div className="col-sm-4">
            <label>Markup (Rs.)</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter Markup (Rs.)"
              value={markupObject.quotMarkup}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setMarkupObject((prevState) => ({
                    ...prevState,
                    quotMarkup: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData("quotMarkup", event.target.value)
                  );
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotMarkup");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotMarkup",
                markupObject.quotMarkup,
                ["required"],
                {
                  messages: {
                    required: "Please enter  markup amount",
                  },
                }
              )}
            </>
          </div>
          <div className="col-sm-4">
            <label>After Markup (Rs.)</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              disabled
              placeholder="Enter After Markup (Rs.)"
              value={markupObject.quotAfterMarkup}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setMarkupObject((prevState) => ({
                    ...prevState,
                    quotAfterMarkup: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData("quotAfterMarkup", event.target.value)
                  );
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotAfterMarkup");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotAfterMarkup",
                markupObject.quotAfterMarkup,
                ["required"],
                {
                  messages: {
                    required: "Please enter after markup amount",
                  },
                }
              )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Logo</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            
            />
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
                  ["required", { regex: /^[A-Za-z\s&-]+$/ }],
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
            <label>Corporate Office </label>
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
                  ["required", { regex: /^[A-Za-z\s&-]+$/ }],
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
            <label>Regional Office</label>
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
                  ["required", { regex: /^[A-Za-z\s&-]+$/ }],
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
                  ["required", "url"],
                  {
                    messages: {
                      required: "Please enter company website ",
                      url: "Enter valid company website",
                    },
                  }
                )}
            </>
          </div>
        </div>

        <div className="form-group row"></div>

        <div className="form-group row"></div>

        <div className="form-group row"></div>
        <ToastContainer />
      </section>
    </>
  );
};
export default MarkupForm;
