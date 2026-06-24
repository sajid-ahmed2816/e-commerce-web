import React, { useState, useEffect, Fragment, useCallback } from 'react';
import OrderServices from '../api/order/OrderServices';
import useAuth from '../hooks/useAuth';
import toastify from '../components/Toastify';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faCashRegister, faEye, faLocationDot, faPhone, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard, faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import { Modal, Spinner } from 'react-bootstrap';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isOrderDetailDialogOpen, setIsOrderDetailDialogOpen] = useState(false);
  const { userId } = useAuth();

  const handleOrderDetailDialog = () => {
    setIsOrderDetailDialogOpen(prev => !prev);
  }

  const getOrders = useCallback(async () => {
    const params = {
      page: 1,
      limit: 10,
      user: userId
    };
    try {
      const result = await OrderServices.getOrderds(params);
      if (result.status) {
        setOrders(result?.data?.orders);
      }
    } catch (error) {
      toastify.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const getOrderDetailById = async (id) => {
    setIsDetailLoading(true);
    handleOrderDetailDialog();
    try {
      const result = await OrderServices.getOrderDetailById(id);
      if (result.status) {
        setOrder(result?.data?.order);
      }
    } catch (error) {
      toastify.error(error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <Fragment>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOrderDetailDialogOpen}
        onHide={handleOrderDetailDialog}
      >
        {isDetailLoading ? (
          <Modal.Body
            style={{
              height: "calc(100vh - 400px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner animation='grow' />
          </Modal.Body>
        ) : (
          <Fragment>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Order Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row g-3'>
                {/* Left Column: Customer & Address */}
                <div className='col-6'>
                  <div className='shadow rounded' style={{ padding: "24px", height: '100%' }}>
                    <h6>
                      Customer Details
                    </h6>
                    <hr style={{ mb: 2 }} />
                    <div className='row g-2'>
                      <div className='col-12'>
                        <div style={{ fontSize: "14px" }}>
                          Name
                        </div>
                        <div style={{ fontSize: "16px" }}>
                          {order?.customer?.name}
                        </div>
                      </div>
                      <div className='col-12'>
                        <div style={{ fontSize: "14px" }}>
                          Email
                        </div>
                        <div style={{ fontSize: "16px" }}>{order?.customer?.email}</div>
                      </div>
                      <div className='col-12'>
                        <div style={{ fontSize: "14px" }}>
                          Mobile
                        </div>
                        <div style={{ fontSize: "16px" }}>{order?.customer?.mobile}</div>
                      </div>
                      <div className='col-12'>
                        <div style={{ fontSize: "14px" }}>
                          Billing Address
                        </div>
                        <div style={{ fontSize: "16px" }}>
                          {order?.customer?.billingAddress}, {order?.city}, {order?.state}, {order?.country}
                        </div>
                      </div>
                      <div className='col-12'>
                        <div style={{ fontSize: "14px" }}>
                          Order Date
                        </div>
                        <div style={{ fontSize: "16px" }}>
                          {new Date(order?.customer?.orderDate).toLocaleString("en-GB", {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true // or false for 24-hour format
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Summary */}
                <div className='col-6'>
                  <div className='shadow rounded' style={{ padding: "24px", height: '100%' }}>
                    <h6>
                      Order Summary
                    </h6>
                    <hr style={{ mb: 2 }} />
                    <div className='row g-2'>
                      <div className='col-6'>
                        <div style={{ fontSize: "14px" }}>
                          Subtotal
                        </div>
                        <div style={{ fontSize: "14px" }}>Rs. {order?.summary?.subtotal}</div>
                      </div>
                      <div className='col-6'>
                        <div style={{ fontSize: "14px" }}>
                          Delivery Charge
                        </div>
                        <div style={{ fontSize: "14px" }}>Rs. {order?.summary?.deliveryCharge}</div>
                      </div>
                      <div className='col-12'>
                        <hr style={{ my: 1 }} />
                        <div style={{ fontSize: "14px" }}>
                          Total
                        </div>
                        <h6>
                          Rs. {parseFloat(Number(order?.summary?.subtotal) + Number(order?.summary?.deliveryCharge)).toFixed(2)}
                        </h6>
                      </div>
                      <div className='col-12'>
                        <div style={{ fontSize: "14px" }}>
                          Order #
                        </div>
                        <div style={{ fontSize: "14px", wordBreak: 'break-all' }}>
                          {order?.orderNo}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className='col-12'>
                  <div className='shadow rounded' style={{ padding: "24px" }}>
                    <h6>
                      Order Items
                    </h6>
                    <hr style={{ mb: 2 }} />
                    <div className='table-container'>
                      <table className='table align-middle'>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th align="center">Image</th>
                            <th align="right">Quantity</th>
                            <th align="right">Price (each)</th>
                            <th align="right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order?.items?.map((item, index) => (
                            <tr key={item._id}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  src={item?.product ? item.product?.image : ""}
                                  alt={item?.product ? item.product?.name : ""}
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "contain",
                                  }}
                                />
                              </td>
                              <td>
                                {item.product ? item.product.name : 'Product deleted'}
                              </td>
                              <td align="right">{item.quantity}</td>
                              <td align="right">Rs. {item.priceEach}</td>
                              <td align="right">Rs. {item?.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Fragment>
        )}
      </Modal>
      <section className='orders'>
        <div className='container'>
          <div className='row g-3'>
            <div className='col-12'>
              <h3 className=''>Your Orders</h3>
            </div>
            {isLoading ? (
              <div className='col-12'>
                <Loader />
              </div>
            ) : orders.length > 0 ? orders?.map((order, ind) => (
              <div className='col-12' key={order._id}>
                <div className='shadow rounded p-3'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='flex-1 d-flex align-items-center gap-3'>
                      <p className='m-0'>{ind + 1}.</p>
                      <p className='m-0 d-flex align-items-center gap-2'><FontAwesomeIcon icon={faReceipt} /><span>{order?.orderNo}</span></p>
                      <p className='m-0 d-flex align-items-center gap-2'><FontAwesomeIcon icon={faPhone} /><span>{order?.mobile}</span></p>
                      <p className='m-0 d-flex align-items-center gap-2'><FontAwesomeIcon icon={faCartArrowDown} /><span>{order?.productCount}</span></p>
                      <p className='m-0 d-flex align-items-center gap-2'><FontAwesomeIcon icon={faCreditCard} /><span>{order?.total}</span></p>
                      <p className='m-0 d-flex align-items-center gap-2'><FontAwesomeIcon icon={faCashRegister} /><span>{order?.paymentMethod === "cod" ? "Cash on Delivery" : order?.paymentMethod === "online" ? "Online Payment" : "-"}</span></p>
                      <p className='m-0 d-flex align-items-center gap-2'><FontAwesomeIcon icon={faLocationDot} /><span>{order?.city},</span></p>
                      <p className='m-0'>{order?.state},</p>
                      <p className='m-0'>{order?.country}</p>
                      <p className={`m-0 d-flex align-items-center gap-2 ${order?.status === "pending" ? "text-warning" : order?.status === "delivered" ? "text-success" : order?.status === "canceled" ? "text-danger" : "text-dark"}`}
                        style={{
                          fontSize: "14px",
                          padding: "4px 12px",
                          borderRadius: "32px",
                          border: `1px solid ${order?.status === "pending" ? "#ffc107" : order?.status === "delivered" ? "#198754" : order?.status === "canceled" ? "#dc3545" : "#000000"}`
                        }}
                      >
                        <FontAwesomeIcon icon={faHourglassHalf} />
                        <span>
                          {order?.status}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => getOrderDetailById(order._id)}
                      className='primary-button'
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%"
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className='col-12'>
                <p className='m-0 text-center'>No orders found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Orders;