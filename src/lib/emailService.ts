import nodemailer from 'nodemailer'

async function sendMail(subject: string, toEmail: string, emailBody: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  })

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: emailBody,
  }

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

const bodyEmail = async (productName: string, licenseKey: string) => {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 20px;
    }
    .email-container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
    }
    p {
      color: #666;
    }
    .license-key {
      background-color: #0078d4;
      color: #fff;
      padding: 10px;
      border-radius: 5px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1>Your License Key for ${productName}</h1>
    <p>We are delighted to provide you with the license key for ${productName}. Your access to this product is now officially authorized, and we appreciate your support.</p>

    <p><strong>License Key:</strong></p>
    <div class="license-key">
      ${licenseKey}
    </div>

    <p>Please make sure to keep this license key secure, as it is essential for activation and usage of ${productName}. Here are the steps to activate your license:</p>
    <ol>
      <li>Download and install ${productName} from our website.</li>
      <li>Launch the application.</li>
      <li>When prompted, enter the license key provided above.</li>
      <li>Follow the on-screen instructions to complete the activation process.</li>
    </ol>

    <p>If you encounter any issues during activation or have questions about ${productName}, please do not hesitate to contact our customer support team at ${process.env.NODEMAILER_EMAIL}. We are here to assist you.</p>

    <p>Thank you for choosing ${productName}. We hope you find it valuable and enjoy using it for your needs. If you have any feedback or suggestions, please feel free to share them with us.</p>
  </div>
</body>
</html>`
}

export default sendMail
export { bodyEmail }
