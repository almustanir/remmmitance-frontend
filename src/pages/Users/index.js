import { message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllUsers, UpdateUserVerifiedStatus } from "../../apicalls/users";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import Modals from "../../components/Modal-Transcation/ForRequestsPage";

function Users() {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers();
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const updateStatus = async (record, isVerified) => {
    try {

      // console.log(record)
      dispatch(ShowLoading());
      const response = await UpdateUserVerifiedStatus({
        selectedUser: record._id,
        isVerified,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const colums = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      render: (text, record) => {
        return text ? "Yes" : "No";
      },
    },
    {
      
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (!record.isAdmin) ? (<div className="flex gap-1">
            {record.isVerified ? (
              <button
                className="primary-outlined-btn"
                onClick={() => updateStatus(record, false)}
              >
                Suspend
              </button>
            ) : (
              <button
                className="primary-outlined-btn"
                onClick={() => updateStatus(record, true)}
              >
                Activate
              </button>
            )}
          </div>) : (<></>);
      },
    },
  ];

  const viewport_width=window.innerWidth;

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <PageTitle title="Users" />
      
      {(viewport_width > 850) ? <Table dataSource={users} columns={colums} className="mt-2" />:<Modals dataSource={users || []} items={colums}></Modals>}

    </div>
  );
}

export default Users;