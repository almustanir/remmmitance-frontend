import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {

  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const userMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-7-line"></i>,
      onClick: () => {navigate("/home")},
      path: "/home",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line"></i>,
      onClick: () => {navigate("/transactions")},
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line"></i>,
      onClick: () => {navigate("/requests")},
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-profile-line"></i>,
      onClick: () => {navigate("/profile")},
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/display");
      },
      path: "/logout",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-7-line"></i>,
      onClick: () => {navigate("/home")},
      path: "/home",
    },
    {
      title: "Users",
      icon: <i className="ri-user-settings-line"></i>,
      onClick: () => {navigate("/users")},
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line"></i>,
      onClick: () => {navigate("/transactions")},
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line"></i>,
      onClick: () => {navigate("/requests")},
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-profile-line"></i>,
      onClick: () => {navigate("/profile")},
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/display");
      },
      path: "/logout",
    },
  ];

  const menuToRender = user?.isAdmin ? adminMenu : userMenu;
  return (
    <div className="layout">
      <div className="sidebar">
        <div className="menu">
          {(menuToRender.map((item) => {
            const isActive = window.location.pathname === item.path;
            return ( item.title != "Logout") ? <div
                key={item.title}
                className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                onClick={item.onClick}
              >
                {item.icon}
              </div> : <div className="logout-container flex-col" key={item.title} style={{flexGrow:'1', flexBasis:'100%', justifyContent:'end', marginBottom:'80px'}}>
              <div
                key={item.title}
                className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                onClick={item.onClick}
                style={{
                  justifySelf: 'end'
                }}
              >
                {item.icon}
              </div></div>;
          }))}
        </div>
      </div>
      <div className="body m-0">
        <div className="content m-0">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
