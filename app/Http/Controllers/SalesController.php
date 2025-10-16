<?php

namespace App\Http\Controllers;

use App\Models\Sales;
use App\Models\Stock;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function Store_sales(Request $request)
    {
        Sales::create([
            'product_name' => $request->product_name,
            'product_code' => $request->product_code,
            'customer_name' => $request->customer_name,
            'product_qty' => $request->product_qty,
            'price' => $request->price
        ]);
       $get_product_qty =   Stock::where('product_name', $request->product_name)->first();
        $get_product_qty->update([
            'stock_qty' => ($get_product_qty->stock_qty - $request->product_qty),
        ]);
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function Sales_my()
    {
        $sales_values =  Sales::all();
        return response()->json([
            'status' => 'ok',
            'data' => $sales_values
        ]);
    }

    public function Sales_get_value_in_db($id)
    {
        $value =  Sales::find($id);

        return response()->json([
            'status' => 'ok',
            'data' => $value
        ]);
    }

    public function Sales_update(Request $request, $id)
    {
        $id = Sales::find($id);
        $id->update([
            'product_name' => $request->product_name,
            'product_code' => $request->product_code,
            'customer_name' => $request->customer_name,
            'product_qty' => $request->product_qty,
            'price' => $request->price

        ]);
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function Sales_delete($id)
    {
        $id = Sales::find($id);
        $id->delete();
    }
}
