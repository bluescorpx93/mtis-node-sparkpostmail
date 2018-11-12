### Node Mailer Tryout & Back4App Tryout

- Back4App was *Terrible*, despite following their official docs and attempting alternate approaches node App wasn't being hosted. **Remarkable**

Anyway, to test this

- Create your AppKeys

```sh
$ cd nodemailer-sparkpost
$ touch keys/appKeys.js
```

- Update keys.js
```sh
const keys = {
  BACKEND_PORT : 3000, # or, whatever you like
  SPARKPOST_APIKEY: <YOUR_API_KEY>,
  SPARKPOST_SMTPHOST:<YOUR_HOSTNAME>,
  SPARKPOST_PORT:<YOUR_MAIL_PORT>,
  SPARKPOST_USERNAME:"SMTP_Injection",
}

export default keys
```

- Install Package Dependencies
```sh
$ cd nodemailer-sparkpost
$ yarn install

# Or, with npm
$ npm install
```

- Run App
```sh
$ cd nodemailer-sparkpost
$ yarn start-app
```