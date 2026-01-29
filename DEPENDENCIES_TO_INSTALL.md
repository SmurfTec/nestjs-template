# Required Dependencies for 2FA Feature

The 2FA feature requires the following npm packages to be installed:

```bash
npm install otpauth qrcode
npm install --save-dev @types/qrcode
```

Add to your `package.json`:

```json
{
  "dependencies": {
    "otpauth": "^9.3.4",
    "qrcode": "^1.5.3"
  },
  "devDependencies": {
    "@types/qrcode": "^1.5.5"
  }
}
```

After installation, restart your development server.

## Environment Variables

Add the following to your `.env` file:

```
ENCRYPTION_KEY=your-secure-encryption-key-here
```

**Important:** Use a strong, random encryption key in production. The default key is for development only.

