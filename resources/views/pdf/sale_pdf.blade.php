<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sale #{{ $sale->id }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        h2 { text-align: center; }
    </style>
</head>
<body>
    <h2>Sales Bill #{{ $sale->id }}</h2>
    <table>
        <tr><th>Customer Name</th><td>{{ $sale->customer_name }}</td></tr>
        <tr><th>Product Name</th><td>{{ $sale->product_name }}</td></tr>
        <tr><th>Product Code</th><td>{{ $sale->product_code }}</td></tr>
        <tr><th>Quantity</th><td>{{ $sale->product_qty }}</td></tr>
        <tr><th>Date</th><td>{{ $sale->created_at->format('d-m-Y') }}</td></tr>
    </table>
</body>
</html>
