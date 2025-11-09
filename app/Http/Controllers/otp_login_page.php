<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Mail;

class otp_login_page extends Controller
{
    public function generate_otp(Request $request)
    {

        $validate_email = User::where('email', $request->email)->first();
        if (is_null($validate_email)) {

            return response()->json([
                "status" => "failed",
                "message" => "Email is not Registered"
            ]);
        } else {
            $otp = rand(10000, 90000);

            User::where('email', $request->email)->first()->update(['otp' => $otp]);

            Mail::send('emails.email-template', ['otp' => $otp], function ($message) use ($request) {
                $message->to($request->email);
                $message->subject('Otp For Your Login');
            });
            return response()->json([
                "status" => "success"
            ]);
        }
    }

    public function confirm_otp(Request $request)
    {

        $validate_email = User::where('email', $request->email)->where('otp', $request->otp)->first();
        if (is_null($validate_email)) {

            return response()->json([
                "status" => "failed"
            ]);
        } else {

            User::where('email', $request->email)->first()->update(['otp' => '0']);
            
            return response()->json([
                "status" => "success"
            ]);
        }
    }
}
