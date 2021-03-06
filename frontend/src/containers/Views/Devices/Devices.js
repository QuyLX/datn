import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { getDevices, deleteDevice } from "../../../redux/actions/device";
import Spinner from "../../../components/Spinner/Spinner";
import Alert from "../../../components/Alert/Alert";
import Modal from "../../../components/Modal/Modal";
import FormDevice from "../../FormSubmit/FormDevice";
const Devices = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const deviceList = useSelector((state) => state.deviceList);
  const { loading, error, data } = deviceList;
  const fields = [
    { key: "name", _style: { width: "20%" } },
    {
      key: "description",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "config",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "icon",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    { key: "createdAt", _style: { width: "10%" } },
    {
      key: "detail",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "edit",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "delete",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  useEffect(() => {
    dispatch(getDevices());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="danger" msg={error.message} />
      ) : (
        <CRow>
          <CCol sm={12}>
            <CCard>
              <CCardBody>
                <CDataTable
                  items={data.data}
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
                    detail: (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="success"
                            className="mr-1"
                            onClick={() => history.push(`/devices/${item._id}`)}
                          >
                            Detail
                          </CButton>
                        </td>
                      );
                    },
                    edit: (item, index) => {
                      return (
                        <td className="py-2">
                          <Modal
                            type="Update"
                            title="Device update"
                            body={
                              <FormDevice
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                config={item.config}
                                icon={item.icon}
                              />
                            }
                            size="lg"
                            color="primary"
                          />
                        </td>
                      );
                    },
                    delete: (item, index) => {
                      return (
                        <td className="py-2">
                          <Modal
                            type="Delete"
                            title="Device delete"
                            body={
                              <>
                                <b>{`Do you want delete ${item.name}?`}</b>
                                <CButton
                                  color="danger"
                                  onClick={() => {
                                    dispatch(deleteDevice(item._id));
                                  }}
                                  style={{ float: "right" }}
                                >
                                  Delete
                                </CButton>
                              </>
                            }
                            size="sm"
                            color="danger"
                          />
                        </td>
                      );
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default React.memo(Devices);
