import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sales_my = ({ base_url }) => {

    var [input, SetInput] = useState([]);
    var location = useLocation();

    function delete_by_id(delete_id) {
        axios.delete(base_url + `/sales-delete/${delete_id}`).then(() => {
            toast.success('Sales Entry Deleted Successfully')
            axios.get(base_url + '/sales-get').then((res) => {
                SetInput(res.data.data)
            })
        })
    }



    useEffect(() => {

        if (location.state?.type == "success") {
            toast.success(location.state.message)
        } else if (location.state?.type == "failed") {
            toast.error(location.state.message)
        }
        axios.get(base_url + '/sales-get').then((res) => {
            SetInput(res.data.data)
        })


    }, [base_url, location.state])

    
    const downloadPDF = (id) => {
        window.open(`${base_url}/download-pdf/${id}`, "_blank"); // opens PDF for download
    };

    return (
        <div className="container">
            <h5 className="mt-3">Sales My Page</h5>
            <span>View And Update Your sales Here   ! </span>
            <Link to={'/sales-add'} className="btn btn-primary float-end">Create Bill</Link>
            <hr className="mt-4" />
            <div className="row">
                <div className="col"></div>
            </div>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                    <tr >
                        <th>Id</th>
                        <th>Customer Name</th>
                        <th>Product Name</th>
                        <th>Product Code</th>
                        <th>Qty</th>
                        <th>Action</th>
                        <th>Print</th>


                    </tr>
                </thead>
                <tbody>
                    {input.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.customer_name}</td>
                            <td>{sale.product_name}</td>
                            <td>{sale.product_code}</td>
                            <td>{sale.product_qty}</td>
                            <td>
                                <Link to={`/sales-edit/${sale.id}`} className="btn btn-success me-2">Update</Link>
                                <button onClick={() => { delete_by_id(sale.id) }} className="btn btn-danger ml-2">Delete</button>

                            </td>
                            <td>
                                <button onClick={() => downloadPDF(sale.id)} className="">
                                    <i className="bi bi-printer-fill fs-2 border-0 bg-transparent focus:outline-none"></i> 
                                </button>

                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
            <div>
                <ToastContainer
                    pauseOnHover
                    autoClose={3000}
                    position="top-right"
                />
            </div>
        </div>
    )
}

export default Sales_my;