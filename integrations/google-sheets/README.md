# Waitlist → Google Sheet

Every signup on the site lands as a row in **The Last Table — Waitlist**, a Google Sheet in ownership's Drive. Signups come from the coming-soon page and /waitlist now, and from the footer and Reservations page after launch.

| Signed up | First name | Email | Signed up from | Invited to grand opening | Told reservations are open | Notes |
|---|---|---|---|---|---|---|

- **One row per guest:** someone who signs up twice keeps their first row.
- **Outreach checkboxes:** "Invited to grand opening" and "Told reservations are open" are for the team to tick as they send each round.
- **Excel:** File → Download → Microsoft Excel (.xlsx) gives you a copy any time.

## Connect it (once, on a computer)

1. Open the sheet → **Extensions → Apps Script**.
2. Delete what's in the editor, paste the code from `waitlist.gs` (Drive has a copy with the sheet's ID filled in), and click **Save**.
3. **Deploy → New deployment →** the gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**.
4. Google asks you to authorize. Pick your account. On "Google hasn't verified this app", click **Advanced → Go to … (unsafe)**, then **Allow**. That warning is normal for a script you wrote yourself.
5. Copy the **Web app URL** (it ends in `/exec`) and set it as `forms.newsletter` in `content/site.js`.

Opening that URL in a browser should read "The Last Table waitlist is connected."

## Changing the script later

After editing the code: **Deploy → Manage deployments →** pencil icon → Version: **New version** → **Deploy**. The URL stays the same.
