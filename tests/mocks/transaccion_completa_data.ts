export const FULL_TX_MALL_TRANSACTION_STATUS_RESPONSE_MOCK = {
    details: [
     {
        amount: 1922,
        status: "AUTHORIZED",
        authorization_code: "1213",
        payment_type_code: "VN",
        response_code: 0,
        installments_number: 0,
        commerce_code: "597055555574",
        buy_order: "O-36681"
     },
     {
        amount: 1922,
        status: "AUTHORIZED",
        authorization_code: "1213",
        payment_type_code: "VN",
        response_code: 0,
        installments_number: 0,
        commerce_code: "597055555575",
        buy_order: "O-36682"
       }
    ],
    buy_order: "O-99701",
    session_id: "S-23531",
    card_detail: {
     card_number: "6623"
    },
    accounting_date: "0822",
    transaction_date: "2024-08-23T00:15:56.920Z"
};

export const FULL_TX_MALL_TRANSACTION_CAPTURE_RESPONSE_MOCK = 
{
    authorization_code: "1213",
    authorization_date: "2021-07-31T23:31:14.249Z",
    captured_amount: 1000,
    response_code: 0
};


