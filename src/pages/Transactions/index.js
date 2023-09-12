import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { message, Table } from "antd";
import TranserFundsModal from "./TransferFundsModal";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetTransactionsOfUser } from "../../apicalls/transactions";
import moment from "moment";
import DepositModal from "./DepositModal";
import Modals from "../../components/Modal-Transcation/ForRequestsPage";

function Transactions() {
  const [showTransferFundsModal, setShowTransferFundsModal] =
    React.useState(false);
  const [showDepositModal, setShowDepositModal] = React.useState(false);
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        if (record.sender._id == record.receiver._id) {
          return "Deposit";
        } else if (record.sender._id === user.id) {
          return "Debit";
        } else return "Credit";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "",
      render: (text, record) => {
        return record.sender._id === user.id ? (
          <div>
            <h1 className="text-sm">
              {record.receiver.firstName} {record.receiver.lastName}
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="text-sm">
              {record.sender.firstName} {record.sender.lastName}
            </h1>
          </div>
        );
      },
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetTransactionsOfUser();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const func = async () => {await getData();}
    func();
  }, []);

  const viewport_width = window.innerWidth;

  return (
    <div>
      <div className="flex m-2 justify-around items-center transaction-header">
        <PageTitle title="Transactions" />

        {/* <div className="flex transcation-head-buttons gap-1">
          <button
            className="primary-outlined-btn"
            onClick={() => setShowDepositModal(true)}
          >
            Deposit{" "}
          </button>
          <button
            className="primary-outlined-btn"
            onClick={() => setShowTransferFundsModal(true)}
          >
            Transer{" "}
          </button>
        </div> */}
      </div>

      {(viewport_width > 850) ? <Table columns={columns} dataSource={data} className="mt-2" />:<Modals dataSource={data} items={columns}></Modals>}


      {showTransferFundsModal && (
        <TranserFundsModal
          showTransferFundsModal={showTransferFundsModal}
          setShowTransferFundsModal={setShowTransferFundsModal}
          reloadData={getData}
        />
      )}

      {showDepositModal && (
        <DepositModal
          showDepositModal={showDepositModal}
          setShowDepositModal={setShowDepositModal}
          reloadData={getData}
        />
      )}
    </div>
  );
}

export default Transactions;