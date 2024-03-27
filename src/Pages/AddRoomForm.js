import Select from "react-select";

const AddRoomForm = () => {
  const options = [
    { value: "1", label: "Jammu & Kashmir Tour" },
    { value: "2", label: "Andaman Tour" },
    { value: "3", label: "North Tour" },
  ];
  return (
    <>
      <section
        id="steps-uid-0-p-0"
        role="tabpanel"
        aria-labelledby="steps-uid-0-h-0"
        class="body current"
        aria-hidden="false"
        style={{ left: "0px" }}
      >
        <h4>Add Hotel Room</h4>
        <br></br>
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Hotel Name</label>
            <Select options={options} placeholder="Select Hotel" />
          </div>
          <div class="col-sm-6">
            <label>Room Type</label>
            <Select options={options} placeholder="Select Room Type" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <label>No. of Rooms</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter No. of Rooms"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1 col-xs-2 col-form-label">AC/Non-AC :</label>
          <br></br>
          <div class="col-sm-1 col-xs-2 mt-2">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="membershipRadios"
                  id="membershipRadios1"
                  value="1"
                  checked
                />
                AC
                <i class="input-helper"></i>
              </label>
            </div>
          </div>
          <div class="col-sm-1 col-xs-2 mt-2">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="membershipRadios"
                  id="membershipRadios2"
                  value="2"
                />
                Non-AC
                <i class="input-helper"></i>
              </label>
            </div>
          </div>
        </div>
        <label>Charges</label>
        <div className="row dt-row">
          <div className="col-sm-12">
            <table
              id="order-listing"
              className="table table-bordered dataTable no-footer custom-table table-responsive"
              aria-describedby="order-listing_info"
            >
              <tr>
                <td></td>
                <td
                  className="text-center border-left border-right"
                  colSpan={4}
                >
                  On Season
                </td>
                <td className="text-center border-right" colSpan={4}>
                  Off Season
                </td>
              </tr>
              <tr>
                <th></th>
                <th
                  className="sorting sorting_asc"
                  aria-controls="order-listing"
                  aria-sort="ascending"
                  aria-label="Order #: activate to sort column descending"
                  style={{ width: "50.016px" }}
                  scope="col"
                >
                  EP
                </th>
                <th
                  className="sorting sorting_asc"
                  aria-controls="order-listing"
                  style={{ width: "50.016px" }}
                  scope="col"
                >
                  CP
                </th>
                <th
                  className="sorting sorting_asc"
                  tabindex="0"
                  aria-controls="order-listing"
                  rowspan="1"
                  colspan="1"
                  aria-sort="ascending"
                  aria-label="Order #: activate to sort column descending"
                  style={{ width: "107.016px" }}
                  scope="col"
                >
                  MAP
                </th>
                <th
                  className="sorting sorting_asc"
                  tabindex="0"
                  aria-controls="order-listing"
                  rowspan="1"
                  colspan="1"
                  aria-sort="ascending"
                  aria-label="Order #: activate to sort column descending"
                  style={{ width: "107.016px" }}
                  scope="col"
                >
                  AP
                </th>
                <th
                  className="sorting sorting_asc"
                  tabindex="0"
                  aria-controls="order-listing"
                  rowspan="1"
                  colspan="1"
                  aria-sort="ascending"
                  aria-label="Order #: activate to sort column descending"
                  style={{ width: "107.016px" }}
                  scope="col"
                >
                  EP
                </th>
                <th
                  className="sorting sorting_asc"
                  tabindex="0"
                  aria-controls="order-listing"
                  rowspan="1"
                  colspan="1"
                  aria-sort="ascending"
                  aria-label="Order #: activate to sort column descending"
                  style={{ width: "107.016px" }}
                  scope="col"
                >
                  CP
                </th>
                <th
                  className="sorting sorting_asc"
                  tabindex="0"
                  aria-controls="order-listing"
                  rowspan="1"
                  colspan="1"
                  aria-sort="ascending"
                  aria-label="Order #: activate to sort column descending"
                  style={{ width: "107.016px" }}
                  scope="col"
                >
                  MAP
                </th>
                <th
                  className="sorting sorting_asc"
                  tabindex="0"
                  aria-controls="order-listing"
                  rowspan="1"
                  colspan="1"
                  aria-sort="ascending"
                  aria-label="Order #: activate to sort column descending"
                  style={{ width: "107.016px" }}
                  scope="col"
                >
                  AP
                </th>
              </tr>
              <tr className="odd">
                <th style={{ width: "171.375px" }}>Room Charges / Dbl Room</th>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
              </tr>
              <tr className="odd">
                <th>Extra Bed Charge</th>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
              </tr>
              <tr className="odd">
                <th>Child Without Bed Charge</th>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
              </tr>
              <tr className="odd">
                <th>Extra Child Below 5 Yrs Charge</th>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
                <td>
                  <input type="number" min="0" value={0} />
                </td>
              </tr>
            </table>
          </div>
        </div>
        <br></br>
       
      </section>
      <br></br>
      <div className="actions clearfix float-right">
        <button
          className="btn btn-secondary"
          onClick={() => {
            selectForm("prev", selectedTab);
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};
export default AddRoomForm;
