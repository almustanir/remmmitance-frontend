import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TranserFundsModal from "../Transactions/TransferFundsModal";
import DepositModal from "../Transactions/DepositModal";
import Modals from "../../components/Modal-Transcation/ForRequestsPage";
import NewRequestModal from "../Requests/NewRequestModal";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

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
  const [data, setData] = React.useState([]);
  const [showTransferFundsModal, setShowTransferFundsModal] =
    React.useState(false);
  const [showDepositModal, setShowDepositModal] = React.useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = React.useState(false);

  const dispatch = useDispatch();

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
              Hello  ${user.firstName}!
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

      <div
        className="flex-col justify-around gap-1 mt-2 mb-2 uppercase account-info card w100 h-100 br-3 card-noShadow"
        style={{
          alignItems: "start",
          // width: "85%",
          backgroundColor: "#219ebc",
        }}
      >
        <div
          className="flex m-1"
          style={{
            flexWrap: "wrap",
            backgroundColor: "#000",
            border: "2px solid black",
            borderRadius: "10px",
          }}
        >
          <h1
            className="text-white text-md"
            style={{ paddingRight: "10px", backgroundColor: "#000" }}
          >
            Account Number :
          </h1>
          <h1 className="text-white text-md">{user.id}</h1>
        </div>
        <div
          className="flex m-1"
          style={{
            flexWrap: "wrap",
            backgroundColor: "#000",
            border: "2px solid black",
            borderRadius: "10px",
          }}
        >
          <h1 className="text-white text-md" style={{ paddingRight: "15px" }}>
            Balance :
          </h1>
          <h1 className="text-white text-md">
            {user.countryInfo?.currencySymbol || ""}{" "}
            {user.balance?.toFixed(2) || 0}
            {user.countryInfo?.currencyCode || ""}
          </h1>
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
        >
          Request Funds
        </button>

        <button
          className="primary-outlined-btn"
          onClick={() => setShowDepositModal(true)}
        >
          Deposit Funds
        </button>

        <button
          className="primary-outlined-btn"
          onClick={() => setShowTransferFundsModal(true)}
        >
          Transfer Funds
        </button>
      </div>

      <div className="general-btns-home">
        <div className="general-btn">
          <button>
            Buy Airtime <i class="ri-arrow-left-down-line"></i>
          </button>
          <button>
            Buy Data <i class="ri-database-line"></i>
          </button>
          <button>
            Betting <i class="ri-football-line"></i>
          </button>
        </div>
        <div className="general-btn">
          <button>
            Electricity <i class="ri-lightbulb-flash-line"></i>
          </button>
          <button>
            Internet <i class="ri-ie-line"></i>
          </button>
          <button>
            Tv <i class="ri-tv-line"></i>
          </button>
        </div>
        <div className="general-btn">
          <button>
            Shopping <i class="ri-store-line"></i>
          </button>
          <button>
            Travel & Hotel <i class="ri-ancient-pavilion-line"></i>
          </button>
          <button>
            Bank Card <i class="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
