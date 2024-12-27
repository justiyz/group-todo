module.exports = {
    successResponse: (message, data = null, token, expires_at) => {
      return {
        status: 'success',
        message: message,
        code: 200,
          data: {
            user_id: data.user_id,
            id: data.id,
            title: data.title,
            first_name: data.first_name,
            last_name: data.last_name,
            middle_name: data.middle_name,
            phone_number: data.phone_number,
            email: data.email,
            gender: data.gender,
            date_of_birth: data.date_of_birth,
            address: data.address,
            image_url: data.image_url,
            verification_text: data.verification_text,
            verification_token_expires: data.verification_token_expires,
            pin: data.pin,
            is_verified_phone_number: data.is_verified_phone_number,
            is_verified_email: data.is_verified_email,
            is_uploaded_selfie_image: data.is_uploaded_selfie_image,
            is_verified_bvn: data.is_verified_bvn,
            is_created_password: data.is_created_password,
            is_created_pin: data.is_created_pin,
            is_completed_kyc: data.is_completed_kyc,
            is_uploaded_identity_card: data.is_uploaded_identity_card,
            referral_code: data.referral_code,
            refresh_token: data.refresh_token,
            fcm_token: data.fcm_token,
            is_deleted: data.is_deleted,
            number_of_children: data.number_of_children,
            marital_status: data.marital_status,
            loan_status: data.loan_status,
            status: data.status,
            device_token: data.device_token,
            next_profile_update: data.next_profile_update,
            unclaimed_reward_points: data.unclaimed_reward_points,
            claimed_reward_points: data.claimed_reward_points,
            cummulative_reward_points: data.cummulative_reward_points,
            created_at: data.created_at,
            updated_at: data.updated_at,              
              token: token,
            token_expires_at: expires_at
    
        }
      };
    },
  
    errorResponse: (message, code = 500) => {
      return {
        status: 'error',
        message: message,
        code: code
      };
    }
  };
  