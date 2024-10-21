export const ONECLICK_MALL_TRANSACTION_STATUS_RESPONSE_MOCK = {
    vci: "TSY",
    buy_order: "1643997337",
    session_id: "1134425622",
    card_detail: {
        card_number: "6623"
    },
    accounting_date: "0731",
    transaction_date: "2021-07-31T23:31:14.249Z",
    details: [
        {
            amount: 1000,
            status: "AUTHORIZED",
            authorization_code: "1213",
            payment_type_code: "VN",
            response_code: 0,
            installments_number: 0,
            commerce_code: "597055555536",
            buy_order: "500894028"
        },
        {
            amount: 2000,
            status: "AUTHORIZED",
            authorization_code: "1213",
            payment_type_code: "VN",
            response_code: 0,
            installments_number: 0,
            commerce_code: "597055555537",
            buy_order: "1936357040"
        }
    ]
};

export const ONECLICK_MALL_TRANSACTION_CAPTURE_RESPONSE_MOCK = 
{
    authorization_code: "1213",
    authorization_date: "2021-07-31T23:31:14.249Z",
    captured_amount: 1000,
    response_code: 0
};


