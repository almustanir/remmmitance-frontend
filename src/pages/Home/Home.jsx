import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TranserFundsModal from "../Transactions/TransferFundsModal";
import DepositModal from "../Transactions/DepositModal";
import Modals from "../../components/Modal-Transcation/ForRequestsPage";
import NewRequestModal from "../Requests/NewRequestModal";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { message, Tabs, Table } from "antd";
import {
  GetAllRequestsByUser,
  UpdateRequestStatus,
} from "../../apicalls/requests";
import { GetTransactionsOfUser } from "../../apicalls/transactions";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.users);
  const [show, toggleShow] = useState(false);
  const [data, setData] = React.useState([]);
  const [showTransferFundsModal, setShowTransferFundsModal] =
    React.useState(false);
  const [showDepositModal, setShowDepositModal] = React.useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = React.useState(false);

  const dispatch = useDispatch();

  async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}


  const getDataRequest = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllRequestsByUser();

      if (response.success) {
        const sendData = response.data.filter(
          (item) => item.sender._id === user.id
        );

        const receivedData = response.data.filter(
          (item) => item.receiver._id === user.id
        );

        setData({
          sent: sendData,
          received: receivedData,
        });
      }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getDataTrans = async () => {
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

  return (
    <div className="home-component">
      <div className="home-com">
        <div className="home-header bg-secondary">
          <PageTitle
            title={`
              Hello  ${user.firstName } ${user.lastName}!
        `}
          />
        </div>
        <div className="image">
          <Link to="/profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJAH_Ug2f67FkrmwBJKZvzqzd-ZLnTeK6Rp6jYAw&s"
              alt="Girl in a jacket"
            />
          </Link>
        </div>
      </div>
      <div className="card" style={{ marginTop: 70, paddingBottom: 50 }}>
        <div
          className="flex justify-around gap-1 mt-2 mb-2 uppercase account-info w100 h-100 br-3 card-noShadow box-container"
          style={{
            alignItems: "start",
            // width: "85%",
            // backgroundColor: "#164c7e",
          }}
        >
          <div
            className="m-1 box-1"
            style={{
              // flexWrap: "wrap",
              // backgroundColor: "#000",
              // border: "2px solid black",
              borderRadius: "10px",
            }}
          >
            <h1 className="text-2xl" style={{ color: "#48cae4" }}>
              {user.id}
            </h1>
            <h1
              className="text-black text-sm"
              style={{ paddingRight: "10px" }}
              onClick={() => copyTextToClipboard(user.id)}
            >
              Account Number
            </h1>
            <CopyToClipboard text={user.id} onCopy={()=>message.success("Account number copied!")}>
            <i className="ri-file-copy-line" style={{fontSize:'18px',marginTop:10}}></i>
            </CopyToClipboard>
            
          </div>
          <div
            className="m-1 box-1"
            style={{
             
              borderRadius: "10px",
            }}
          >
            <h1 className="text-2xl" style={{ color: "#48cae4" }}>
             { show ? <div>
                {user.countryInfo?.currencySymbol || ""}{" "}
                {user.balance?.toFixed(2) || 0}
                {user.countryInfo?.currencyCode || ""}
              </div>: '******'}
            </h1>
            <h1 className="text-black text-sm" style={{ paddingRight: "15px" }}>
              Balance
            </h1>
            <i
              className={!show ? "ri-eye-line" : "ri-eye-off-line"}
              onClick={() => toggleShow(!show)}
              style={{fontSize:'18px',marginTop:10}}
            ></i>
          </div>
        </div>

        {showNewRequestModal && (
          <NewRequestModal
            showNewRequestModal={showNewRequestModal}
            setShowNewRequestModal={setShowNewRequestModal}
            reloadData={getDataRequest}
          />
        )}
        {showTransferFundsModal && (
          <TranserFundsModal
            showTransferFundsModal={showTransferFundsModal}
            setShowTransferFundsModal={setShowTransferFundsModal}
            reloadData={getDataTrans}
          />
        )}

        {showDepositModal && (
          <DepositModal
            showDepositModal={showDepositModal}
            setShowDepositModal={setShowDepositModal}
            reloadData={getDataTrans}
          />
        )}

        <div className="buttons-home-functional">
          <button
            className="primary-outlined-btn"
            onClick={() => setShowNewRequestModal(true)}
            style={{ backgroundColor: "#023047", color: "#48cae4" }}
          >
            Request Funds
          </button>

          <button
            style={{ backgroundColor: "#023047", color: "#48cae4" }}
            className="primary-outlined-btn"
            onClick={() => setShowDepositModal(true)}
          >
            Deposit Funds
          </button>

          <button
            style={{ backgroundColor: "#023047", color: "#48cae4" }}
            className="primary-outlined-btn"
            onClick={() => setShowTransferFundsModal(true)}
          >
            Transfer Funds
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
