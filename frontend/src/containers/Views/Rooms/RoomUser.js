import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
} from "@coreui/react";
import Spinner from "../../../components/Spinner/Spinner";
import Alert from "../../../components/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { getDevicesInRoom } from "../../../redux/actions/device";
import ModalUser from "../../../components/Modal/ModalUser";
import ModalHistory from "../../../components/Modal/ModalHistory";
// import SensorRoom from "../../../components/Mqtt/SensorRoom";
import CardRoomUser from "../../../components/Mqtt/CardRoomUser";
const RoomUser = ({ match }) => {
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
    {
      key: "history",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "users",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  useEffect(() => {
    dispatch(getDevicesInRoom(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <>
      <CRow>
        <CCol sm={12}>
          {/* <SensorRoom roomId={match.params.id} allDevice={dataList} /> */}
          <CardRoomUser />
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
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  scopedSlots={{
                    history: (item, index) => {
                      return (
                        <td className="py-2">
                          <ModalHistory
                            type="History"
                            title="History"
                            size="lg"
                            color="primary"
                            deviceId={item._id}
                          />
                        </td>
                      );
                    },

                    users: (item, index) => {
                      return (
                        <td className="py-2">
                          <ModalUser
                            type="Users"
                            title="Users"
                            size="sm"
                            color="info"
                            deviceId={item._id}
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

export default RoomUser;
