const generateVerificationEmailHTML = (name, verifyCode) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f4; padding:24px 0;">
    <tr>
      <td align="center">
        <!-- container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.08);">
          
          <!-- header -->
          <tr>
            <td style="background: linear-gradient(90deg, #3D5A80 0%, #2f4763 100%); padding:20px 24px; text-align:left;">
              <h1 style="margin:0; color:#fff; font-size:20px; letter-spacing:0.2px; text-align: center;">Agent</h1>
            </td>
          </tr>

          <!-- body -->
          <tr>
            <td style="padding:28px 24px; text-align:left; color:#333;">
              <p style="margin:0 0 12px 0; font-size:16px;">Hi <strong>${name}</strong>,</p>

              <p style="margin:0 0 18px 0; font-size:15px; color:#555;">
                Use the verification code below to verify your email address.
              </p>
              <div style="text-align: center;">
              <div style="display:inline-block; padding:16px 22px; border-radius:8px; font-size:22px; font-weight:700; letter-spacing:2px; background:#eef3f8; color:#1d2b3d; border:2px dashed #3D5A80; margin:12px 0;">
                ${verifyCode}
              </div>
              </div>
              <p style="margin:18px 0 8px 0; font-size:14px; color:#666;">
                This code is valid for <strong>1 hour</strong>. If you didn't request this, you can ignore this email.
              </p>

              <p style="margin:0; font-size:14px; color:#666;">
                Need help? Reply to this email and our team will assist you.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#fafafa; padding:16px 24px; font-size:12px; color:#888; text-align:center;">
              <div style="margin-bottom:6px;">Agent  — keeping your account safe</div>
              <div>If you did not request this, you can safely ignore this message.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const generateWelcomeEmailHTML = (name) => {
  return`
  HI Test
  `
};

export{
  generateVerificationEmailHTML,
  generateWelcomeEmailHTML
};