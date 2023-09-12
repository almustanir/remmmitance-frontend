import React, { useEffect } from 'react'

const Modals = ({dataSource, items}) => {

  if(dataSource !== []){console.log(dataSource, items);
}
  return (
    <>
      {(dataSource)
        ? <div>
        {dataSource.map((transaction, index) => (
          <div key={index} className="modal-replace">
            {items.map((item, itemIndex) => (
              <div key={itemIndex} className="modal-replace-item">
                <div className="modal-replace-item-title">{item.title}:</div>
                <div className="modal-replace-item-value">
                  {item.render
                    ? item.render(transaction[item.dataIndex], transaction)
                    : transaction[item.dataIndex]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>:<></>}
    </>
  );
};

export default Modals;







