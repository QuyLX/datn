import React, { useEffect } from "react";
import { CDataTable, CBadge } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { getHistories } from "../../../redux/actions/history";
import Spinner from "../../../components/Spinner/Spinner";
import Alert from "../../../components/Alert/Alert";

const Histories = () => {
  const dispatch = useDispatch();
  const historyList = useSelector((state) => state.historyList);
  const { loading, error, data } = historyList;
  useEffect(() => {
    dispatch(getHistories());
  }, [dispatch]);
  const fields = [
    { key: "user", _style: { width: "20%" } },
    { key: "typeAction", _style: { width: "20%" } },
    { key: "state", _style: { width: "20%" } },
    { key: "device", _style: { width: "20%" } },
    { key: "createdAt", _style: { width: "20%" } },
  ];
  const getBadge = (state) => {
    switch (state) {
      case "on":
        return "success";
      case "off":
        return "danger";
      default:
        return "primary";
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="danger" msg={error.message} />
      ) : (
        <CDataTable
          items={data && data.data}
          fields={fields}
          columnFilter
          tableFilter
          footer
          itemsPerPageSelect
          itemsPerPage={10}
          hover
          sorter
          pagination
          scopedSlots={{
            state: (item) => (
              <td>
                <CBadge color={getBadge(item.state)}>
                  {item.state === "on" ? "Bật" : item.state === "off" ? "Tắt" : "Cập nhật"}
                </CBadge>
              </td>
            ),
            device: (item) => (
              <td>
                <b>{item.deviceName}</b>{" "}
              </td>
            ),
          }}
        />
      )}
    </>
  );
};

export default React.memo(Histories);
