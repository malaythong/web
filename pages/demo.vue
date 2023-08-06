<template>
  <div>
    <h2>Forgot Password</h2>
    <p>Enter your email address to reset your password.</p>

    <v-text-field v-model="email" label="Email"></v-text-field>
    <v-btn @click="resetPassword">Reset Password</v-btn>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import update_user from '~/gql/mutations/insert/admin/update_user.gql';
// const nodemailer = require('nodemailer'); // Import Nodemailer

export default {
  data() {
    return {
      email: '',
      message: '',
      localeId: null,
      localeUsername: null,
      localeEmail: null,
      localeRole: null,
    };
  },
  created() {
    this.localeId = localStorage.getItem('userDatId');
    this.localeUsername = localStorage.getItem('userDataUserName');
    this.localeEmail = localStorage.getItem('userDataEmail');
    this.localeRole = localStorage.getItem('userDataRole');
  },
  methods: {
    async resetPassword() {
      try {
        const response = await this.$apollo.mutate({
          mutation: gql`
            mutation ResetPassword($email: String!) {
              resetPassword(email: $email) {
                message
              }
            }
          `,
          variables: {
            email: this.email,
          },
        });

        this.message = response.data.resetPassword.message;

        // Generate a new password and send email
        if (response.data.resetPassword.message === 'Password reset successful.') {
          const newPassword = generateRandomPassword();
          this.UpdateUser(newPassword);
          this.sendEmail(this.email, newPassword);
        }
      } catch (error) {
        this.message = 'An error occurred. Please try again later.';
      }
    },

    sendEmail(toEmail, newPassword) {
      const transporter = nodemailer.createTransport({
        service: 'your-email-service-provider',
        auth: {
          user: 'your-email@example.com',
          pass: 'your-email-password',
        },
      });

      const mailOptions = {
        from: 'your-email@example.com',
        to: toEmail,
        subject: 'New Password',
        text: `Your new password: ${newPassword}`,
      };

      try {
        transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    },
    UpdateUser(newPassword) {
      this.$apollo
        .mutate({
          mutation: gql`
            ${update_user.updateUser}
          `,
          variables: {
            id: this.localeId,
            password: newPassword,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('success', result);
          this.dialog = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
