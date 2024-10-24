// * DB Changes for shipstation api //
// * Step 1: Modify products table and add the following columns
// & 1.1: weight_value (decimal)
// & 1.2: weight_unit (string)
// & 1.3: length_value (decimal)
// & 1.4: width_value (decimal)
// & 1.5: height_value (decimal)
// & 1.6: dimension_unit (string)

// * Step 2: Modify orders table and add the following columns
// & 2.1: shipstation_order_id (string)
// & 2.2: shipstation_order_status (string)
// & 2.3: shipstation_order_tracking_number (string)
// & 2.4: shipstation_order_tracking_url (string)
// & 2.5: shipstation_order_label (string)
// & 2.6: shipByDate (date)

// * Step 3: Modify Receipt and Receipt Fees table and add the following columns

// * Modify order to have 2 receipts instead of one

// * Shipping Proces of shipstation api //

// * Step 1: Get Rates against the product dimension, weight and seller address
// & call this api POST {{baseUrl}}/shipments/getrates

// * Step 2: Create Order against the selected rate
// & call this api POST {{baseUrl}}/orders/createorder

// * Step 3: Create Label against the created order
// & call this api POST {{baseUrl}}/orders/createlabelfororder

// * Step 4: Listen for the webhook event and update the order status accordingly
