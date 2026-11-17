KHANIKA HOSTEL MANAGER - OFFLINE DESKTOP APP (version 1.19)
===========================================================
WINDOWS - EASIEST WAY (no commands to type)
1. Install Node.js (LTS) from https://nodejs.org  (one time)
2. Unzip this folder.
3. Double-click  1-Install.bat   (needs internet, one time only)
4. Double-click  2-Run-App.bat   to start the app.

MAKE A SETUP INSTALLER (optional)
   Double-click 3-Build-Installer.bat   -> dist\Khanika Hostel Manager Setup 1.19.0.exe
   If it stops with "Access is denied" (antivirus blocking), use
   4-Build-Portable-Zip.bat instead, or just keep using 2-Run-App.bat.
   If it says "cannot create symbolic link", turn on Developer Mode in
   Windows Settings > Privacy & security > For developers, then run it again.

OTHER SYSTEMS / COMMAND LINE
   npm install      (once)      npm start      npm run dist

YOUR DATA
- Main data file: the app's user-data folder (khanika-data.json).
- Automatic backups: Documents\Khanika Backups\khanika-backup-YYYY-MM-DD.json
  (written on every save, one file per day, last 60 days kept).
  Settings > Data > "Open backup folder" opens it.
- PDFs and document photos open straight away (a copy is kept in Documents\Khanika Files). Excel exports and manual backups ask where to save.
- Copy the Khanika Backups folder to a pen drive or cloud folder regularly.
- "Backup to Google Drive" saves the file, then opens Google Drive in your
  browser so you can upload it (New > File upload).

MOVING DATA FROM THE WEB VERSION
1. Web version: Settings > Backup (JSON), save the file.
2. Desktop app: create the administrator account, log in,
   Settings > Restore backup, choose that file.

NOTES
- No cloud sync between devices in the desktop app; use backup and restore.
- Passwords are an app-level lock, not encryption of the data file.
- Custom PDF fonts, theme and app font are stored per computer.

NEW IN VERSION 1.6
- Several properties: each one is saved in its own data file and gets its own
  daily backups (khanika-backup-<property>-YYYY-MM-DD.json).
- Holiday list: Settings > Holiday List > "Update from a website" can fetch a
  web page (the desktop app only) and read the holiday table from it.
  Pasting a table copied from a website works in both versions.

NEW IN VERSION 1.7 (website and student portal)
- Online Requests screen: payment claims and service requests from the website.
- Settings > Website & Online Portal: "Download website data" (works everywhere).
- Desktop only: Settings > Automatic website sync. Enter the website address
  (the Web app URL) and your admin key, then use "Send data to website now" and
  "Fetch new submissions now", or switch on auto-sync (every 10 minutes while the
  app is open). The admin key is kept on this computer only.
- See the separate khanika-website package for setting up the website on Google.

NEW IN VERSION 1.8
- Share PDF: Invoices > "Share PDF" and Payments > "Share Receipt PDF" open a share window.
  "Share PDF" saves the PDF (Documents\Khanika Files) and shows it in its folder, so you can drag it
  into WhatsApp or an email. "Copy PDF" puts the file on the clipboard (Windows): open the chat or
  email and press Ctrl+V. WhatsApp / SMS / Email buttons still prepare the message text.
- Online forms: photos and documents (Photo ID, Student ID Proof, Address Proof, PVR Document) are now
  downloaded into the student's record when you import online forms. This needs the website address and
  admin key saved in Settings > Website & Online Portal > Automatic website sync, and the UPDATED
  Code.gs on the website (paste it over the old one, then Deploy > Manage deployments > pencil icon >
  Version: New version > Deploy). Students imported earlier get a "Download documents" button on the
  Students page.
- Deleted Students: deleting a student now moves the record to the new "Deleted Students" page. View it,
  restore it (invoices and payments reconnect automatically) or delete it forever (administrator only).
  Students deleted in earlier versions cannot be recovered, except from a backup file.
- Dashboard: Bed Occupancy is now laid out in wide rows, one per floor, with rooms side by side.
- Bed Occupancy: every bed has an Edit link. Use it to move a student to another bed, swap two students,
  put a student into a vacant bed, or edit the bed itself.

GETTING THE .EXE INSTALLER WITHOUT BUILDING ON YOUR PC (free, about 15 minutes)
  1. Create a free account at https://github.com and click New repository (name it e.g. khanika-desktop,
     keep it Private).
  2. Click "uploading an existing file", then drag in ALL the files and folders from this package,
     including the hidden .github folder (it contains .github/workflows/build-exe.yml). If the browser
     skips .github, click Add file > Create new file, type  .github/workflows/build-exe.yml  as the name
     and paste the contents of that file. Click Commit.
  3. Open the Actions tab. The "Build Windows installer" job starts by itself (or click it, then
     Run workflow). It takes about 5 minutes.
  4. Open the finished run, scroll to Artifacts, download "Khanika-Hostel-Manager-Setup" and unzip it.
     Inside is "Khanika Hostel Manager Setup 1.19.0.exe". Double-click it to install.
  Windows may show "Windows protected your PC" because the installer is not code-signed:
  click More info > Run anyway. Your data is stored separately, so installing over an older version keeps it.

  Alternative on a Windows PC with internet: install Node.js (nodejs.org, LTS), double-click 1-Install.bat,
  then 3-Build-Installer.bat. The installer appears in the dist folder.

NEW IN VERSION 1.9 - CONTROL YOUR WEBSITE FROM THE APP
  - New menu item "Website" (administrators only). It shows and edits the live text of khanika-pg.in:
    notice banner, admissions open/closed, PG name, tagline, phone, email, starting rent, booking advance,
    UPI details, address, map link, about text and amenities. Press Save and the website updates at once.
  - Photo gallery: add photos, write captions, change the order, delete photos.
  - Needs the UPDATED Code.gs on your Google script (see the website guide) and the web app address and admin
    key saved in Settings > Website & Online Portal > Automatic website sync.
  - To update an installed copy: in your GitHub repository replace app/index.html and package.json with the
    new ones, then run the Build Windows installer workflow again and install the new Setup file.

NEW IN VERSION 1.10
  - RENT BED BY BED: Settings > Rooms & Beds now has a "Rent / month" column. Click Edit on a bed and fill in
    "Monthly Rent" to give that bed its own rent, or use "Set rent in bulk" to set one rent for all beds, a
    floor, a room or only vacant beds. A bed with no rent of its own uses the default Monthly Rent from
    Invoice Charges.
    * Generate Invoices and the + Add Invoice form use the rent of the bed the student is in. A student with
      no bed is charged the default rent.
    * Quarterly, Half-yearly and Yearly rent are scaled in the same proportion as the bed's rent compared with
      the default monthly rent (a bed at 2000 against a default of 1500 pays 4200 x 2000 / 1500 = 5600 for a
      quarter).
    * Invoices already made are not changed. The bed's rent is also shown on the Dashboard bed board and in
      the Vacant beds report. The website's Rooms table shows the lowest bed rent in each room.
  - ADMIN KEY: Settings > Automatic website sync now has Show and Copy buttons next to the admin key.

NEW IN VERSION 1.11 - WEBSITE SYNC FIXES
  - The automatic/manual "Send data to website" no longer overwrites the PG name, phone, address and UPI that
    you edited on the Website page. Those details are now managed on the Website page; saving there also
    updates Settings so receipts and invoices match. If Settings and the website differ, the Website page
    shows a button "Use the website details in Settings".
  - Automatic sync no longer pops up a message every time it downloads documents of new admission forms.
  - The Website page shows a clear message and the fix when it cannot load (old Google script, wrong admin key,
    wrong address, no internet).
  - Needs the updated Code.gs in khanika-website-v2.zip (paste it into your Google script and deploy a New version).

NEW IN VERSION 1.12
  - COLLAPSE / EXPAND: every section of Settings and of Online Requests (Payment claims, Service requests and
    complaints) has a Collapse / Expand button, plus Collapse all / Expand all at the top. The app remembers
    which sections you closed.
  - SERVICE REQUESTS NOT ARRIVING: Online Requests now has two buttons:
      Fetch new from website      - gets what arrived since the last fetch (same as in Settings).
      Re-fetch all from website   - brings back every payment claim and service request, including ones the
                                    website had already marked as collected but the app never kept. Items
                                    already in the app are not duplicated.
    Needs the updated Code.gs (khanika-website-v2.zip) on your Google script: paste it and deploy a New version.
  - The updated Code.gs repairs a Google Sheet made by an older script version (missing Fetched/Reply columns or
    tabs) and marks submissions as collected only after the answer was built, so none are lost on an error.

NEW IN VERSION 1.13 - SYNC WITH THE ANDROID APP
  - CLOUD SYNC: the desktop app now keeps one copy of all data in your Google Drive (through the same Google
    script as your website) and merges changes made on other devices, so the desktop and the Android app (2.0)
    stay in step. Settings > Cloud sync and website sync: enter the Web app address and admin key, Automatic
    sync = On, then "Sync everything now". It also runs by itself after login, every 10 minutes and when you
    return to the app. Records changed on different devices are merged; if the same record was changed on both,
    the most recent change is kept. Deleted students go to Deleted Students on every device.
  - On the first screen of a new device you can connect and download your data.
  - Narrow windows use a compact phone-style layout (bottom bar, cards).
  - Needs the updated Code.gs (khanika-website-v2.zip) deployed as a New version.

NEW IN VERSION 1.14
  - SETTINGS > DATA > BACKUP TO GOOGLE DRIVE now saves the backup straight into the folder "Khanika Backups" in
    your Google Drive (newest 30 kept) with one click, and shows the time of the last backup with an
    "Open Drive folder" button. Uses the web address and admin key of Settings > Cloud sync and website sync.
    The folder belongs to the Google account that owns your Google script. Needs the newest Code.gs.
  - Phone-style layout improvements (also used in narrow windows): compact bed tiles on the Dashboard and
    cards for every table.

NEW IN VERSION 1.15
  - WEBSITE > FLYER PHOTO: change the big picture at the top of khanika-pg.in from the app ("Change flyer
    photo"), or go back to the original flyer. Needs the newest Code.gs deployed as a New version.

NEW IN VERSION 1.16
  - NEW STUDENT ID FORMAT: STU-<move-in date ddmmyyyy>-<running number>, e.g. STU-24102026-0007, created when you
    confirm an admission (from the student's move-in date). Existing students keep their IDs. If two devices ever
    give the same ID, cloud sync renumbers the duplicate and tells you.
  - WEBSITE SCREEN: Page options (show/hide Rooms, Rent, Availability), background theme, and the flyer photo cropped
    to 1200 x 900 with "Remove flyer". Needs the newest Code.gs from khanika-website-v3.zip (New version).
  - On a narrow window or a phone, Students, Invoices and Payments cards open and close with an arrow button.

NEW IN VERSION 1.17
  - DASHBOARD MESSAGE FIXED: the orange "online items need attention" message now says exactly what is waiting
    (new admissions to confirm, payment claims to verify, open requests). A booking-payment claim no longer keeps the
    message on after the admission is confirmed; confirming an admission now marks its booking claim Approved, and
    old leftovers are cleared automatically when the app opens.
  - NEW STUDENT ID FORMAT: K-<date of admission ddmmyyyy>-<running number>, e.g. K-28102026-005. Existing students keep
    their current IDs (so portal logins keep working); only new students get the new format.
  - NEW INVOICE NUMBER FORMAT: INV-<first 3 letters of student name>-<invoice date ddmmyyyy>-<running number>,
    e.g. INV-MDW-28102026-007. Existing invoices keep their numbers.
  - ADMISSION FORM REVERSE SIDE: narrow page margins (12.7 mm) and no more cut-off lines, so the full notes print on
    the back. The text style is unchanged. Only if the notes are still too long for one page is the letter size
    reduced a little, and as a last resort the rest continues on an extra page.
  - NEW: Settings > Dashboard Pop-up Reminders. A pop-up on the dashboard (once a day) for calendar events: holidays and your
    own events from the Holiday List. Choose how many days ahead, all events or only those marked with | !, and whether to
    include restricted holidays. A "Preview" button shows it at once.
  - Dashboard > Students with Dues now has Collapse / Expand buttons.

NEW IN VERSION 1.18
  - STUDENT PORTAL PASSWORDS (replaces OTP and the Student ID + mobile number login, which were not secure):
      * Students > View a student > "Generate password" / "Reset password" / "Remove access".
      * Students > "Portal Passwords" makes passwords for every confirmed student who has none, then lets you send each
        by WhatsApp, copy it, or download a CSV. The password is shown only once: the app keeps just a scrambled
        copy (it also goes to the website that way), so a lost password cannot be looked up, only reset.
      * Passwords look like K7M4Q-9XT2P (10 random letters/digits). Students can type them in small letters, with or
        without the dash. Log in at the portal with Student ID + password.
      * Existing students need a password before they can log in again. Needs the new Code.gs, Portal.html and portal.html
        (khanika-website-v5.zip).

NEW IN VERSION 1.19
  - ADVERTISEMENT VIDEOS: Website page > "Advertisement videos". Upload a video from this device (works on the phone and the
      desktop app: MP4, MOV or WebM, up to 50 MB) or paste a YouTube link. Videos show on the website in a "Watch our PG" section
      (a Videos link appears in the menu once there is at least one). Add captions, change the order or delete from the same
      place. A new upload can take a minute or two to play, because Google prepares it first. Needs the new Code.gs and
      index.html (khanika-website-v6.zip) and a one-time permission (see its guide).
  - Left Students now has Collapse / Expand.
  - The Dashboard Pop-up Reminders are now bright and colourful: Today / Tomorrow badges, a star for important events,
    a different colour for restricted holidays, and a gradient header.
  - SIGNATURES: new Edit and Draw buttons in Settings > Signatures. Draw with mouse or finger; Edit removes the paper
    background, sets the ink colour (black / blue / dark blue), trims empty space and sets the printed size (50% to 150%).
  - ANDROID: the dashboard clock, calendar and flag now show on the phone too (in a compact layout).
