import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
} from "@coreui/react";
import Spinner from "../../../components/Spinner/Spinner";
import Alert from "../../../components/Alert/Alert";
import Modal from "../../../components/Modal/Modal";
import FormDevice from "../../FormSubmit/FormDevice";
import { useDispatch, useSelector } from "react-redux";
import {
  getDevicesInRoom,
  deleteDevice,
  getDevices,
} from "../../../redux/actions/device";
const Room = ({ match }) => {
  const dispatch = useDispatch();
  const deviceListInRoom = useSelector((state) => state.deviceListInRoom);
  const { data: dataList, loading, error } = deviceListInRoom;
  const fields = [
    { key: "name", _style: { width: "20%" } },
    {
      key: "description",
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
    dispatch(getDevicesInRoom(match.params.id));
    dispatch(getDevices());
  }, [dispatch, match.params.id]);
  return (
    <>
      <CRow>
        <CCol sm={12}>
          <Modal
            type="Add device in this room"
            title="Device info"
            body={<FormDevice roomId={match.params.id} />}
            size="lg"
            color="info"
          />
        </CCol>
        <CCol sm={12}>
          <CCard>
            <CCardHeader>
              <span className="h4">List devices in this room</span>
            </CCardHeader>
            <CCardBody>
              {loading ? (
                <Spinner />
              ) : error ? (
                <Alert color="danger" msg={error.message} />
              ) : (
                <CDataTable
                  items={dataList.data}
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
                                state={item.state}
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
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Room;
