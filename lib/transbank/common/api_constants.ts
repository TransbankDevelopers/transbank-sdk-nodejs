/**
 * Contains the Webpay and Oneclick URLs base.
 */
enum ApiConstants {
  WEBPAY_ENDPOINT = '/rswebpaytransaction/api/webpay/v1.2',
  ONECLICK_ENDPOINT = '/rswebpaytransaction/api/oneclick/v1.2',
  PATPASS_COMERCIO_ENDPOINT = '/restpatpass/v1/services',

  BUY_ORDER_LENGTH = 26,
  SESSION_ID_LENGTH = 61,
  RETURN_URL_LENGTH = 255,
  AUTHORIZATION_CODE_LENGTH = 6,
  CARD_EXPIRATION_DATE_LENGTH = 5,
  CARD_NUMBER_LENGTH = 19,
  TBK_USER_LENGTH = 40,
  USER_NAME_LENGTH = 40,
  COMMERCE_CODE_LENGTH = 12,
  TOKEN_LENGTH = 64,
  EMAIL_LENGTH = 100,
}

export default ApiConstants;
