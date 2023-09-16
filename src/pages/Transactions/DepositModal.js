import React from "react";
import { Modal, Form, message, Input } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../apicalls/transactions";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const stripeKey =
    "pk_test_51NaIlXHxDNCY4XxzB5SjnM4V1DOMzQCjDaBUr0NS2Jzum9naR1BmeNuhPD7f2xTRT9vBgP4qEwS97RCsVnuLDvML00QAFRSIAP";
  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await DepositFunds({
        token,
        amount: form.getFieldValue("amount"),
      });
      dispatch(HideLoading());
      if (response.success) {
        reloadData();
        setShowDepositModal(false);
        message.success(response.message);
        return;
      } else {
        message.error(response.message);
        return;
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
      return;
    }
  };

  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <div className="flex-col gap-1">
      <small style={{color:"red"}}>you will be charge $0.35</small>
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button className="primary-outlined-btn">Cancel</button>
            <StripeCheckout
              token={onToken}
              usd="usd"
              amount={form.getFieldValue("amount") * 100}
              shippingAddress
              stripeKey={stripeKey}
            >
              <button className="primary-contained-btn">Deposit</button>
            </StripeCheckout>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default DepositModal;
