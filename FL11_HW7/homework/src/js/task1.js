const EMAIL_MIN_LENGTH = 6;
const PASSWORD_MIN_LENGTH = 5;
const email = prompt(`Please, enter your email:`, ``);

if (email === `` || email === null) {
  alert(`Canceled.`);
} else if (email.length < EMAIL_MIN_LENGTH) {
  alert(`I don’t know any emails having name length less than ${EMAIL_MIN_LENGTH} symbols`);
} else if (email === `user@gmail.com` || email === `admin@gmail.com`) {
  let currentPassword = prompt(`Please, enter your password:`, ``);
  if (currentPassword === `` || currentPassword === null) {
    alert(`Canceled.`);
  } else if (currentPassword === `UserPass` && email === `user@gmail.com`
        || currentPassword === `AdminPass` && email === `admin@gmail.com`) {
    let isPassShouldChange = confirm(`Do you want to change your password?`);
    if (isPassShouldChange) {
      let confirmedPassword = prompt(`Please, enter your old password:`, ``);
      if (confirmedPassword === `` || confirmedPassword === null) {
        alert(`Canceled.`);
      } else if (confirmedPassword === currentPassword && email === `user@gmail.com`
            || confirmedPassword === currentPassword && email === `admin@gmail.com`) {
        let newPassword = prompt(`Please, enter your new password:`, ``);
        if (newPassword === `` || newPassword === null) {
          alert(`Canceled.`);
        } else if (newPassword.length < PASSWORD_MIN_LENGTH) {
          alert(`It’s too short password. Sorry.`);
        } else {
          confirmedPassword = prompt(`Please, enter your new password again:`, ``);
          if (confirmedPassword === `` || confirmedPassword === null) {
            alert(`Canceled.`);
          } else {
            alert(confirmedPassword === newPassword
              ? `You have successfully changed your password.`
              : `You wrote the wrong password.`);
          }
        }
      } else {
        alert(`Wrong password`);
      }
    } else {
      alert(`You have failed the change.`);
    }
  } else {
    alert(`Wrong password`);
  }
} else {
  alert(`I don’t know you`);
}
