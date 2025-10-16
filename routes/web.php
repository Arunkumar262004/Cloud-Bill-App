<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Stock_controller;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


use App\Http\Controllers\PdfController;

use App\Http\Controllers\SalesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\User;



Route::get('/login', [AuthenticatedSessionController::class, 'edit'])->name('profile.edit');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

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

Route::post('/login-check', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['status' => 'error', 'message' => 'User not registered']);
    }

    if (!Hash::check($request->password, $user->password)) {
        return response()->json(['status' => 'error', 'message' => 'Invalid password']);
    }

    Auth::login($user);
    $request->session()->regenerate();

    return response()->json(['status' => 'success']);
});

// Logout API
Route::post('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['status' => 'logged_out']);
});

require __DIR__ . '/auth.php';

// Your React entry
Route::get('/{any}', function () {
    return view('app'); // or 'welcome'
})->where('any', '.*');
