<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Stock_controller;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\otp_login_page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


use App\Http\Controllers\PdfController;

use App\Http\Controllers\SalesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\User;


// ✅ LOGOUT
Route::post('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['status' => 'logged_out']);
})->withoutMiddleware(['auth']);


Route::get('/login', [AuthenticatedSessionController::class, 'edit']);

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit']);
    Route::patch('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);

    Route::post('/sales-create', [SalesController::class, 'Store_sales']);
    Route::get('/sales-get', [SalesController::class, 'Sales_my']);
    Route::get('/sales-get-by-id/{id}', [SalesController::class, 'Sales_get_value_in_db']);
    Route::put('/sales-update/{id}', [SalesController::class, 'Sales_update']);
    Route::delete('/sales-delete/{id}', [SalesController::class, 'Sales_delete']);

    Route::post('/stock-create', [Stock_controller::class, 'Store_Stock']);
    Route::get('/stock-get', [Stock_controller::class, 'Stock_my']);
    Route::get('/stock-get-by-id/{id}', [Stock_controller::class, 'Stock_get_value_in_db']);
    Route::put('/stock-update/{id}', [Stock_controller::class, 'Stock_update']);
    Route::delete('/stock-delete/{id}', [Stock_controller::class, 'Stock_delete']);

    Route::get('/download-pdf/{id}', [PdfController::class, 'downloadPDF']);

    // Your React entry
    Route::get('/{any}', function () {
        return view('app'); // or 'welcome'
    })->where('any', '.*');
});


Route::post('/send-otp', [otp_login_page::class, 'generate_otp'])->middleware('guest');
Route::post('/confirm-otp', [otp_login_page::class, 'confirm_otp']);

// ✅ LOGIN
Route::post('/login-check', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['status' => 'error', 'message' => 'User not registered'], 401);
    }

    if (!Hash::check($request->password, $user->password)) {
        return response()->json(['status' => 'error', 'message' => 'Invalid password'], 401);
    }

    Auth::login($user);
    $request->session()->regenerate();

    return response()->json(['status' => 'success', 'message' => 'Login successful']);
});



require __DIR__ . '/auth.php';
