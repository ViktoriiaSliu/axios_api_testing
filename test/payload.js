export function buildBookingPayload({
  firstname = 'John',
  lastname = 'Doe',
  totalprice = 150,
  depositpaid = true,
  checkin = '2025-08-01',
  checkout = '2025-08-05',
  additionalneeds = 'Breakfast',
} = {}) {
  return {
    firstname,
    lastname,
    totalprice,
    depositpaid,
    bookingdates: {
      checkin,
      checkout,
    },
    additionalneeds,
  };
}
